// app-layout.ts
import { FASTElement } from "@microsoft/fast-element";
import { initRouter } from "../../app/router";

export class AppLayout extends FASTElement {
  connectedCallback() {
    super.connectedCallback();
    const outlet = this.shadowRoot?.getElementById("outlet");
    if (outlet) initRouter(outlet);
  }
}
