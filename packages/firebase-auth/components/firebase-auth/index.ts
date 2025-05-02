import "@shoelace-style/shoelace/dist/components/card/card.js";
import "@shoelace-style/shoelace/dist/components/button/button.js";
import "@shoelace-style/shoelace/dist/components/input/input.js";
import "@shoelace-style/shoelace/dist/components/tab-group/tab-group.js";
import "@shoelace-style/shoelace/dist/components/tab-panel/tab-panel.js";
import "@shoelace-style/shoelace/dist/components/tab/tab.js";
import "@shoelace-style/shoelace/dist/components/alert/alert.js";

import { FirebaseAuth } from "./firebase-auth";
import { FirebaseAuthTemplate as template } from "./firebase-auth.template";
import { FirebaseAuthStyles as styles } from "./firebase-auth.styles";

FirebaseAuth.define({
  name: "firebase-auth",
  template,
  styles,
});
