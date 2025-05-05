import { html } from "@microsoft/fast-element";
import type { Home } from "./home";

export const HomeTemplate = html<Home>`
  <sl-card
    style="max-width: 400px; margin: 2rem auto; display: block; text-align: center;"
  >
    <h2>דף הבית</h2>
    <p>ברוכים הבאים לאפליקציית החוזים!</p>
    <sl-button
      variant="primary"
      href="/create-contract"
      style="margin-top: 1rem;"
      >צור חוזה חדש</sl-button
    >
  </sl-card>
`;
