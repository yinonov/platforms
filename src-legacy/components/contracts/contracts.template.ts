// components/contracts/contracts.template.ts
import { html } from "@microsoft/fast-element";
import type { Contracts } from "../../models/contract";

export const ContractsTemplate = html<Contracts>`
  <section>
    <h2>החוזים שלי</h2>
    ${(x) =>
      x.myContracts.length
        ? x.myContracts.map(
            (contract) => html`
              <div class="contract-card">
                <h3>${contract.title || "ללא כותרת"}</h3>
                <p>
                  נוצר בתאריך:
                  ${new Date(contract.startDate).toLocaleDateString()}
                </p>
                <button
                  @click="() => window.location.href = '/contract-view?id=${contract.id}'"
                >
                  פתח
                </button>
              </div>
            `
          )
        : html`<p>אין חוזים בבעלותך</p>`}
  </section>

  <section>
    <h2>משותפים איתי</h2>
    ${(x) =>
      x.sharedWithMe.length
        ? x.sharedWithMe.map(
            (contract) => html`
              <div class="contract-card">
                <h3>${contract.title || "ללא כותרת"}</h3>
                <p>
                  נוצר בתאריך:
                  ${new Date(contract.startDate).toLocaleDateString()}
                </p>
                <button
                  @click="() => window.location.href = '/contract-view?id=${contract.id}'"
                >
                  צפה
                </button>
              </div>
            `
          )
        : html`<p>אין חוזים משותפים</p>`}
  </section>
`;
