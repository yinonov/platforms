// src/app/app-root.ts
import { FASTElement, observable } from "@microsoft/fast-element";
import { Router } from "@vaadin/router";
import { routes } from "./routes";
import { auth, logout } from "@features/user/services";

export class AppRoot extends FASTElement {
  @observable currentUser: any = null;

  connectedCallback() {
    super.connectedCallback();
    const router = new Router(this);
    router.setRoutes(routes);
    auth.onAuthStateChanged((user) => {
      this.currentUser = user;
    });
  }

  async handleSignOut() {
    await logout();
  }

  onBeforeEnter(location: any, commands: any) {
    console.log("onBeforeEnter", location);
    // if (!window.authorized) {
    //   return commands.redirect(
    //     "/login/" + encodeURIComponent(location.pathname)
    //   );
    // }
  }
}
