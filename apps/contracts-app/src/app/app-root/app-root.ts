// src/app/app-root.ts
import { FASTElement, observable } from "@microsoft/fast-element";
import { Router } from "@vaadin/router";
import { routes } from "./routes";
import { auth } from "@features/user/services";

export class AppRoot extends FASTElement {
  @observable auth = auth;

  connectedCallback() {
    super.connectedCallback();
    const router = new Router(this);
    router.setRoutes(routes);
  }
}
