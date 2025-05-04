import { html } from "@microsoft/fast-element";
import type { CampaignCreateView } from "./campaign-create-view";

export const CampaignCreateViewTemplate = html<CampaignCreateView>`
  <form
    @submit="${(x, c) => {
      c.event.preventDefault();
      x.createCampaign();
    }}"
    style="max-width:400px;margin:2rem auto;"
  >
    <h2>צור קמפיין חדש</h2>
    <label>
      כותרת:
      <input
        type="text"
        value="${(x) => x.title}"
        @input="${(x, c) => {
          const target = c.event.target as HTMLInputElement | null;
          if (target) x.title = target.value;
        }}"
        required
      />
    </label>
    <label>
      תיאור:
      <textarea
        value="${(x) => x.description}"
        @input="${(x, c) => {
          const target = c.event.target as HTMLTextAreaElement | null;
          if (target) x.description = target.value;
        }}"
      ></textarea>
    </label>
    <label>
      יעד (סכום):
      <input
        type="number"
        value="${(x) => x.goal}"
        @input="${(x, c) => {
          const target = c.event.target as HTMLInputElement | null;
          if (target) x.goal = target.value;
        }}"
        required
      />
    </label>
    <button type="submit" ?disabled="${(x) => x.loading}">צור</button>
    <div style="color:red;">${(x) => x.error}</div>
  </form>
`;
