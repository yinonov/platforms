import { FASTElement, observable } from "@microsoft/fast-element";

export class LoginView extends FASTElement {
  @observable returnTo: string = "/";

  connectedCallback() {
    super.connectedCallback();
    // Parse returnTo from URL
    const params = new URLSearchParams(window.location.search);
    const param = params.get("returnTo");
    // Only allow internal redirects for security
    if (param && param.startsWith("/")) {
      this.returnTo = param;
    } else {
      this.returnTo = "/";
    }
    // Listen for login event from user-auth
    this.addEventListener("user-auth-success", () => {
      window.history.replaceState({}, "", this.returnTo);
      window.location.reload();
    });
  }
}
