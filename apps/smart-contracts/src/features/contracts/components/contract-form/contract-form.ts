// src/components/contract-form/contract-form.ts
import { FASTElement, attr, observable } from "@microsoft/fast-element";
import {
  FieldType,
  type ContractField,
} from "@features/contracts/templates/contract-templates";
import { Timestamp } from "firebase/firestore";

export class ContractForm extends FASTElement {
  @observable values: Record<string, any> = {};
  @observable fields: ContractField[] = [];
  form?: HTMLFormElement;

  getFieldValue(field: ContractField): any {
    // If the user has entered a value, use it
    if (this.values && field.name in this.values) {
      // Special handling for date fields to ensure yyyy-mm-dd format
      if (field.type === FieldType.Date) {
        const val = this.values[field.name];
        if (val instanceof Date) {
          return val.toISOString().split("T")[0];
        }
        if (typeof val === "string" && /^\d{4}-\d{2}-\d{2}$/.test(val)) {
          return val;
        }
        // Try to parse other string formats
        const d = new Date(val);
        if (!isNaN(d.getTime())) {
          return d.toISOString().split("T")[0];
        }
      }
      return this.values[field.name];
    }
    // Fallback to default value from template
    if (field.type === FieldType.Date && field.value instanceof Date) {
      return field.value.toISOString().split("T")[0];
    }
    if (
      field.type === FieldType.Date &&
      field.value &&
      typeof field.value.toDate === "function"
    ) {
      // Firestore Timestamp
      return field.value.toDate().toISOString().split("T")[0];
    }
    return field.value ?? "";
  }

  handleInput(e: Event) {
    const target = e.target as HTMLInputElement;
    this.values[target.name] = target.value;
    this.$emit("change", { values: { ...this.values } });
  }

  submit() {
    this.$emit("submit", { values: { ...this.values } });
  }
}
