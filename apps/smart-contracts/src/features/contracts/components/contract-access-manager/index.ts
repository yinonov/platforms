import { ContractAccessManager } from "./contract-access-manager";
import { ContractAccessManagerTemplate as template } from "./contract-access-manager.template";
import { CUSTOM_ELEMENT_PREFIX } from "@services/system";

ContractAccessManager.define({
  name: `${CUSTOM_ELEMENT_PREFIX}-contract-access-manager`,
  template,
});
