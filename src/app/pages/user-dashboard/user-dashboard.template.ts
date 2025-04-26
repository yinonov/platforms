// src/app/pages/user-dashboard/user-dashboard.template.ts
import { html, when, repeat } from "@microsoft/fast-element";
import type { UserDashboard } from "./user-dashboard";

export const UserDashboardTemplate = html<UserDashboard>`
  ${when((x) => x.loading, html`<p>טוען...</p>`)}
  ${when((x) => x.error, html`<p style="color: red">${(x) => x.error}</p>`)}
  ${when(
    (x) => !x.loading && !x.error && x.myContracts.length === 0,
    html`<p>לא נמצאו חוזים.</p>`
  )}
  ${when(
    (x) => !x.loading && !x.error && x.myContracts.length > 0,
    html`
      <h2>החוזים שלי</h2>
      <ul>
        ${repeat(
          (x) => x.myContracts,
          html<{ id: string; title: string }>`
            <li>
              <a href="/contract/${(x) => x.id}"
                >${(x) => x.title || "ללא כותרת"}</a
              >
            </li>
          `
        )}
      </ul>
    `
  )}
`;
