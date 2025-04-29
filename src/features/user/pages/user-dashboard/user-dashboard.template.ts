import { html, repeat } from "@microsoft/fast-element";
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
                    ${repeat(
                      (x) => x.contracts,
                      html<any>`
                        <li class="contract-item">
                          <strong
                            >${(contract) =>
                              contract.title || "Untitled Contract"}</strong
                          ><br />
                          Created At:
                          ${(contract) => {
                            const val = contract.createdAt;
                            let date: Date | null = null;
                            if (val && typeof val.toDate === "function") {
                              date = val.toDate();
                            } else if (
                              typeof val === "string" ||
                              typeof val === "number"
                            ) {
                              date = new Date(val);
                            }
                            return date && !isNaN(date.getTime())
                              ? date.toLocaleString()
                              : "Unknown";
                          }}
                        </li>
                      `
                    )}
                  </ul>
                `
              : html` <p>No contracts found.</p> `}
          `}
  </div>
`;
