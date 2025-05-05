import { html, when } from "@microsoft/fast-element";
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
        <sl-card style="max-width: 700px; margin: 2rem auto; display: block;">
          <h2 style="margin-top: 0;">
            ${(x) => x.contract!.title || "Untitled Contract"}
          </h2>
          <div class="contract-details" style="margin-bottom: 1.5rem;">
            <pre
              style="background: #f8f8f8; border-radius: 8px; padding: 1rem; overflow-x: auto;"
            >
              ${(x) =>
                x.contract!.content || JSON.stringify(x.contract, null, 2)}
            </pre
            >
          </div>
          <div
            class="contract-actions"
            style="display: flex; gap: 1rem; justify-content: flex-end;"
          >
            <sl-button variant="primary" @click="${(x) => x.shareContract()}"
              >שתף</sl-button
            >
            <sl-button variant="success" @click="${(x) => x.signContract()}"
              >חתום</sl-button
            >
          </div>
        </sl-card>
      `
    )}
  </div>
`;
