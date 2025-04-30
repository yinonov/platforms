import { html, when, repeat } from "@microsoft/fast-element";
import type { ContractForm } from "./contract-form";
import { ContractField } from "@features/contracts/templates";

export const getField = html<string>`${(x: ContractField) => x.label}`;

export const ContractFormTemplate = html<ContractForm>`
  ${when(
    (x: ContractForm) => x.metadata,
    html<ContractForm>`
      <sl-card style="max-width: 500px; margin: 2rem auto;">
        <form
          @submit=${(x: ContractForm, c: { event: Event }) => {
            c.event.preventDefault();
            x.submit();
          }}
        >
          <p>אנא מלא את הפרטים הבאים:</p>

          ${repeat((x) => x.metadata, getField)}
          <sl-button type="submit" variant="primary" style="width: 100%;"
            >צור חוזה</sl-button
          >
        </form>
      </sl-card>
    `,
    html`<p>טוען טופס...</p>`
  )}
`;
