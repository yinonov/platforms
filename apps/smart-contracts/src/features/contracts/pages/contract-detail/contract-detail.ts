import { FASTElement, attr, observable } from "@microsoft/fast-element";
import { listenToContract } from "@features/contracts/services/firestore-service";
import type { Contract } from "@features/contracts/models";
import { functions } from "@services/firebase-config";
import { httpsCallable } from "firebase/functions";
import {
  pdfToBase64,
  pdfDownload,
  textToPdf,
} from "@features/contracts/services/pdf-utils";
import { notificationService } from "@components/ui/src/services";

export class ContractDetail extends FASTElement {
  @attr({ attribute: "contract-id" }) contractId = "";
  @observable contract: Contract | null = null;
  @observable loading = false;
  @observable error: string | null = null;

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

  async signContract() {
    if (!this.contract) {
      this.error = "No contract loaded.";
      return;
    }
    this.loading = true;
    this.error = null;
    try {
      const signerEmail = "yinon@hotmail.com";
      const signerName = "Yinon";
      // Generate PDF bytes from contract content
      const pdfBytes = await textToPdf(this.contract.content);
      const documentBase64 = await pdfToBase64(pdfBytes);
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

      this.loading = false;

      notificationService.showToast(
        "Contract sent for signature to " + signerEmail,
        {
          variant: "success",
          duration: 3000,
        }
      );
    } catch (err: any) {
      this.error = err.message || "Failed to send for signature.";
      this.loading = false;
    }
  }

  async downloadContract() {
    if (!this.contract) {
      this.error = "No contract loaded.";
      return;
    }
    this.loading = true;
    this.error = null;
    try {
      const pdfBytes = await textToPdf(this.contract.content);
      await pdfDownload(pdfBytes);
    } catch (err: any) {
      this.error = err.message || "Failed to download contract.";
    } finally {
      this.loading = false;
    }
  }
}
