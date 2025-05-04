import { FASTElement, observable } from "@microsoft/fast-element";
import { Auth, User } from "firebase/auth";

export class FirebaseAuthMenu extends FASTElement {
  @observable auth?: Auth;
  @observable currentUser: User | null = null;

  connectedCallback() {
    super.connectedCallback();
    this.auth?.onAuthStateChanged((user) => {
      this.currentUser = user;
    });
  }

  async handleSignOut() {
    // await logout();
  }
}
