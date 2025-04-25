// src/app/pages/create-contract/create-contract.ts
import { FASTElement, attr, observable } from "@microsoft/fast-element";
import { Contract } from "../../../models";
import {
  getContract,
  saveContract,
  updateContract,
} from "../../../firebase/firestore-service";
import { userContext } from "../../../context/user-context";
import {
  generateTitleFromMetadata,
  normalizeMetadata,
} from "../../../utils/contract-utils";

export class CreateContract extends FASTElement {
  @attr contractId?: string;
  @observable contractContent = "";
  @observable saving = false;
  @observable error: string | null = null;
  @observable contractFormData: Partial<Contract> = {};

  get currentUser() {
    return userContext.currentUser;
  }

  async connectedCallback() {
    super.connectedCallback();
    if (this.contractId) {
      const contract = await getContract(this.contractId);
      if (contract) {
        this.contractContent = contract.content;
        this.contractFormData = {
          metadata: contract.metadata,
          title: contract.title,
        };
      }
    }
  }

  handleFormData(e: CustomEvent<Contract>) {
    this.contractFormData = e.detail;
    this.contractContent = e.detail.content;
  }

  async save() {
    if (!this.currentUser) {
      this.error = "חייבים להיות מחוברים כדי לשמור חוזה";
      return;
    }

    this.saving = true;
    this.error = null;

    try {
      const metadata = normalizeMetadata(this.contractFormData.metadata || {});
      const title =
        this.contractFormData.title || generateTitleFromMetadata(metadata);

      const baseContract: Omit<Contract, "id"> = {
        content: this.contractContent,
        createdBy: this.currentUser.uid,
        signers: [],
        createdAt: new Date().toISOString(),
        metadata,
        title,
      };

      if (this.contractId) {
        await updateContract(this.contractId, baseContract);
      } else {
        const newId = await saveContract(baseContract);
        this.contractId = newId;
      }

      alert("החוזה נשמר בהצלחה. מעביר לעמוד החתימה...");
      window.location.href = `/contract-view?id=${this.contractId}`;
    } catch (err: any) {
      console.error(err);
      this.error = "אירעה שגיאה בשמירה";
    } finally {
      this.saving = false;
    }
  }
}
