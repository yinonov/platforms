// src/app/pages/contract-edit/contract-edit.template.ts
import { html, when, repeat } from "@microsoft/fast-element";
import type { ContractEdit } from "./contract-edit";

export const ContractEditTemplate = html<ContractEdit>`
  ${when((x) => x.loading, html`<p>טוען...</p>`)}
  ${when((x) => x.error, html`<p style="color: red">${(x) => x.error}</p>`)}
  ${when(
    (x) => !x.contract && !x.loading && !x.error,
    html<ContractEdit>`
      <h2>בחר סוג חוזה</h2>
      <sl-radio-group
        value="${(x) => x.selectedType}"
        @sl-change=${(x, c) =>
          x.handleTemplateSelect((c.event.target as HTMLInputElement).value)}
        style="display: flex; flex-direction: row; gap: 2rem; margin-bottom: 2rem;"
      >
        ${repeat(
          (x) => x.templates,
          html<{ type: string; label: string }>`
            <sl-radio-button value="${(t) => t.type}"
              >${(t) => t.label}</sl-radio-button
            >
          `
        )}
      </sl-radio-group>
      ${when(
        (x) => x.selectedType,
        html<ContractEdit>`
          <sc-contract-form
            :metadata=${(x) => x.template?.metadata}
            @submit=${(x, c) => x.handleSubmit((c.event as CustomEvent).detail)}
          ></sc-contract-form>
        `
      )}
    `
  )}
  ${when(
    (x) => x.contract && !x.loading && !x.error,
    html<ContractEdit>`
      <section>
        <h2>${(x) => x.contract!.title}</h2>
        <div class="contract-content">${(x) => x.contract!.content}</div>
      </section>
    `
  )}
`;
