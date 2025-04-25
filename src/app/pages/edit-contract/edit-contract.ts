// src/app/pages/edit-contract/edit-contract.ts
import { FASTElement, attr, observable } from "@microsoft/fast-element";
import {
  getContract,
  saveContract,
  updateContract,
} from "../../../services/firestore-service";
import {
  contractTemplates,
  ContractTemplate,
} from "../../../templates/contract-templates";
import type { Contract } from "../../../models/contract";
import { auth } from "../../../services/firebase-config";

export class EditContract extends FASTElement {
  @attr contractId?: string;
  @observable contract: Contract | null = null;
  @observable templates: ContractTemplate[] = contractTemplates;
  @observable selectedType = "";
  @observable loading = true;
  @observable error: string | null = null;
  @observable template: ContractTemplate | null = null;

  async connectedCallback() {
    super.connectedCallback();

    if (this.contractId) {
      try {
        const loaded = await getContract(this.contractId);
        if (loaded) {
          this.contract = loaded;
          this.selectedType = loaded.type;
          this.template =
            contractTemplates.find((t) => t.type === loaded.type) || null;
        } else {
          this.error = "החוזה לא נמצא.";
        }
      } catch (err) {
        console.error(err);
        this.error = "שגיאה בטעינת חוזה.";
      } finally {
        this.loading = false;
      }
    } else {
      this.loading = false;
    }
  }

  handleTemplateSelect(type: string) {
    this.error = null;
    this.selectedType = type;
    this.template = this.templates.find((t) => t.type === type) || null;
    if (!this.template) return;
    const now = new Date().toISOString();
    const draft: Omit<Contract, "id"> = {
      type: this.template.type,
      title: this.template.defaultTitle,
      content: this.template.defaultContent,
      metadata: { ...this.template.defaultMetadata },
      status: "draft",
      createdBy: auth.currentUser!.uid,
      createdAt: now,
    };
    saveContract(draft).then((id) => {
      this.contractId = id;
      this.contract = { id, ...draft };
    });
  }

  async handleSubmit(detail: { metadata: Record<string, string> }) {
    if (!auth.currentUser || !this.template) {
      this.error = "אירעה שגיאה, נסה שוב";
      return;
    }
    try {
      this.loading = true;
      const metadata = detail.metadata;
      const content = Object.keys(metadata).reduce(
        (txt, key) => txt.replace(new RegExp(`{{${key}}}`, "g"), metadata[key]),
        this.template!.defaultContent
      );
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
        const id = await saveContract(base);
        this.contractId = id;
      }
      this.contract = { id: this.contractId, ...base } as Contract;
    } catch (err: any) {
      console.error(err);
      this.error = "אירעה שגיאה בשמירת החוזה";
    } finally {
      this.loading = false;
    }
  }
}
