// create-contract.styles.ts
import { css } from "@microsoft/fast-element";

export const CreateContractStyles = css`
  h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  textarea {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 1rem;
    resize: vertical;
  }
  button {
    background: #0d6efd;
    color: white;
    border: none;
    padding: 0.6rem 1.2rem;
    font-size: 1rem;
    border-radius: 4px;
    cursor: pointer;
  }
  button[disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }
  p {
    font-size: 1rem;
    margin-top: 1rem;
  }
`;
