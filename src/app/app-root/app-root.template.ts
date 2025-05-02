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
      <sl-button variant="text" href="/dashboard">אזור אישי</sl-button>
      <sl-divider vertical style="margin: 0 1rem;"></sl-divider>
      <div
        style="margin-inline-start: auto; display: flex; gap: 0.5rem; align-items: center;"
      >
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
                    (x.currentUser.email &&
                      x.currentUser.email[0].toUpperCase()) ||
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
      </div>
    </nav>
  </header>
  <slot></slot>
`;
