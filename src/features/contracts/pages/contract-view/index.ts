import "@features/contracts/components/contract-form";
import { ContractView } from "./contract-view";
import { ContractViewTemplate as template } from "./contract-view.template";
import { ContractViewStyles as styles } from "./contract-view.styles";

ContractView.define({
  name: "contract-view",
  template,
  styles,
});
