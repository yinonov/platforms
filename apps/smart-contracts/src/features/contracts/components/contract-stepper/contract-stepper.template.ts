import { html, repeat, when } from "@microsoft/fast-element";
import type { ContractStepper } from "./contract-stepper";
import type { ContractStep } from "@features/contracts/templates";

export const ContractStepperTemplate = html<ContractStepper>`
  ${when(
    (x) => x.template,
    html<ContractStepper>`
      <div class="progress-container">
        ${repeat(
          (x) => Array.from({ length: x.stepCount }),

          html` <sl-badge
            class="progress-badge"
            variant="${(_, c) =>
              c.index <= c.parent.currentStep ? "primary" : "neutral"}"
            pill
            >${(_, c) => c.index + 1}</sl-badge
          >`,
          { positioning: true }
        )}

        <sl-progress-bar 
          class="progress-bar"
          value="${(x) =>
            x.currentStep * (100 / (x.stepCount - 1))}"></sl-progress-bar>
      </div>

        <h3 style="margin-bottom: 1rem;">
          ${(x) => x.template?.steps[x.currentStep]?.title}
        </h3>
        <sc-contract-form
        class="contract-form"
          :fields=${(x) => x.currentFields}
          :values=${(x) => x.values}
          @change=${(x, c) => x.handleFieldChange(c.event as CustomEvent)}
          @submit=${(x, c) => x.submissionHandler(c.event)}
        ></sc-contract-form>
        <div class="progress-actions">
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
              @click=${(x) => x.submissionHandler()}
              ?disabled=${(x) => x.loading}
              ?loading=${(x) => x.loading}
            >
              סיום
            </sl-button>`
          )}
        </div>
      </div>
    `,
    html`<p>לא נבחרה תבנית חוזה.</p>`
  )}
`;
