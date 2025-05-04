import { setBasePath, registerIconLibrary } from "@shoelace-style/shoelace";

setBasePath(
  "https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.20.1/cdn/"
);
registerIconLibrary("bootstrap", {
  resolver: (name) =>
    `https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/${name}.svg`,
  mutator: (svg) => svg.setAttribute("fill", "currentColor"),
});

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
