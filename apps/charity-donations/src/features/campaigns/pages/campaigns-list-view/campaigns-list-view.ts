import { FASTElement, attr, observable } from "@microsoft/fast-element";
import { db } from "@services/firebase-config";
import { collection, getDocs } from "firebase/firestore";

export class CampaignsListView extends FASTElement {
  @observable campaigns: any[] = [];

  async connectedCallback() {
    super.connectedCallback();
    const snapshot = await getDocs(collection(db, "campaigns"));
    this.campaigns = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
}
