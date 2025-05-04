import { FASTElement } from "@microsoft/fast-element";
import { SlDrawer } from "@shoelace-style/shoelace";
import { Auth } from "firebase/auth";

export class AppNavigation extends FASTElement {
  auth?: Auth;
  drawer?: HTMLElement;
  drawerLinksContainer?: HTMLElement;
  linksNodes?: HTMLElement[];

  connectedCallback() {
    console.log("AppNavigation connectedCallback");
    super.connectedCallback();
  }

  openDrawer() {
    console.log("openDrawer");
    (this.drawer as SlDrawer).show();
  }

  closeDrawer() {
    (this.drawer as SlDrawer).hide();
  }
}
