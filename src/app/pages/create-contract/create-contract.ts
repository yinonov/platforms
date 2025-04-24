// create-contract.ts
import { FASTElement, observable } from "@microsoft/fast-element";
import { Contract } from "../../../models/contract";
import { saveContract } from "../../../firebase/firestore-service";
import { userContext } from "../../../context/user-context";
import { SignedEventDetail } from "../../../models";

export interface ContractFormData {
  landlord: string;
  tenant: string;
  address: string;
  rent: string;
  text: string;
}

export class CreateContract extends FASTElement {
  @observable contractContent: string = "";
  @observable saving: boolean = false;
  @observable error: string | null = null;
  @observable createdContractId: string = "";
  @observable signed: boolean = false;
  @observable contractFormData: Partial<ContractFormData> = {};

  get currentUser() {
    return userContext.currentUser;
  }

  handleFormData(e: CustomEvent<ContractFormData>) {
    this.contractFormData = e.detail;
    this.contractContent = e.detail.text;
  }

  async save() {
    if (!this.currentUser) {
      this.error = "חייבים להיות מחוברים כדי ליצור חוזה";
      return;
    }

    this.saving = true;
    this.error = null;
    try {
      const contract: Omit<Contract, "id"> = {
        content: this.contractContent,
        createdBy: this.currentUser.uid,
        signers: [],
        createdAt: new Date().toISOString(),
        metadata: {
          landlord: this.contractFormData.landlord || "",
          tenant: this.contractFormData.tenant || "",
          address: this.contractFormData.address || "",
          rent: this.contractFormData.rent || "",
        },
      };

      this.createdContractId = await saveContract(contract);
    } catch (err: any) {
      this.error = "אירעה שגיאה בשמירת החוזה";
      console.error(err);
    } finally {
      this.saving = false;
    }
  }

  handleSigned(e: CustomEvent<SignedEventDetail>) {
    this.signed = true;
    console.log("נחתם על ידי:", e.detail);
  }
}
