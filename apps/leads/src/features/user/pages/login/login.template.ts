import { html } from "@microsoft/fast-element";
import type { Login } from "./login";

export const LoginTemplate = html<Login>`
  <div class="login-container">
    <h2>התחברות</h2>
    <ui-firebase-auth-container
      :auth="${(x) => x.auth}"
    ></ui-firebase-auth-container>
  </div>
`;
