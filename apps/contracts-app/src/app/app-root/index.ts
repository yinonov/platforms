import "@shoelace-style/shoelace/dist/components/button/button.js";
import "@components/firebase-auth/components/firebase-auth-menu";

import { AppRoot } from "./app-root";
import { AppRootTemplate as template } from "./app-root.template";
import { AppRootStyles as styles } from "./app-root.styles";

AppRoot.define({
  name: "app-root",
  template,
  styles,
});
