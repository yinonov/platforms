// src/components/contract-form/contract-form.ts
import { FASTElement, attr, observable } from "@microsoft/fast-element";
import type { ContractTemplate } from "@templates";

export class ContractForm extends FASTElement {
  @attr type = "";
  @observable metadata: Record<string, string> = {};
  @observable template: ContractTemplate | null = null;

  connectedCallback() {
    super.connectedCallback();
    this.updateTemplate();
  }

  typeChanged() {
    this.updateTemplate();
  }

  updateTemplate() {
    import("@templates").then(({ contractTemplates }) => {
      this.template =
        contractTemplates.find((t) => t.type === this.type) || null;
      if (this.template) {
        this.metadata = { ...this.template.defaultMetadata };
      }
    });
  }

  handleInput(e: Event, key: string) {
    const value = (e.target as HTMLInputElement).value;
    this.metadata[key] = value;
  }

  submit() {
    this.$emit("submit", { metadata: this.metadata });
  }
}
