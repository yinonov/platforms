import { FASTElement, attr, observable } from "@microsoft/fast-element";
import { listenToContract } from "@features/contracts/services/firestore-service";
import type { Contract } from "@features/contracts/models";
import { functions } from "@services/firebase-config";
import { httpsCallable } from "firebase/functions";
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
      // Wrap contract HTML fragment in a full HTML document with RTL direction
      const htmlContent = `<!DOCTYPE html>\n<html lang=\"he\" dir=\"rtl\"><head><meta charset=\"utf-8\"></head><body dir=\"rtl\">${this.contract.content}</body></html>`;
      // Encode as base64
      const documentBase64 = btoa(unescape(encodeURIComponent(htmlContent)));
      const documentName = (this.contract.title || "contract") + ".html";
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
    // TODO: Implement download functionality
    console.log("Download contract not implemented yet.");
  }
}
