import { html, repeat } from "@microsoft/fast-element";
import type { CampaignsList } from "./campaigns-list";

export const CampaignsListTemplate = html<CampaignsList>`
  <main>
    <section>
      <sl-card style="max-width: 600px; margin: 2rem auto; display: block;">
        <header>
          <h1>קמפיינים</h1>
        </header>
        <a href="/campaigns/create">
          <sl-button variant="primary" style="margin-bottom:1rem; width: 100%;">
            צור קמפיין חדש
          </sl-button>
        </a>
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
