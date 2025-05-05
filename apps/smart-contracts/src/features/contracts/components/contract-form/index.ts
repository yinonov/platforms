import "@shoelace-style/shoelace/dist/components/input/input.js";
import { CUSTOM_ELEMENT_PREFIX } from "@services/system";

import { ContractForm } from "./contract-form";
import { ContractFormTemplate as template } from "./contract-form.template";
import { ContractFormStyles as styles } from "./contract-form.styles";

ContractForm.define({
  name: `${CUSTOM_ELEMENT_PREFIX}-contract-form`,
  template,
  styles,
});
