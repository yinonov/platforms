import { FASTElement, observable } from "@microsoft/fast-element";

export class UserDashboard extends FASTElement {
  @observable loading = true;

  connectedCallback() {
    super.connectedCallback();
    this.loading = false;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }
}
