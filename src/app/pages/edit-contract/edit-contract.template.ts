// src/app/pages/edit-contract/edit-contract.template.ts
import { html, repeat, when } from "@microsoft/fast-element";
import type { EditContract } from "./edit-contract";

export const EditContractTemplate = html<EditContract>`
  ${when((x) => x.loading, html`<p>טוען...</p>`)}
  ${when(
    (x) => x.error,
    html<EditContract>`<p style="color: red">${(x) => x.error}</p>`
  )}
  ${when(
    (x) => !x.contractId && !x.loading && !x.error,
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
    (x) => x.contract && !x.loading && !x.error,
    html<EditContract>`
      <contract-form
        type="${(x) => x.contract!.type}"
        .metadata="${(x) => x.contract!.metadata}"
        @submit=${(x, c) => x.handleSubmit((c.event as CustomEvent).detail)}
      ></contract-form>
    `
  )}
`;
