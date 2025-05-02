// src/app/pages/contract-edit/contract-edit.ts
import { FASTElement, attr, observable } from "@microsoft/fast-element";
import type { Contract } from "@features/contracts/models";
import { db } from "@services/index";
import { httpsCallable } from "firebase/functions";
import { functions } from "@services/index";
import { doc, onSnapshot } from "firebase/firestore";
import { auth } from "@features/user/services";
import {
  type ContractTemplate,
  contractTemplates,
} from "@features/contracts/templates";
import { createContract, updateContract } from "@features/contracts/services";
import { Router } from "@vaadin/router";

export class ContractEdit extends FASTElement {
  @attr contractId?: string;
  @observable contract: Contract | null = null;
  @observable templates: ContractTemplate<any>[] = contractTemplates;
  @observable selectedType = "";
  @observable loading = true;
  @observable error: string | null = null;
  @observable template: ContractTemplate<any> | null = null;
  private unsubscribe: (() => void) | null = null;

  connectedCallback() {
    super.connectedCallback();

    this.templates.length && this.handleTemplateSelect(this.templates[0].type);

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

  async handleSubmit(detail: { metadata: Record<string, any> }) {
    if (!auth.currentUser) {
      // Not authenticated: prompt for auth dialog
      this.error = "נא להתחבר כדי להמשיך";
      return;
    }
    if (!this.template) {
      this.error = "אירעה שגיאה, נסה שוב";
      return;
    }
    try {
      this.loading = true;
      const metadata = detail.metadata;
      let response;
      if (this.template.type === "rental") {
        response = await httpsCallable(
          functions,
          "generateRentalContract"
        )(metadata);
      } else if (this.template.type === "service") {
        response = await httpsCallable(
          functions,
          "generateServiceContract"
        )(metadata);
      } else {
        throw new Error("סוג חוזה לא נתמך");
      }
      const content = (response.data as any).contractText;
      const base: Omit<Contract, "id"> = {
        type: this.template.type,
        title: this.template.title,
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
        Router.go(`/contract/${id}`);
      }
    } catch (err: any) {
      console.error(err);
      this.error = "אירעה שגיאה בשמירת החוזה";
    } finally {
      this.loading = false;
    }
  }
}
