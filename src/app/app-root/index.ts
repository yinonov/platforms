import "@shoelace-style/shoelace/dist/components/button/button.js";
import "@shoelace-style/shoelace/dist/components/icon/icon.js";
import "@shoelace-style/shoelace/dist/components/divider/divider.js";
import "@shoelace-style/shoelace/dist/components/dialog/dialog.js";
import "@features/user/components/user-auth";
import { AppRoot } from "./app-root";
import { AppRootTemplate as template } from "./app-root.template";
import { AppRootStyles as styles } from "./app-root.styles";

AppRoot.define({
  name: "app-root",
  template,
  styles,
});
