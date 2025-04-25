// components/signature-panel/signature-panel.styles.ts
import { css } from "@microsoft/fast-element";

export const SignaturePanelStyles = css`
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 400px;
    padding: 1rem;
    background: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 0.75rem;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }

  label {
    font-weight: bold;
    display: block;
    margin-bottom: 0.25rem;
  }

  input {
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
  }

  button {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    background-color: #0066cc;
    color: white;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
  }

  button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  p {
    margin: 0;
    font-size: 0.95rem;
  }
`;
