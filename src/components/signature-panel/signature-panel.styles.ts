import { css } from "@microsoft/fast-element";

export const SignaturePanelStyles = css`
  form.card {
    background: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 12px;
    padding: 2rem;
    max-width: 400px;
    margin: auto;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }
  h3 {
    margin-bottom: 1rem;
    font-size: 1.25rem;
    text-align: center;
  }
  label {
    display: block;
    font-family: sans-serif;
  }
  input[type="text"],
  input[type="tel"] {
    padding: 0.5rem;
    font-size: 1rem;
    width: 100%;
    margin-top: 0.25rem;
    margin-bottom: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  button {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    background: #0d6efd;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    margin-bottom: 1rem;
  }
  button:hover {
    background: #0b5ed7;
  }
  #error-message {
    min-height: 1.2rem;
  }
`;
