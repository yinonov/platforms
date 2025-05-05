import { FASTElement, attr, observable } from "@microsoft/fast-element";
import { db } from "@services/firebase-config";
import { collection, addDoc } from "firebase/firestore";

export class CampaignCreate extends FASTElement {
  @observable title = "";
  @observable description = "";
  @observable goal = "";
  @observable loading = false;
  @observable error = "";

  async createCampaign() {
    this.loading = true;
    this.error = "";
    try {
      await addDoc(collection(db, "campaigns"), {
        title: this.title,
        description: this.description,
        goal: this.goal,
        createdAt: new Date().toISOString(),
      });
      this.title = "";
      this.description = "";
      this.goal = "";
      this.$emit("campaign-created");
    } catch (e) {
      this.error = "שגיאה ביצירת קמפיין";
    } finally {
      this.loading = false;
    }
  }
}
