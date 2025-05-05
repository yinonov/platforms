import { FASTElement, attr, observable } from "@microsoft/fast-element";
import { db } from "@services/firebase-config";
import { doc, getDoc } from "firebase/firestore";

export class CampaignDetail extends FASTElement {
  @attr campaignId?: string;
  @observable campaign: any = null;

  async connectedCallback() {
    super.connectedCallback();
    if (this.campaignId) {
      const snap = await getDoc(doc(db, "campaigns", this.campaignId));
      this.campaign = snap.exists() ? { id: snap.id, ...snap.data() } : null;
    }
  }
}
