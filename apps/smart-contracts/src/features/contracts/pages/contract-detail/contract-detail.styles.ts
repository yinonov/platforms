import { css } from "@microsoft/fast-element";

export const ContractDetailStyles = css`
  .contract {
    background: var(--sl-color-neutral-0);
    min-height: 60vh;
  }
  /* Removed direct sl-card styling - use .glass-card class instead */

  .contract-actions {
    margin-top: 1rem;
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
  }
`;
