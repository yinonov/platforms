import { html } from "@microsoft/fast-element";
import type { Login } from "./login";

export const LoginTemplate = html<Login>`
  <main>
    <section>
      <sl-card
        style="max-width: 400px; margin: 2rem auto; display: block; text-align: center;"
      >
        <h1>התחברות</h1>
        <firebase-auth-container
          :auth="${(x) => x.auth}"
        ></firebase-auth-container>
      </sl-card>
    </section>
  </main>
`;
