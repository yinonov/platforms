import { html } from "@microsoft/fast-element";
import type { HomeView } from "./home-view";

export const HomeViewTemplate = html<HomeView>`
  <sl-card
    style="max-width: 400px; margin: 2rem auto; display: block; text-align: center;"
  >
    <h2>דף הבית</h2>
    <p>ברוכים הבאים לאפליקציית תרומות!</p>
  </sl-card>
`;
