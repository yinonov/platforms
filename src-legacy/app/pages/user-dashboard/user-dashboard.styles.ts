// user-dashboard.styles.ts
import { css } from "@microsoft/fast-element";

export const UserDashboardStyles = css`
  h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  li {
    background: #f8f9fa;
    border: 1px solid #dee2e6;
    border-radius: 6px;
    padding: 1rem;
    margin-bottom: 0.75rem;
    font-size: 1rem;
    line-height: 1.4;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .contract-info {
    flex-grow: 1;
  }
  .contract-date {
    font-size: 0.9rem;
    color: #999;
  }
  .contract-actions button {
    background: #0d6efd;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 0.4rem 0.75rem;
    cursor: pointer;
    font-size: 0.9rem;
  }
  .contract-actions button:hover {
    background: #0b5ed7;
  }
  p {
    font-size: 1rem;
    color: #666;
  }
`;
