import "@components/ui/src/firebase-auth/components/firebase-auth-container/index";
import { CUSTOM_ELEMENT_PREFIX } from "@services/system";

import { Login } from "./login";
import { LoginTemplate as template } from "./login.template";
import { LoginStyles as styles } from "./login.styles";

Login.define({
  name: `${CUSTOM_ELEMENT_PREFIX}-login`,
  template,
  styles,
});
