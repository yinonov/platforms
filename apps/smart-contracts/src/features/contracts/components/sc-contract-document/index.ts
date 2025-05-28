import { ContractDocument } from "./contract-document";
import { ContractDocumentTemplate as template } from "./contract-document.template";
import { ContractDocumentStyles as styles } from "./contract-document.styles";
import { CUSTOM_ELEMENT_PREFIX } from "@services/system";

ContractDocument.define({
  name: `${CUSTOM_ELEMENT_PREFIX}-contract-document`,
  template,
  styles,
});
