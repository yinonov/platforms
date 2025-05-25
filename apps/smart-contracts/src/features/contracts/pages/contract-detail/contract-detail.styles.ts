import { css } from "@microsoft/fast-element";

export const ContractDetailStyles = css`
  .contract {
    background: var(--sl-color-neutral-0);
    min-height: 60vh;
  }
  sl-card {
    box-shadow: 0 2px 8px #0001;
    border-radius: 1rem;
  }
  .contract-details pre {
    font-size: 1rem;
    line-height: 1.6;
    background: #f8f8f8;
    border-radius: 8px;
    padding: 1rem;
    margin: 0;
    direction: rtl;
    white-space: pre-wrap;
    word-break: break-word;
  }
  .contract-actions {
    margin-top: 1rem;
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
  }
`;
