import { FASTElement } from "@microsoft/fast-element";
import { SlDrawer } from "@shoelace-style/shoelace";
import { Auth } from "firebase/auth";

export class AppNavigation extends FASTElement {
  auth?: Auth;
  drawer?: HTMLElement;
  drawerLinksContainer?: HTMLElement;
  linksNodes?: HTMLElement[] = [];

  connectedCallback() {
    console.log("AppNavigation connectedCallback");
    super.connectedCallback();
  }

  openDrawer() {
    console.log("openDrawer");
    // clone the linksNodes to the drawerLinksContainer
    if (this.drawerLinksContainer && this.linksNodes) {
      this.drawerLinksContainer.innerHTML = "";
      this.linksNodes.forEach((node) => {
        const clone = node.cloneNode(true);
        clone.addEventListener("click", (event) => {
          this.closeDrawer();
        });
        this.drawerLinksContainer?.appendChild(clone);
      });
    }
    (this.drawer as SlDrawer).show();
  }

  closeDrawer() {
    (this.drawer as SlDrawer).hide();
  }
}
