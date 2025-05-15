import "@features/contracts/components/contract-form";

import { ContractStepper } from "./contract-stepper";
import { ContractStepperTemplate as template } from "./contract-stepper.template";
import { ContractStepperStyles as styles } from "./contract-stepper.styles";
import { CUSTOM_ELEMENT_PREFIX } from "@services/system";

ContractStepper.define({
  name: `${CUSTOM_ELEMENT_PREFIX}-contract-stepper`,
  template,
  styles,
});
