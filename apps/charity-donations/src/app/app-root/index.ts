import "@components/ui/src/firebase-auth/components/firebase-auth-menu/index";
import "@components/ui/src/navigation";

import { AppRoot } from "./app-root";
import { AppRootTemplate as template } from "./app-root.template";
import { AppRootStyles as styles } from "./app-root.styles";

AppRoot.define({
  name: "app-root",
  template,
  styles,
});
