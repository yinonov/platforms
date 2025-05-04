import { FASTElement, attr } from "@microsoft/fast-element";
import { SlDrawer } from "@shoelace-style/shoelace";
import { Auth } from "firebase/auth";
import { NavLink } from "../../models";

export class AppNavigation extends FASTElement {
  @attr links: NavLink[] = [];
  auth?: Auth;
  drawer?: HTMLElement;

  openDrawer() {
    (this.drawer as SlDrawer).show();
  }

  closeDrawer() {
    (this.drawer as SlDrawer).hide();
  }
}
