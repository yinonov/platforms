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
      <user-auth></user-auth>
    </nav>
  </header>
  <slot></slot>
`;
