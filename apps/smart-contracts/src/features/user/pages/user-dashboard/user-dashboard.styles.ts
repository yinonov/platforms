import { css } from "@microsoft/fast-element";

export const UserDashboardStyles = css`
  .dashboard-hero {
    margin-bottom: 2rem;
  }

  .hero-card {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    text-align: center;
    padding: 3rem 2rem;
  }

  .hero-content {
    max-width: 600px;
    margin: 0 auto;
  }

  .hero-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
    opacity: 0.9;
  }

  .hero-card h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    background: none;
    -webkit-background-clip: unset;
    -webkit-text-fill-color: unset;
    color: white;
  }

  .hero-subtitle {
    font-size: 1.2rem;
    opacity: 0.9;
    margin: 0;
  }

  .dashboard-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .stat-card {
    padding: 1.5rem;
    transition: all 0.3s ease;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .stat-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  }

  .stat-content {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .stat-icon {
    font-size: 2.5rem;
    color: var(--sl-color-primary-600);
  }

  .stat-info {
    display: flex;
    flex-direction: column;
  }

  .stat-number {
    font-size: 2rem;
    font-weight: 700;
    color: var(--sl-color-primary-600);
    line-height: 1;
  }

  .stat-label {
    font-size: 0.9rem;
    color: var(--sl-color-neutral-600);
    margin-top: 0.25rem;
  }

  .dashboard-container {
    max-width: 1200px;
    margin: 0 auto;
  }

  .dashboard-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .dashboard-header h2 {
    font-size: 1.8rem;
    margin: 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .create-btn {
    background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
    border: none;
    box-shadow: 0 4px 16px rgba(17, 153, 142, 0.3);
    transition: all 0.3s ease;
  }

  .create-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(17, 153, 142, 0.4);
  }

  .loading-container {
    text-align: center;
    padding: 4rem 2rem;
  }

  .loading-text {
    margin-top: 1rem;
    font-size: 1.1rem;
    color: var(--sl-color-neutral-600);
  }

  .contracts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 1.5rem;
  }

  .contract-card {
    padding: 1.5rem;
    transition: all 0.3s ease;
    border: 1px solid rgba(255, 255, 255, 0.2);
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);

    &::part(base) {
      block-size: 100%;
    }
  }

  .contract-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  }

  .contract-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
  }

  .contract-title {
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0;
    color: var(--sl-color-neutral-900);
    flex: 1;
    margin-left: 1rem;
  }

  .contract-status {
    flex-shrink: 0;
  }

  .contract-meta {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
  }

  .meta-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    color: var(--sl-color-neutral-600);
  }

  .meta-item sl-icon {
    font-size: 1rem;
    color: var(--sl-color-neutral-500);
  }

  .contract-actions {
    display: flex;
    gap: 0.5rem;
    padding-top: 1rem;
    border-top: 1px solid var(--sl-color-neutral-200);
  }

  .view-btn,
  .edit-btn {
    flex: 1;
    transition: all 0.3s ease;
  }

  .view-btn:hover {
    background: rgba(102, 126, 234, 0.1);
    color: var(--sl-color-primary-600);
  }

  .edit-btn:hover {
    background: rgba(17, 153, 142, 0.1);
    color: var(--sl-color-success-600);
  }

  .empty-state {
    display: flex;
    justify-content: center;
    padding: 4rem 2rem;
  }

  .empty-card {
    max-width: 400px;
    width: 100%;
    text-align: center;
    padding: 3rem 2rem;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
  }

  .empty-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .empty-icon {
    font-size: 4rem;
    color: var(--sl-color-neutral-400);
    margin-bottom: 1rem;
  }

  .empty-card h3 {
    font-size: 1.5rem;
    margin: 0;
    color: var(--sl-color-neutral-700);
  }

  .empty-card p {
    margin: 0;
    color: var(--sl-color-neutral-600);
    margin-bottom: 1.5rem;
  }

  /* Responsive design */
  @media (max-width: 768px) {
    .hero-card {
      padding: 2rem 1rem;
    }

    .hero-card h1 {
      font-size: 2rem;
    }

    .dashboard-stats {
      grid-template-columns: 1fr;
    }

    .contracts-grid {
      grid-template-columns: 1fr;
    }

    .dashboard-header {
      flex-direction: column;
      align-items: stretch;
    }

    .create-btn {
      width: 100%;
    }
  }

  @media (max-width: 480px) {
    .stat-content {
      flex-direction: column;
      text-align: center;
    }

    .contract-header {
      flex-direction: column;
      gap: 0.5rem;
    }

    .contract-actions {
      flex-direction: column;
    }
  }
`;
