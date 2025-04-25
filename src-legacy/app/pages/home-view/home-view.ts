// home-view.ts
import { FASTElement } from "@microsoft/fast-element";

export class HomeView extends FASTElement {
  connectedCallback() {
    super.connectedCallback();
    console.log("HomeView loaded");
  }
}
