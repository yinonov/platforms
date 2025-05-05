import { html, repeat } from "@microsoft/fast-element";
import type { UserDashboard } from "./user-dashboard";

export const UserDashboardTemplate = html<UserDashboard>`
  <main>
    <section>
      <sl-card
        style="max-width: 500px; margin: 2rem auto; display: block; text-align: center;"
      >
        <h1>לוח משתמש</h1>
        <p>ברוך הבא, ${(x) => x.currentUser?.displayName || "משתמש"}!</p>
        <h2>הקמפיינים שלי</h2>
        <ul style="list-style: none; padding: 0;">
          ${repeat(
            (x) => x.campaigns,
            html<any>`
              <li style="margin-bottom: 1rem;">
                <sl-card>
                  <a href="/campaigns/${(x) => x.id}">
                    <strong>${(x) => x.title || x.id}</strong>
                  </a>
                </sl-card>
              </li>
            `
          )}
        </ul>
      </sl-card>
    </section>
  </main>
`;
