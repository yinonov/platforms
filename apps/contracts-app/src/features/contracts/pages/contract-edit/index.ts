import "@shoelace-style/shoelace/dist/components/radio/radio.js";
import "@shoelace-style/shoelace/dist/components/radio-group/radio-group.js";
import "@shoelace-style/shoelace/dist/components/radio-button/radio-button.js";
import "@features/contracts/components/contract-form";
import { ContractEdit } from "./contract-edit";
import { ContractEditTemplate as template } from "./contract-edit.template";
import { ContractEditStyles as styles } from "./contract-edit.styles";

ContractEdit.define({
  name: "contract-edit",
  template,
  styles,
});
