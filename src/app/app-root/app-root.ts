// src/app/app-root.ts
import { FASTElement, observable } from "@microsoft/fast-element";
import { Router } from "@vaadin/router";
import { routes } from "./routes";
import { auth, logout } from "@features/user/services";

export class AppRoot extends FASTElement {
  @observable showAuthDialog = false;
  @observable currentUser: any = null;

  connectedCallback() {
    super.connectedCallback();
    const router = new Router(this);
    router.setRoutes(routes);
    auth.onAuthStateChanged((user) => {
      this.currentUser = user;
      if (user) this.showAuthDialog = false;
    });
  }

  openAuthDialog() {
    this.showAuthDialog = true;
  }

  closeAuthDialog() {
    this.showAuthDialog = false;
  }

  async handleSignOut() {
    await logout();
  }
}
