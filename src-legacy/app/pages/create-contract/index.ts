// index.ts
import { CreateContract } from "./create-contract";
import { CreateContractTemplate as template } from "./create-contract.template";
import { CreateContractStyles as styles } from "./create-contract.styles";
import "../../../components/contract-form";
import "../../../components/signature-panel";

CreateContract.define({
  name: "create-contract",
  template,
  styles,
});
