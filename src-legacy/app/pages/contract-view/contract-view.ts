// src/app/pages/contract-view/contract-view.ts
import { FASTElement, observable } from "@microsoft/fast-element";
import { Contract } from "../../../models";
import { db } from "../../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { RouterLocation } from "@vaadin/router";
import type { SignedEventDetail } from "../../../models";

export class ContractView extends FASTElement {
  @observable contract: Contract | null = null;
  @observable loading = true;
  @observable error: string | null = null;
  @observable signatureDetails: SignedEventDetail | null = null;

  async connectedCallback() {
    super.connectedCallback();
    const location = this.getRootNode()?.host?.location as
      | RouterLocation
      | undefined;
    const contractId = location?.params?.id;

    if (!contractId) {
      this.error = "לא נמצא מזהה חוזה בכתובת.";
      this.loading = false;
      return;
    }

    try {
      const ref = doc(db, "contracts", contractId);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data();
        this.contract = { id: snap.id, ...data } as Contract;
        this.signatureDetails = data.signatureDetails || null;
      } else {
        this.error = "החוזה לא נמצא.";
      }
    } catch (err: any) {
      this.error = "שגיאה בעת טעינת החוזה";
      console.error(err);
    } finally {
      this.loading = false;
    }
  }

  async handleSigned(e: CustomEvent<SignedEventDetail>) {
    if (!this.contract?.id) return;

    const ref = doc(db, "contracts", this.contract.id);
    try {
      await updateDoc(ref, {
        signed: true,
        signatureDetails: e.detail,
      });
      this.contract.signed = true;
      this.signatureDetails = e.detail;
    } catch (err) {
      console.error("שגיאה בשמירת חתימה:", err);
      this.error = "לא ניתן לשמור את החתימה.";
    }
  }
}
