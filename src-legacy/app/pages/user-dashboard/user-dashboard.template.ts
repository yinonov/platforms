// user-dashboard.template.ts
import { html, repeat, when } from "@microsoft/fast-element";
import { Router } from "@vaadin/router";
import type { UserDashboard } from "./user-dashboard";

export const UserDashboardTemplate = html<UserDashboard>`
  <h2>האזור האישי</h2>
  ${when(
    (x) => x.contracts.length > 0,
    html`
      <ul>
        ${repeat(
          (x) => x.contracts,
          html`<li>
            <div class="contract-info">
              <div>
                חוזה <strong>#${(x) => x.id}</strong> עם
                ${(x) => x.signers.map((s) => s.name).join(", ")}
              </div>
              <div class="contract-date">
                נוצר בתאריך:
                ${(x) => new Date(x.createdAt).toLocaleDateString("he-IL")}
              </div>
            </div>
            <div class="contract-actions">
              <button
                @click="${(x, c) => Router.go(`/contract/${c.parent.id}`)}"
              >
                לצפייה
              </button>
            </div>
          </li>`
        )}
      </ul>
    `,
    html`<p>לא נמצאו חוזים.</p>`
  )}
`;
