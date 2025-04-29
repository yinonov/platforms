// src/app/app-root.styles.ts
import { css } from "@microsoft/fast-element";

export const AppRootStyles = css`
  :host {
    display: block;
    padding: 1rem;
    font-family: sans-serif;
  }

  header {
    position: sticky;
    top: 0;
    z-index: 3;
  }
`;
