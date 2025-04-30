import { html, when, repeat, ref } from "@microsoft/fast-element";
import type { ContractForm } from "./contract-form";
import { FieldType, type ContractField } from "@features/contracts/templates";
import { Timestamp } from "firebase/firestore";

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

const getFieldValue = (field: ContractField) => {
  if (
    field.value === undefined ||
    [FieldType.Number, FieldType.Text].includes(field.type)
  ) {
    return field.value;
  }

  if (field.type === FieldType.Date && field.value instanceof Timestamp) {
    return field.value.toDate().toISOString().split("T")[0];
  }

  return field.value;
};

const getField = html<string>`<sl-input
  type="${(x: ContractField) => getFieldType(x)}"
  label="${(x: ContractField) => x.label}"
  name="${(x: ContractField) => x.name}"
  value="${(x: ContractField) => getFieldValue(x)}"
></sl-input>`;

export const ContractFormTemplate = html<ContractForm>`
  ${when(
    (x: ContractForm) => x.metadata,
    html<ContractForm>`
      <sl-card style="width: 40rem; margin: 2rem auto;">
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
