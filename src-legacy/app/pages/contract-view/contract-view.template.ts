// src/app/pages/contract-view/contract-view.template.ts
import { html } from "@microsoft/fast-element";
import type { ContractView } from "./contract-view";

export const ContractViewTemplate = html<ContractView>`
  ${(x) => (x.loading ? html`<p>טוען חוזה...</p>` : "")}
  ${(x) => (x.error ? html`<p style="color: red">${x.error}</p>` : "")}
  ${(x) =>
    x.contract
      ? html`
          <section class="contract">
            <h2>${x.contract.title}</h2>
            <p><strong>משכיר:</strong> ${x.contract.metadata.landlord}</p>
            <p><strong>שוכר:</strong> ${x.contract.metadata.tenant}</p>
            <p><strong>כתובת:</strong> ${x.contract.metadata.address}</p>
            <p><strong>שכר דירה:</strong> ${x.contract.metadata.rent} ₪</p>

            <article class="contract-content">${x.contract.content}</article>

            ${!x.contract.signed
              ? html`
                  <signature-panel @signed="handleSigned"></signature-panel>
                `
              : html`
                  <p class="signed">החוזה נחתם</p>
                  ${x.signatureDetails
                    ? html`
                        <div class="signature-info">
                          <p>
                            <strong>נחתם ע"י:</strong> ${x.signatureDetails
                              .signerName}
                          </p>
                          <p>
                            <strong>טלפון:</strong> ${x.signatureDetails.phone}
                          </p>
                          <p>
                            <strong>תאריך:</strong> ${new Date(
                              x.signatureDetails.signedAt
                            ).toLocaleString()}
                          </p>
                        </div>
                      `
                    : ""}
                `}
          </section>
        `
      : ""}
`;
