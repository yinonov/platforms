// contract-view.ts
import { FASTElement, observable } from "@microsoft/fast-element";
import { Contract } from "../../models/contract";
import { db } from "../../firebase/firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { RouterLocation } from "@vaadin/router";

export class ContractView extends FASTElement {
  @observable contract: Contract | null = null;
  @observable loading = true;
  @observable error: string | null = null;

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
        this.contract = { id: snap.id, ...snap.data() } as Contract;
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
}
