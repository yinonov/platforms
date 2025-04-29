import { html } from "@microsoft/fast-element";
import type { UserDashboard } from "./user-dashboard";

export const UserDashboardTemplate = html<UserDashboard>`
  <div class="dashboard-container">
    ${(x) =>
      x.loading
        ? html` <div class="spinner">Loading contracts...</div> `
        : html`
            ${x.contracts.length > 0
              ? html`
                  <ul class="contracts-list">
                    ${x.contracts.map(
                      (contract) => html`
                        <li class="contract-item">
                          <strong
                            >${contract.title || "Untitled Contract"}</strong
                          ><br />
                          Created At:
                          ${contract.createdAt
                            ? new Date(contract.createdAt).toLocaleString()
                            : "Unknown"}
                        </li>
                      `
                    )}
                  </ul>
                `
              : html` <p>No contracts found.</p> `}
          `}
  </div>
`;
