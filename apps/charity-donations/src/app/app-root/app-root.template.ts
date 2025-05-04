// src/app/app-root.template.ts
import { html } from "@microsoft/fast-element";
import type { AppRoot } from "./app-root";

export const AppRootTemplate = html<AppRoot>`
  <header>
    <app-navigation :auth="${(x) => x.auth}">
      <sl-button slot="links" variant="text" href="/">בית</sl-button>
      <sl-button slot="links" variant="text" href="/create-contract"
        >יצירת חוזה</sl-button
      >
      <sl-button slot="links" variant="text" href="/dashboard"
        >אזור אישי</sl-button
      >
      <firebase-auth-menu slot="end" :auth="${(x) => x.auth}">
      </firebase-auth-menu>
    </app-navigation>
  </header>
  <slot></slot>
`;
