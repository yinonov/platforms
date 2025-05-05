import { html } from "@microsoft/fast-element";
import type { CampaignDetail } from "./campaign-detail";

export const CampaignDetailTemplate = html<CampaignDetail>`
  <main>
    <section>
      <sl-card style="max-width: 600px; margin: 2rem auto; display: block;">
        <article>
          <header>
            <h1>${(x) => x.campaign?.title || "קמפיין"}</h1>
          </header>
          <p>${(x) => x.campaign?.description || ""}</p>
          <p><strong>יעד:</strong> ${(x) => x.campaign?.goal || "לא צויין"}</p>
        </article>
      </sl-card>
    </section>
  </main>
`;
