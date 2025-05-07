import * as functions from "firebase-functions";
import docusign from "docusign-esign";

const apiAccountId = process.env.DOCUSIGN_API_ACCOUNT_ID ?? "";
const integratorKey = process.env.DOCUSIGN_INTEGRATOR_KEY ?? "";
const userId = process.env.DOCUSIGN_USER_ID ?? "";
const privateKey = (process.env.DOCUSIGN_PRIVATE_KEY ?? "").replace(
  /\\n/g,
  "\n"
);
const basePath = "https://demo.docusign.net/restapi";

const apiClient = new docusign.ApiClient();
apiClient.setBasePath(basePath);

/**
 * Authenticates with the DocuSign API using JWT and returns an access token.
 * @return {Promise<string>} A promise that resolves to the access token.
 * @throws Will throw an error if authentication fails.
 */
async function authenticate(): Promise<string> {
  const results = await apiClient.requestJWTUserToken(
    integratorKey,
    userId,
    ["signature"],
    Buffer.from(privateKey, "utf8"),
    3600
  );
  const accessToken = results.body.access_token;
  apiClient.addDefaultHeader("Authorization", "Bearer " + accessToken);
  return accessToken;
}

interface SendForSignatureData {
  signerEmail: string;
  signerName: string;
  documentBase64: string;
  documentName: string;
}

export const sendForSignature = functions.https.onCall(async (request) => {
  const {signerEmail, signerName, documentBase64, documentName} =
    request.data as SendForSignatureData;
  if (!signerEmail || !signerName || !documentBase64 || !documentName) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "Missing required fields"
    );
  }
  await authenticate();
  const envelopesApi = new docusign.EnvelopesApi(apiClient);
  const envelopeDefinition = {
    emailSubject: "Please sign this contract",
    documents: [
      {
        documentBase64,
        name: documentName,
        fileExtension: "pdf",
        documentId: "1",
      },
    ],
    recipients: {
      signers: [
        {
          email: signerEmail,
          name: signerName,
          recipientId: "1",
          routingOrder: "1",
          tabs: {
            signHereTabs: [
              {
                anchorString: "/sign_here/",
                anchorYOffset: "0",
                anchorUnits: "pixels",
                anchorXOffset: "0",
              },
            ],
          },
        },
      ],
    },
    status: "sent",
  };
  try {
    const result = await envelopesApi.createEnvelope(apiAccountId, {
      envelopeDefinition,
    });
    return {envelopeId: result.envelopeId};
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    throw new functions.https.HttpsError(
      "internal",
      errorMessage || "DocuSign envelope creation failed"
    );
  }
});
