import { html, when, InlineTemplateDirective } from "@microsoft/fast-element";
import type { ContractDetail } from "./contract-detail";

export const ContractDetailTemplate = html<ContractDetail>`
  <div class="contract">
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
      (x) => x.contract,
      html<ContractDetail>`
        <sl-card style=" margin: 2rem auto; display: block;">
          <h2 style="margin-top: 0;">
            ${(x) => x.contract!.title || "Untitled Contract"}
          </h2>
          <div
            class="contract-details"
            style="margin-bottom: 1.5rem;"
            :innerHTML="${(x) => x.contract!.content}"
          ></div>
          <sc-contract-access-manager
            contract-id="${(x) => x.contractId}"
          ></sc-contract-access-manager>
          <div
            class="contract-actions"
            style="display: flex; gap: 1rem; justify-content: flex-end;"
          >
            <sl-button variant="success" @click="${(x) => x.signContract()}"
              >דרוש חתימה</sl-button
            >
            <sl-button variant="success" @click="${(x) => x.downloadContract()}"
              >הורד</sl-button
            >
          </div>
        </sl-card>
      `
    )}
  </div>
`;
