import "@shoelace-style/shoelace/dist/components/radio-group/radio-group.js";
import "@shoelace-style/shoelace/dist/components/radio-button/radio-button.js";

import "@features/contracts/components/contract-stepper";

import { ContractEdit } from "./contract-edit";
import { ContractEditTemplate as template } from "./contract-edit.template";
import { ContractEditStyles as styles } from "./contract-edit.styles";
import { CUSTOM_ELEMENT_PREFIX } from "@services/system";

ContractEdit.define({
  name: `${CUSTOM_ELEMENT_PREFIX}-contract-edit`,
  template,
  styles,
});
