import { FASTElement, attr, observable } from "@microsoft/fast-element";
import { listenToContract } from "@features/contracts/services/firestore-service";
import type { Contract } from "@features/contracts/models";
import { functions } from "@services/firebase-config";
import { httpsCallable } from "firebase/functions";
import {
  textToPdfBase64,
  textToPdfDownload,
} from "@features/contracts/services/pdf-utils";
import {
  createContractShare,
  getShareLink,
} from "@features/contracts/services/contract-share-service";

export class ContractDetail extends FASTElement {
  @attr({ attribute: "contract-id" }) contractId = "";
  @observable contract: Contract | null = null;
  @observable loading = false;
  @observable error: string | null = null;
  @observable shareLink: string | null = null;
  @observable shareError: string | null = null;
  @observable shareLoading = false;
  private unsubscribe: (() => void) | null = null;

  connectedCallback() {
    super.connectedCallback();
    if (this.contractId) {
      this.loading = true;
      this.unsubscribe = listenToContract(this.contractId, (contract) => {
        this.contract = contract;
        this.error = contract ? null : "Contract not found.";
        this.loading = false;
      });
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
    }
  }

  async shareContract() {
    if (!this.contract) {
      this.shareError = "No contract loaded.";
      return;
    }
    this.shareLoading = true;
    this.shareError = null;
    try {
      // Prompt for recipient email (replace with UI input as needed)
      const recipientEmail = prompt("Enter recipient email:");
      if (!recipientEmail) {
        this.shareError = "Recipient email is required.";
        this.shareLoading = false;
        return;
      }
      const share = await createContractShare({
        contractId: this.contract.id ?? "",
        recipientEmail,
      });
      this.shareLink = getShareLink(share.linkId);
    } catch (err: any) {
      this.shareError = err.message || "Failed to create share link.";
    } finally {
      this.shareLoading = false;
    }
  }

  async signContract() {
    if (!this.contract) {
      this.error = "No contract loaded.";
      return;
    }
    this.loading = true;
    this.error = null;
    try {
      // Adjust these fields as needed based on your contract model
      const signerEmail = "yinon@hotmail.com";
      const signerName = "Yinon";
      // const signerEmail = this.contract.signerEmail || this.contract.userEmail;
      // const signerName = this.contract.signerName || this.contract.userName;
      const documentBase64 = textToPdfBase64(this.contract.content);
      const documentName = this.contract.title || "contract.pdf";
      if (!signerEmail || !signerName || !documentBase64) {
        this.error = "Missing contract data for signature.";
        this.loading = false;
        return;
      }
      const sendForSignature = httpsCallable(functions, "sendForSignature");
      const result = await sendForSignature({
        signerEmail,
        signerName,
        documentBase64,
        documentName,
      });
      // Optionally handle result.data.envelopeId
      this.loading = false;
      // You may want to show a notification or update contract status here
    } catch (err: any) {
      this.error = err.message || "Failed to send for signature.";
      this.loading = false;
    }
  }

  downloadContract() {
    if (!this.contract) {
      this.error = "No contract loaded.";
      return;
    }
    this.loading = true;
    this.error = null;
    try {
      textToPdfDownload(this.contract.content);
    } catch (err: any) {
      this.error = err.message || "Failed to download contract.";
    } finally {
      this.loading = false;
    }
  }
}
