// contract-view.template.ts
import { html, when } from "@microsoft/fast-element";
import type { ContractView } from "./contract-view";
import { userContext } from "../../../context/user-context";

export const ContractViewTemplate = html<ContractView>`
  <h2>צפייה בחוזה</h2>

  ${when(
    (x) => x.loading,
    html`<p>טוען...</p>`,
    html`
      ${when(
        (x) => x.error,
        html`<p style="color: red;">${(x) => x.error}</p>`,
        html`
          <div>
            <p><strong>מספר חוזה:</strong> ${(x) => x.contract?.id}</p>
            <p><strong>נוצר ע"י:</strong> ${(x) => x.contract?.createdBy}</p>
            <p>
              <strong>חתומים:</strong> ${(x) =>
                x.contract?.signers.map((s) => s.name).join(", ")}
            </p>
            <p><strong>תוכן:</strong></p>
            <pre
              style="white-space: pre-wrap; background: #f1f1f1; padding: 1rem;"
            >
${(x) => x.contract?.content}</pre
            >

            <hr />
            <signature-panel
              contract-id="${(x) => x.contract?.id}"
              signer-name="${(_) => userContext.currentUser?.displayName || ""}"
            ></signature-panel>
          </div>
        `
      )}
    `
  )}
`;
