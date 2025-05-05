import { html } from "@microsoft/fast-element";
import type { HomeView } from "./home-view";

export const HomeViewTemplate = html<HomeView>`
  <main>
    <sl-card
      style="max-width: 400px; margin: 2rem auto; display: block; text-align: center;"
    >
      <h1>דף הבית</h1>
      <p>ברוכים הבאים לאפליקציית תרומות!</p>
    </sl-card>
  </main>
`;
