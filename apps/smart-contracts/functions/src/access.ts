import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

const db = admin.firestore();
const CONTRACT_ACCESS_COLLECTION = "contractAccess";

// Grant contract access
export const grantContractAccess = functions.https.onCall(async (request) => {
  const {contractId, uid, role} = request.data as any;
  if (!contractId || !uid || !role) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "Missing contractId, uid, or role"
    );
  }
  const addedAt = new Date().toISOString();
  const accessDoc = {contractId, uid, role, addedAt};
  const docId = `${contractId}_${uid}`;
  await db.collection(CONTRACT_ACCESS_COLLECTION).doc(docId).set(accessDoc);
  return {success: true};
});

// Revoke contract access
export const revokeContractAccess = functions.https.onCall(async (request) => {
  const {contractId, uid} = request.data as any;
  if (!contractId || !uid) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "Missing contractId or uid"
    );
  }
  const docId = `${contractId}_${uid}`;
  await db.collection(CONTRACT_ACCESS_COLLECTION).doc(docId).delete();
  return {success: true};
});

// Get all contracts for a user
export const getUserContracts = functions.https.onCall(async (request) => {
  const {uid} = request.data as any;
  if (!uid) {
    throw new functions.https.HttpsError("invalid-argument", "Missing uid");
  }
  const snapshot = await db
    .collection(CONTRACT_ACCESS_COLLECTION)
    .where("uid", "==", uid)
    .get();
  return snapshot.docs.map((doc) => doc.data());
});

// Get all users for a contract
export const getContractUsers = functions.https.onCall(async (request) => {
  const {contractId} = request.data as any;
  if (!contractId) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "Missing contractId"
    );
  }
  const snapshot = await db
    .collection(CONTRACT_ACCESS_COLLECTION)
    .where("contractId", "==", contractId)
    .get();
  return snapshot.docs.map((doc) => doc.data());
});

// Create contract share (refactored as a callable function)
export const createContractShare = functions.https.onCall(async (data: any) => {
  const {contractId, recipientEmail, expiresInHours = 72} = data;
  if (!contractId || !recipientEmail) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "Missing contractId or recipientEmail"
    );
  }
  // You may want to generate a unique linkId and set timestamps
  // Replace with nanoid if available
  const linkId = Math.random().toString(36).substring(2, 34);
  const createdAt = admin.firestore.Timestamp.now();
  const expiresAt = admin.firestore.Timestamp.fromDate(
    new Date(Date.now() + expiresInHours * 60 * 60 * 1000)
  );
  const share = {
    contractId,
    recipientEmail,
    linkId,
    createdAt,
    expiresAt,
    status: "pending",
  };
  await db.collection("contractShares").doc(linkId).set(share);
  return {...share};
});
