import { css } from "@microsoft/fast-element";

export const SignaturePanelStyles = css`
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  label {
    display: block;
    font-family: sans-serif;
  }
  input {
    padding: 0.5rem;
    font-size: 1rem;
    width: 100%;
    box-sizing: border-box;
  }
  button {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    background: #0d6efd;
    color: white;
    border: none;
    cursor: pointer;
  }
`;
