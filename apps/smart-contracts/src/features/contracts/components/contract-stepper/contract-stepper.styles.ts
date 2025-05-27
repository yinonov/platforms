import { css } from "@microsoft/fast-element";

export const ContractStepperStyles = css`
  .progress-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2rem;
    gap: 1rem;
    position: relative;
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
`;
