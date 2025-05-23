import { html } from "@microsoft/fast-element";
import type { UserDashboard } from "./user-dashboard";

export const UserDashboardTemplate = html<UserDashboard>`
  <div class="dashboard-container">
    ${(x) =>
      x.loading
        ? html` <div class="spinner">Loading...</div> `
        : html` <p>Welcome to your dashboard!</p> `}
  </div>
`;
