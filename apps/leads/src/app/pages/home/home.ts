// home.ts
import { FASTElement } from "@microsoft/fast-element";

export class Home extends FASTElement {
  connectedCallback() {
    super.connectedCallback();
    console.log("Home loaded");
  }
}
