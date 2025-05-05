import { html } from "@microsoft/fast-element";
import type { CampaignCreate } from "./campaign-create";

export const CampaignCreateTemplate = html<CampaignCreate>`
  <main>
    <section>
      <sl-card style="max-width: 500px; margin: 2rem auto; display: block;">
        <form
          @submit="${(x, c) => {
            c.event.preventDefault();
            x.createCampaign();
          }}"
        >
          <h1>צור קמפיין חדש</h1>
          <sl-input
            label="כותרת"
            value="${(x) => x.title}"
            @input="${(x, c) => {
              const target = c.event.target as HTMLInputElement | null;
              if (target) x.title = target.value;
            }}"
            required
            style="margin-bottom: 1rem;"
          ></sl-input>
          <sl-textarea
            label="תיאור"
            value="${(x) => x.description}"
            @input="${(x, c) => {
              const target = c.event.target as HTMLTextAreaElement | null;
              if (target) x.description = target.value;
            }}"
            style="margin-bottom: 1rem;"
          ></sl-textarea>
          <sl-input
            type="number"
            label="יעד (סכום)"
            value="${(x) => x.goal}"
            @input="${(x, c) => {
              const target = c.event.target as HTMLInputElement | null;
              if (target) x.goal = target.value;
            }}"
            required
            style="margin-bottom: 1rem;"
          ></sl-input>
          <sl-button
            type="submit"
            variant="primary"
            ?disabled="${(x) => x.loading}"
          >
            צור
          </sl-button>
          <div style="color:red;">${(x) => x.error}</div>
        </form>
      </sl-card>
    </section>
  </main>
`;
