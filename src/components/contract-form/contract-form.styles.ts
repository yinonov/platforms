import { css } from "@microsoft/fast-element";

export const ContractFormStyles = css`
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 400px;
    margin: 2rem auto;
    font-family: sans-serif;
  }

  label {
    display: flex;
    flex-direction: column;
    font-size: 0.9rem;
  }

  button {
    padding: 0.5rem;
    font-size: 1rem;
    background-color: #0d6efd;
    color: white;
    border: none;
    cursor: pointer;
  }

  pre {
    background: #f8f9fa;
    padding: 1rem;
    border: 1px solid #ddd;
    font-family: inherit;
  }
`;
