// create-contract.template.ts
import { html, when } from "@microsoft/fast-element";
import type { CreateContract } from "./create-contract";

export const CreateContractTemplate = html<CreateContract>`
  <h2>יצירת חוזה חדש</h2>

  <contract-form
    @contract-generated="${(x, c) =>
      (x.contractContent = (c.event as CustomEvent).detail.text)}"
    @contract-data="${(x, c) => x.handleFormData(c.event as CustomEvent)}"
  ></contract-form>

  ${when(
    (x) => x.contractContent,
    html`
      <section>
        <h3>תצוגת חוזה</h3>
        <pre
          style="background: #f8f9fa; padding: 1rem; border: 1px solid #ccc; border-radius: 4px;"
        >
        ${(x) => x.contractContent}
      </pre
        >
        <button
          @click="${(x, c) => x.save()}"
          ?disabled="${(x) => x.saving || x.contractId !== ""}"
        >
          ${when((x) => x.saving, html`שומר...`, html`שמור חוזה`)}
        </button>
      </section>
    `
  )}
  ${when((x) => x.error, html`<p style="color: red;">${(x) => x.error}</p>`)}
`;
