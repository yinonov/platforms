// src/app/app-root.template.ts
import { html, ref } from "@microsoft/fast-element";
import type { AppRoot } from "./app-root";

export const AppRootTemplate = html<AppRoot>`
  <header>
    <app-navigation></app-navigation>
  </header>
  <slot></slot>
`;
