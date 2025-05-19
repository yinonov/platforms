import { html, when } from "@microsoft/fast-element";
import type { ContractStepper } from "./contract-stepper";

export const ContractStepperTemplate = html<ContractStepper>`
  ${when(
    (x) => x.template,
    html<ContractStepper>`
      <h3 style="margin-bottom: 1rem;">
        ${(x) => x.template?.steps[x.currentStep]?.title}
      </h3>
      <sc-contract-form
        :fields=${(x) => x.currentFields}
        :values=${(x) => x.values}
        @change=${(x, c) => x.handleFieldChange(c.event as CustomEvent)}
        @submit=${(x) => x.submit()}
      ></sc-contract-form>
      <div
        style="display: flex; gap: 1rem; margin-top: 2rem; justify-content: flex-end;"
      >
        ${when(
          (x) => x.currentStep > 0,
          html<ContractStepper>`<sl-button
            type="button"
            variant="default"
            @click=${(x) => x.prevStep()}
            >הקודם</sl-button
          >`
        )}
        ${when(
          (x) => x.currentStep < x.stepCount - 1,
          html<ContractStepper>`<sl-button
            type="button"
            variant="primary"
            @click=${(x) => x.nextStep()}
            >הבא</sl-button
          >`
        )}
        ${when(
          (x) => x.currentStep === x.stepCount - 1,
          html<ContractStepper>`<sl-button
            type="button"
            variant="primary"
            @click=${(x) => x.submit()}
            >סיום</sl-button
          >`
        )}
      </div>
    `,
    html`<p>לא נבחרה תבנית חוזה.</p>`
  )}
`;
