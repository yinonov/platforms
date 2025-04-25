// src/components/contract-form/contract-form.ts (refactored with draft creation)
import { FASTElement, observable } from "@microsoft/fast-element";
import { generateContractFromForm } from "../../services/contract-api";
import { exportContractToPDF } from "../../services/pdf-export";
import { getRandomContractData } from "../../services/demo-data";
import { db, auth } from "../../firebase/firebase-config";
import {
  addDoc,
  collection,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import type { ContractFormData, SignatureData } from "../../models";

export class ContractForm extends FASTElement {
  @observable landlord = "";
  @observable tenant = "";
  @observable address = "";
  @observable rent = "";
  @observable period = "";
  @observable startDate = "";
  @observable generatedContract = "";
  @observable isLoading = false;
  @observable signature: SignatureData = {
    signerName: "",
    signedAt: "",
    phone: "",
    isApproved: false,
  };
  private contractId: string | null = null;
  private saveDraftDebounce?: number;

  connectedCallback() {
    super.connectedCallback();
    const data = getRandomContractData();
    Object.assign(this, data);
    this.createDraft();
  }

  async createDraft() {
    const userId = auth.currentUser?.uid;
    if (!userId) return;

    const ref = await addDoc(collection(db, "contracts"), {
      ownerId: userId,
      participants: [userId],
      status: "draft",
      createdAt: serverTimestamp(),
    });
    this.contractId = ref.id;
  }

  async saveDraft() {
    if (!this.contractId) return;
    const draftRef = doc(db, "contracts", this.contractId);
    const metadata: ContractFormData = {
      landlord: this.landlord,
      tenant: this.tenant,
      address: this.address,
      rent: this.rent,
      period: this.period,
      startDate: this.startDate,
    };
    await updateDoc(draftRef, { ...metadata });
  }

  handleInput(field: keyof ContractForm, event: Event) {
    const target = event.target as HTMLInputElement;
    (this as any)[field] = target.value;

    clearTimeout(this.saveDraftDebounce);
    this.saveDraftDebounce = window.setTimeout(() => this.saveDraft(), 800);
  }

  async handleSubmit(event: Event) {
    event.preventDefault();
    this.isLoading = true;
    this.generatedContract = "";

    const data: ContractFormData = {
      landlord: this.landlord,
      tenant: this.tenant,
      address: this.address,
      rent: this.rent,
      period: this.period,
      startDate: this.startDate,
    };

    try {
      const contractText = await generateContractFromForm(data);
      this.generatedContract = contractText || "לא התקבל חוזה.";

      if (this.contractId) {
        const ref = doc(db, "contracts", this.contractId);
        await updateDoc(ref, {
          ...data,
          content: this.generatedContract,
          status: "generated",
        });
      }

      this.$emit("contract-data", {
        text: this.generatedContract,
        ...data,
      });
    } catch (err) {
      console.error("שגיאה:", err);
      this.generatedContract = "אירעה שגיאה ביצירת החוזה.";
    } finally {
      this.isLoading = false;
    }
  }

  handleSigned(event: CustomEvent<SignatureData>) {
    this.signature = event.detail;
  }

  downloadAsSignedPDF() {
    const element = this.shadowRoot?.getElementById("contract");
    if (element) {
      exportContractToPDF(element, this.signature);
    }
  }
}
