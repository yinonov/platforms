import "@shoelace-style/shoelace/dist/components/card/card.js";
import "@shoelace-style/shoelace/dist/components/button/button.js";
import "@shoelace-style/shoelace/dist/components/spinner/spinner.js";
import "@shoelace-style/shoelace/dist/components/alert/alert.js";
import { ContractView } from "./contract-view";
import { ContractViewTemplate as template } from "./contract-view.template";
import { ContractViewStyles as styles } from "./contract-view.styles";

ContractView.define({
  name: "contract-view",
  template,
  styles,
});
