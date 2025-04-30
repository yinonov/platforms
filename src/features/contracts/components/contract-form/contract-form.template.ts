import { html, when, repeat, ref } from "@microsoft/fast-element";
import type { ContractForm } from "./contract-form";
import { FieldType, type ContractField } from "@features/contracts/templates";

const getFieldType = (type: FieldType) => {
  switch (type) {
    case FieldType.Number:
      return "number";
    case FieldType.Date:
      return "date";
    case FieldType.Text:
    default:
      return "text";
  }
};
const getField = html<string>`<sl-input
  type="${(x: ContractField) => getFieldType(x.type)}"
  label="${(x: ContractField) => x.label}"
  name="${(x: ContractField) => x.name}"
  value="${(x: ContractField) => x.value}"
></sl-input>`;

export const ContractFormTemplate = html<ContractForm>`
  ${when(
    (x: ContractForm) => x.metadata,
    html<ContractForm>`
      <sl-card style="max-width: 500px; margin: 2rem auto;">
        <form
          ${ref("form")}
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
