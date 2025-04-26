// src/app/pages/edit-contract/edit-contract.template.ts
import { html, when, repeat } from "@microsoft/fast-element";
import type { EditContract } from "./edit-contract";
import "../../../components/contract-form";

export const EditContractTemplate = html<EditContract>`
  ${when((x) => x.loading, html`<p>טוען...</p>`)}
  ${when((x) => x.error, html`<p style="color: red">${(x) => x.error}</p>`)}
  ${when(
    (x) => !x.contract && !x.selectedType && !x.loading && !x.error,
    html<EditContract>`
      <h2>בחר סוג חוזה</h2>
      <select
        @change=${(x, c) =>
          x.handleTemplateSelect((c.event.target as HTMLSelectElement).value)}
      >
        <option value="">בחר...</option>
        ${repeat(
          (x) => x.templates,
          html<{ type: string; label: string }>`
            <option value="${(t) => t.type}">${(t) => t.label}</option>
          `
        )}
      </select>
    `
  )}
  ${when(
    (x) => !x.contract && x.selectedType && !x.loading && !x.error,
    html<EditContract>`
      <contract-form
        type="${(x) => x.selectedType}"
        :metadata=${(x) => ({})}
        @submit=${(x, c) => x.handleSubmit((c.event as CustomEvent).detail)}
      ></contract-form>
    `
  )}
  ${when(
    (x) => x.contract && !x.loading && !x.error,
    html<EditContract>`
      <section>
        <h2>${(x) => x.contract!.title}</h2>
        <div class="contract-content">${(x) => x.contract!.content}</div>
      </section>
    `
  )}
`;
