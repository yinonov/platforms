import { html } from "@microsoft/fast-element";
import type { CampaignDetailView } from "./campaign-detail-view";

export const CampaignDetailViewTemplate = html<CampaignDetailView>`
  <div>
    <h2>${(x) => x.campaign?.title || "קמפיין"}</h2>
    <p>${(x) => x.campaign?.description || ""}</p>
    <p><strong>יעד:</strong> ${(x) => x.campaign?.goal || "לא צוין"}</p>
  </div>
`;
