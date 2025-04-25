// components/contracts/contracts.styles.ts
import { css } from "@microsoft/fast-element";

export const ContractsStyles = css`
  section {
    margin-bottom: 2rem;
  }

  h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid #ccc;
    padding-bottom: 0.5rem;
  }

  .contract-card {
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 0.75rem;
    padding: 1rem;
    margin-bottom: 1rem;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  }

  .contract-card h3 {
    margin: 0 0 0.5rem 0;
  }

  .contract-card p {
    margin: 0 0 1rem 0;
    font-size: 0.95rem;
    color: #444;
  }

  .contract-card button {
    background-color: #0077cc;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    cursor: pointer;
  }

  .contract-card button:hover {
    background-color: #005fa3;
  }
`;
