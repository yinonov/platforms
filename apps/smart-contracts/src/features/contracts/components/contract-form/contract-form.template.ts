import { html, when, repeat, ref } from "@microsoft/fast-element";
import type { ContractForm } from "./contract-form";
import { FieldType, type ContractField } from "@features/contracts/templates";

const getFieldType = (field: ContractField) => {
  switch (field.type) {
    case FieldType.Date:
      return "date";
    case FieldType.Number:
    case FieldType.Text:
    default:
      return "text";
  }
};

const getField = html<string>`<sl-input
  type="${(x: ContractField) => getFieldType(x)}"
  label="${(x: ContractField) => x.label}"
  name="${(x: ContractField) => x.name}"
  :value="${(x: ContractField, c) => c.parent.getFieldValue(x)}"
  @input="${(x, c) => c.parent.handleInput(c.event)}"
></sl-input>`;

export const ContractFormTemplate = html<ContractForm>`
  ${when(
    (x: ContractForm) => x.fields,
    html<ContractForm>`
      <sl-card style="max-width: 100%; width: 40rem; display: block;">
        <form
          ${ref("form")}
          @submit=${(x: ContractForm, c: { event: Event }) => {
            c.event.preventDefault();
            x.submit();
          }}
        >
          <p>אנא מלא את הפרטים הבאים:</p>

          ${repeat((x) => x.fields, getField, { recycle: false })}
        </form>
      </sl-card>
    `,
    html`<p>טוען טופס...</p>`
  )}
`;
