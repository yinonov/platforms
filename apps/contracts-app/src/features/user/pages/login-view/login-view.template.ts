import { html } from "@microsoft/fast-element";
import type { LoginView } from "./login-view";

export const LoginViewTemplate = html<LoginView>`
  <div class="login-container">
    <h2>התחברות</h2>
    <user-auth></user-auth>
  </div>
`;
