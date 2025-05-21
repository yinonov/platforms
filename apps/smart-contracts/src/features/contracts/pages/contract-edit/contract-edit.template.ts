import { html, repeat, when } from "@microsoft/fast-element";
import type { ContractEdit } from "./contract-edit";
import {
  type ContractTemplate,
  contractTemplateMap,
} from "@features/contracts/templates/contract-templates";

export const ContractEditTemplate = html<ContractEdit>`
  <h2>בחר סוג חוזה</h2>
  <sl-radio-group
    value="${(x) => x.selectedType}"
    @sl-change=${(x, c) =>
      x.handleTemplateSelect((c.event.target as HTMLInputElement).value)}
  >
    ${repeat(
      (x) => x.contractTypes,
      html<string>`
        <sl-radio-button value="${(type) => type}">
          ${(type) => contractTemplateMap[type].title}
        </sl-radio-button>
      `
    )}
  </sl-radio-group>
  ${when(
    (x) => x.loading,
    html`<div style="display: flex; justify-content: center; margin: 2rem 0;">
      <sl-spinner style="font-size: 2rem;"></sl-spinner>
    </div>`
  )}
  ${when(
    (x) => x.error,
    html`<sl-alert open variant="danger" style="margin-bottom: 1rem;">
      ${(x) => x.error}
    </sl-alert>`
  )}
  ${when(
    (x) => x.template,
    html<ContractEdit>`
      <sc-contract-stepper
        :template=${(x) => x.template}
        :loading=${(x) => x.loading}
        @submit=${(x, c) => x.handleSubmit((c.event as CustomEvent).detail.values)}
      ></sc-contract-stepper>
    `
  )}
`;
