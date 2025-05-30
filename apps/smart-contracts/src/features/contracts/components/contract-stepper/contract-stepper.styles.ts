import { css } from "@microsoft/fast-element";

export const ContractStepperStyles = css`
  .progress-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-block: 2rem;
    margin-inline: auto;
    gap: 1rem;
    position: relative;
    inline-size: 60vw;
  }

  /* Specific positioning styles - keep these as they're functional, not visual */
  .progress-badge {
    position: relative;
    z-index: 2;
    flex-shrink: 0;
  }

  .progress-bar {
    flex: 1;
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
    --height: 6px;
  }

  .contract-form {
    inline-size: 60vw;
    display: block;
    margin-inline: auto;
  }

  .progress-actions {
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
    justify-content: flex-end;
    inline-size: 60vw;
    margin-inline: auto;
  }
`;
