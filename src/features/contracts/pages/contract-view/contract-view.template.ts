import { html, when } from "@microsoft/fast-element";
import type { ContractView } from "./contract-view";

export const ContractViewTemplate = html<ContractView>`
  <div class="contract-view">
    ${when(
      (x) => x.loading,
      html`<div class="spinner">Loading contract...</div>`
    )}
    ${when((x) => x.error, html`<div class="error">${(x) => x.error}</div>`)}
    ${when(
      (x) => x.contract,
      html<ContractView>`
        <h1>${(x) => x.contract!.title || "Untitled Contract"}</h1>
        <div class="contract-details">
          <pre>${(x) => JSON.stringify(x.contract, null, 2)}</pre>
        </div>
        <div class="contract-actions">
          <button @click="${(x) => x.shareContract()}">Share</button>
          <button @click="${(x) => x.signContract()}">Sign</button>
        </div>
      `
    )}
  </div>
`;
