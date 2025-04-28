// src/app/pages/edit-contract/edit-contract.ts
import { FASTElement, attr, observable } from "@microsoft/fast-element";
import { createContract, updateContract } from "@services/index";
import { contractTemplates, ContractTemplate } from "@templates/index";
import type { Contract } from "@models/index";
import { auth, db } from "@services/index";
import { httpsCallable } from "firebase/functions";
import { functions } from "@services/index";
import { doc, onSnapshot } from "firebase/firestore";

export class EditContract extends FASTElement {
  @attr contractId?: string;
  @observable contract: Contract | null = null;
  @observable templates: ContractTemplate[] = contractTemplates;
  @observable selectedType = "";
  @observable loading = true;
  @observable error: string | null = null;
  private template: ContractTemplate | null = null;
  private unsubscribe: (() => void) | null = null;

  connectedCallback() {
    super.connectedCallback();

    if (this.contractId) {
      const ref = doc(db, "contracts", this.contractId);
      this.unsubscribe = onSnapshot(
        ref,
        (snap) => {
          if (snap.exists()) {
            this.contract = snap.data() as Contract;
          } else {
            this.error = "החוזה לא נמצא.";
          }
          this.loading = false;
        },
        (error) => {
          console.error(error);
          this.error = "שגיאה בקריאת חוזה.";
          this.loading = false;
        }
      );
    } else {
      this.loading = false;
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  handleTemplateSelect(type: string) {
    if (this.contractId) {
      // כבר יש חוזה קיים, אל תיצור חדש
      return;
    }
    this.error = null;
    this.selectedType = type;
    this.template = this.templates.find((t) => t.type === type) || null;
  }

  async handleSubmit(detail: { metadata: Record<string, string> }) {
    if (!auth.currentUser || !this.template) {
      this.error = "אירעה שגיאה, נסה שוב";
      return;
    }
    try {
      this.loading = true;
      const metadata = detail.metadata;

      const generateContract = httpsCallable(functions, "generateContract");
      const response = await generateContract(metadata);
      const content = (response.data as any).contractText;

      const base: Omit<Contract, "id"> = {
        type: this.template.type,
        title: this.template.defaultTitle,
        content,
        metadata,
        status: "generated",
        createdBy: auth.currentUser.uid,
        createdAt: this.contract?.createdAt || new Date().toISOString(),
      };

      if (this.contractId) {
        await updateContract(this.contractId, base);
      } else {
        const id = await createContract(base);
        this.contractId = id;
      }
    } catch (err: any) {
      console.error(err);
      this.error = "אירעה שגיאה בשמירת החוזה";
    } finally {
      this.loading = false;
    }
  }
}
