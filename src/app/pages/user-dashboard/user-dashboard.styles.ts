import { css } from "@microsoft/fast-element";

export const UserDashboardStyles = css`
  .dashboard-container {
    padding: 2rem;
    max-width: 800px;
    margin: 0 auto;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .spinner {
    text-align: center;
    font-size: 1.2rem;
    color: #007bff;
    padding: 2rem 0;
  }

  .contracts-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .contract-item {
    padding: 1rem;
    border-bottom: 1px solid #ddd;
  }

  .contract-item:last-child {
    border-bottom: none;
  }

  p {
    text-align: center;
    color: #666;
  }
`;
