// src/components/contract-form/contract-form.ts
import { FASTElement, attr, observable } from "@microsoft/fast-element";
import {
  type ContractField,
  FieldType,
} from "@features/contracts/templates/contract-templates";
import { Timestamp } from "firebase/firestore";

export class ContractForm extends FASTElement {
  @observable metadata?: ContractField[];
  @observable values: Record<string, any> = {};

  getDefaultValue(type: FieldType) {
    switch (type) {
      case FieldType.Text:
        return "";
      case FieldType.Number:
        return 0;
      case FieldType.Date:
        return Timestamp.fromDate(new Date());
      default:
        return "";
    }
  }

  handleInput(e: Event, field: ContractField) {
    const target = e.target as HTMLInputElement;
    if (field.type === FieldType.Number) {
      this.values[field.name] = target.value === "" ? "" : Number(target.value);
    } else if (field.type === FieldType.Date) {
      this.values[field.name] = target.value
        ? Timestamp.fromDate(new Date(target.value))
        : null;
    } else {
      this.values[field.name] = target.value;
    }
  }

  getInputValue(field: ContractField) {
    if (field.type === FieldType.Date) {
      const ts = this.values[field.name];
      if (ts && typeof ts.toDate === "function") {
        return ts.toDate().toISOString().slice(0, 10);
      }
      return "";
    }
    return this.values[field.name] ?? "";
  }

  submit() {
    this.$emit("submit", { metadata: { ...this.values } });
  }
}
