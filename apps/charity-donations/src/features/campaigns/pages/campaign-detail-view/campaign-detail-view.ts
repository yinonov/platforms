import { FASTElement, attr, observable } from "@microsoft/fast-element";
import { db } from "@services/firebase-config";
import { doc, getDoc } from "firebase/firestore";

export class CampaignDetailView extends FASTElement {
  @attr campaignId?: string;
  @observable campaign: any = null;

  async connectedCallback() {
    super.connectedCallback();
    if (this.id) {
      const snap = await getDoc(doc(db, "campaigns", this.id));
      this.campaign = snap.exists() ? { id: snap.id, ...snap.data() } : null;
    }
  }
}
