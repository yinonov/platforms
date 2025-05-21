import { css } from "@microsoft/fast-element";

export const FirebaseAuthContainerStyles = css`
  .auth-method-toggle {
    display: flex;
    margin-bottom: 1rem;
  }
  .auth-fields {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }
  .auth-fields sl-input,
  .auth-fields sl-button {
    border-radius: 8px;
    font-size: 1em;
  }
  .auth-fields sl-input[type="tel"]::part(form-control) input::placeholder {
    text-align: right;
    direction: rtl;
  }
  .auth-actions {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    align-items: stretch;
  }

  .auth-actions sl-button[pill] {
    border-radius: 999px;
  }
  .auth-actions sl-button img {
    height: 1.3em;
    vertical-align: middle;
    margin-inline-end: 0.5em;
    background: transparent;
  }
`;
