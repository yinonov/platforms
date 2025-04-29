// src/app/app-root.template.ts
import { html } from "@microsoft/fast-element";
import type { AppRoot } from "./app-root";

export const AppRootTemplate = html<AppRoot>`
  <header>
    <nav
      style="display: flex; align-items: center; gap: 1rem; padding: 0.5rem 1rem; background: var(--sl-color-neutral-0); border-radius: 0.5rem; box-shadow: 0 2px 8px #0001;"
    >
      <sl-icon
        name="file-earmark-text"
        library="bootstrap"
        style="font-size: 1.5rem;"
      ></sl-icon>
      <sl-button variant="text" href="/">בית</sl-button>
      <sl-button variant="text" href="/create-contract">יצירת חוזה</sl-button>
      <sl-button variant="text" href="/dashboard">האזור האישי</sl-button>
      <sl-divider vertical style="margin: 0 1rem;"></sl-divider>
      ${(x) =>
        x.currentUser
          ? html`<span style="font-size: 0.95em;"
              >${x.currentUser.email || x.currentUser.phoneNumber}</span
            >`
          : html`<sl-button
              variant="primary"
              @click="${(x) => x.openAuthDialog()}"
              >Sign In</sl-button
            >`}
    </nav>
  </header>
  <sl-dialog
    ?open="${(x) => x.showAuthDialog}"
    @sl-after-hide="${(x) => x.closeAuthDialog()}"
    label="Sign In"
    style="--width: 400px;"
  >
    <user-auth></user-auth>
    <sl-button
      slot="footer"
      variant="text"
      @click="${(x) => x.closeAuthDialog()}"
      >Close</sl-button
    >
  </sl-dialog>
  <slot></slot>
`;
