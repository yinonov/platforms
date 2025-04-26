// src/app/pages/user-dashboard/user-dashboard.styles.ts
import { css } from "@microsoft/fast-element";

export const UserDashboardStyles = css`
  :host {
    display: block;
    padding: 1rem;
    font-family: sans-serif;
  }

  h2 {
    margin-bottom: 1rem;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    margin-bottom: 0.75rem;
  }

  a {
    text-decoration: none;
    color: blue;
    font-weight: bold;
  }

  a:hover {
    text-decoration: underline;
  }
`;
