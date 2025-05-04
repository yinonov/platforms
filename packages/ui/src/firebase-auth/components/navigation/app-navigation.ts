import { FASTElement } from "@microsoft/fast-element";

export class AppNavigation extends FASTElement {
  drawer?: HTMLElement;

  connectedCallback() {
    super.connectedCallback();
  }

  openDrawer() {
    (this.drawer as any).open = true;
  }

  closeDrawer() {
    (this.drawer as any).open = false;
  }
}
