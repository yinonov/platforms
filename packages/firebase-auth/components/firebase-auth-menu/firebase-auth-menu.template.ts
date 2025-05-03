import { html } from "@microsoft/fast-element";
import type { FirebaseAuthMenu } from "./firebase-auth-menu";

export const FirebaseAuthMenuTemplate = html<FirebaseAuthMenu>`
  ${(x) =>
    x.currentUser
      ? html`
          <sl-dropdown>
            <sl-avatar
              slot="trigger"
              image="${x.currentUser.photoURL || ""}"
              initials="${(x.currentUser.displayName &&
                x.currentUser.displayName
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")) ||
              (x.currentUser.email && x.currentUser.email[0].toUpperCase()) ||
              (x.currentUser.phoneNumber &&
                x.currentUser.phoneNumber.slice(-2)) ||
              "U"}"
              shape="circle"
              style="margin-inline-end: 0.5em; cursor: pointer;"
            ></sl-avatar>
            <sl-menu>
              <sl-button href="/logout">התנתק</sl-button>
            </sl-menu>
          </sl-dropdown>
        `
      : html`<sl-button variant="primary" href="/login">כנס</sl-button>`}
`;
