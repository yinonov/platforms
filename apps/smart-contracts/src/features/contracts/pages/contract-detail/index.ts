import "@features/contracts/components/contract-access-manager";

import "@shoelace-style/shoelace/dist/components/card/card.js";
import "@shoelace-style/shoelace/dist/components/button/button.js";
import "@shoelace-style/shoelace/dist/components/spinner/spinner.js";
import "@shoelace-style/shoelace/dist/components/alert/alert.js";

import { ContractDetail } from "./contract-detail";
import { ContractDetailTemplate as template } from "./contract-detail.template";
import { ContractDetailStyles as styles } from "./contract-detail.styles";
import { CUSTOM_ELEMENT_PREFIX } from "@services/system";

ContractDetail.define({
  name: `${CUSTOM_ELEMENT_PREFIX}-contract-detail`,
  template,
  styles,
});
