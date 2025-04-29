// src/app/app-root.ts
import { FASTElement } from "@microsoft/fast-element";
import { Router } from "@vaadin/router";
import { routes } from "./routs";

export class AppRoot extends FASTElement {
  connectedCallback() {
    super.connectedCallback();
    const router = new Router(this);
    router.setRoutes(routes);
  }
}
