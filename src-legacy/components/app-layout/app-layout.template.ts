// app-layout.template.ts
import { html } from "@microsoft/fast-element";
import type { AppLayout } from "./app-layout";

export const AppLayoutTemplate = html<AppLayout>`
  <header>
    <nav>
      <a href="/">בית</a>
      <a href="/create">יצירת חוזה</a>
      <a href="/dashboard">האזור האישי</a>
      <auth-panel></auth-panel>
    </nav>
  </header>
  <main id="outlet"></main>
`;
