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
      <sl-divider vertical style="margin: 0 1rem;"></sl-divider>
      <div
        style="margin-inline-start: auto; display: flex; gap: 0.5rem; align-items: center;"
      >
        ${(x) =>
          x.currentUser
            ? html`
                <span
                  style="font-size: 0.95em; opacity: 0.8; margin-inline-end: 0.5em;"
                >
                  ${x.currentUser.email ||
                  x.currentUser.phoneNumber ||
                  x.currentUser.displayName ||
                  "User"}
                </span>
                <sl-button variant="text" href="/dashboard">
                  אזור אישי
                </sl-button>
                <sl-button
                  variant="primary"
                  @click="${(x) => x.handleSignOut()}"
                >
                  צא
                </sl-button>
              `
            : html`<sl-button
                variant="primary"
                @click="${(x) => x.openAuthDialog()}"
                >כנס</sl-button
              >`}
      </div>
    </nav>
  </header>
  <sl-dialog
    ?open="${(x) => x.showAuthDialog}"
    @sl-after-hide="${(x) => x.closeAuthDialog()}"
    label="כנס"
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
