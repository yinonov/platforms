// src/components/contract-form/contract-form.ts
import { FASTElement, attr, observable } from "@microsoft/fast-element";
import { type ContractField } from "@features/contracts/templates/contract-templates";

export class ContractForm extends FASTElement {
  @observable fields: ContractField[] = [];
  @observable values: Record<string, any> = {};
  form?: HTMLFormElement;

  handleInput(e: Event) {
    const target = e.target as HTMLInputElement;
    this.values[target.name] = target.value;
    this.$emit("change", { values: { ...this.values } });
  }

  submit() {
    this.$emit("submit", { values: { ...this.values } });
  }
}
