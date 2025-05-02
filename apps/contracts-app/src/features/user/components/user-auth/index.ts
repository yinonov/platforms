import { UserAuth } from "./user-auth";
import { UserAuthTemplate as template } from "./user-auth.template";
import { UserAuthStyles as styles } from "./user-auth.styles";
import "@shoelace-style/shoelace/dist/components/card/card.js";
import "@shoelace-style/shoelace/dist/components/button/button.js";
import "@shoelace-style/shoelace/dist/components/input/input.js";
import "@shoelace-style/shoelace/dist/components/tab-group/tab-group.js";
import "@shoelace-style/shoelace/dist/components/tab-panel/tab-panel.js";
import "@shoelace-style/shoelace/dist/components/tab/tab.js";
import "@shoelace-style/shoelace/dist/components/alert/alert.js";

UserAuth.define({
  name: "user-auth",
  template,
  styles,
});
