import { css } from "@microsoft/fast-element";

export const AppNavigationStyles = css`
  @media (max-width: 700px) {
    .nav-links {
      display: none !important;
    }
    .nav-menu-btn {
      display: inline-flex !important;
    }
  }
  @media (min-width: 701px) {
    .nav-menu-btn {
      display: none !important;
    }
    .nav-links {
      display: flex !important;
      gap: 1rem;
      align-items: center;
    }
  }
`;
