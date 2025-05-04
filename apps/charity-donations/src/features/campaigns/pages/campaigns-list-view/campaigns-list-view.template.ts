import { html, repeat } from "@microsoft/fast-element";
import type { CampaignsListView } from "./campaigns-list-view";

export const CampaignsListViewTemplate = html<CampaignsListView>`
  <h2>קמפיינים</h2>
  <a href="/campaigns/create">
    <button style="margin-bottom:1rem;">צור קמפיין חדש</button>
  </a>
  <ul>
    ${repeat(
      (x) => x.campaigns,
      html<any>`
        <li>
          <a href="/campaigns/${(x) => x.id}">${(x) => x.title || x.id}</a>
        </li>
      `
    )}
  </ul>
`;
