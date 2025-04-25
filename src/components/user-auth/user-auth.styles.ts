// src/components/user-auth/user-auth.styles.ts
import { css } from "@microsoft/fast-element";

export const UserAuthStyles = css`
  :host {
    display: block;
    font-family: sans-serif;
  }

  .login,
  .profile {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    max-width: 300px;
  }

  button {
    padding: 0.5rem;
    font-size: 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  input {
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
`;
