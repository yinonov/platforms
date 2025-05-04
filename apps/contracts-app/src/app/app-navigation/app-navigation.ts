import { FASTElement } from "@microsoft/fast-element";

export class AppNavigation extends FASTElement {
  drawer?: HTMLElement;

  connectedCallback() {
    super.connectedCallback();
  }

  openDrawer() {
    if (this.drawer) {
      (this.drawer as any).open = true;
    }
  }
}
