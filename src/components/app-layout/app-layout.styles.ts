// app-layout.styles.ts
import { css } from "@microsoft/fast-element";

export const AppLayoutStyles = css`
  header {
    background: #f0f0f0;
    padding: 1rem;
  }
  nav {
    display: flex;
    gap: 1rem;
    justify-content: center;
  }
  nav a {
    text-decoration: none;
    color: #0d6efd;
    font-weight: bold;
  }
  main {
    padding: 2rem;
  }
`;
