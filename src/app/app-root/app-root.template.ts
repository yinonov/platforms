// src/app/app-root.template.ts
import { html } from "@microsoft/fast-element";
import type { AppRoot } from "./app-root";

export const AppRootTemplate = html<AppRoot>`
  <header>
    <nav>
      <a href="/">בית</a>
      <a href="/contract">יצירת חוזה</a>
      <a href="/dashboard">האזור האישי</a>
      <user-auth></user-auth>
    </nav>
  </header>
  <slot></slot>
`;
