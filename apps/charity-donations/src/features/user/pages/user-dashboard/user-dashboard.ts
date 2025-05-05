import { FASTElement, observable } from "@microsoft/fast-element";
import { auth } from "@services/firebase-config";
import { onAuthStateChanged } from "firebase/auth";

export class UserDashboard extends FASTElement {
  @observable currentUser: any = null;

  connectedCallback() {
    super.connectedCallback();

    onAuthStateChanged(auth, (user) => {
      this.currentUser = user;
    });
  }
}
