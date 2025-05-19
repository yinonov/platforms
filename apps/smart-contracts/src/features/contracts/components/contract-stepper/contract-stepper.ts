import { FASTElement, observable } from "@microsoft/fast-element";
import type {
  ContractField,
  ContractTemplate,
} from "@features/contracts/templates/contract-templates";

export class ContractStepper extends FASTElement {
  @observable template: ContractTemplate | null = null;
  @observable currentStep = 0;
  @observable values: Record<string, any> = {};

  get stepCount() {
    return this.template?.steps.length || 0;
  }

  get currentFields() {
    return this.template?.steps[this.currentStep]?.fields || [];
  }
  handleFieldChange(e: CustomEvent) {
    Object.assign(this.values, e.detail.values);
  }

  nextStep() {
    if (this.currentStep < this.stepCount - 1) {
      this.currentStep++;
      this.updateUrl();
    }
  }

  prevStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.updateUrl();
    }
  }

  updateUrl() {
    // Example: update the URL with the current step index (implement with your router as needed)
    window.history.replaceState({}, "", `?step=${this.currentStep}`);
  }

  submit() {
    this.$emit("submit", { values: { ...this.values } });
  }
}
