import {
  html,
  when,
  InlineTemplateDirective,
  ref,
} from "@microsoft/fast-element";
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
          <sc-contract-document
            html="${(x) => x.contract!.content}"
          ></sc-contract-document>
          <sc-contract-access-manager
            ${ref("accessManager")}
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
          ${when(
            // could be replaced with a more robust check from a service
            (x) => x.accessManager?.viewerIsOwner,
            html`<div class="delete-section">
              <sl-divider></sl-divider>
              <sl-button
                variant="danger"
                outline
                @click="${(x) => x.deleteContract()}"
                >מחק חוזה</sl-button
              >
            </div>`
          )}
        </sl-card>
      `
    )}
  </div>
`;
