import { html } from "@microsoft/fast-element";
import type { Home } from "./home";

export const HomeTemplate = html<Home>`
  <main>
    <sl-card
      style="max-width: 400px; margin: 2rem auto; display: block; text-align: center;"
    >
      <h1>דף הבית</h1>
      <p>ברוכים הבאים לאפליקציית תרומות!</p>
    </sl-card>
  </main>
`;
