import "@components/firebase-auth/components/firebase-auth-container";

import { LoginView } from "./login-view";
import { LoginViewTemplate as template } from "./login-view.template";
import { LoginViewStyles as styles } from "./login-view.styles";

LoginView.define({
  name: "login-view",
  template,
  styles,
});
