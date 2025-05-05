import "@shoelace-style/shoelace/dist/components/card/card.js";
import "@shoelace-style/shoelace/dist/components/button/button.js";
import "@shoelace-style/shoelace/dist/components/input/input.js";
import "@shoelace-style/shoelace/dist/components/tab-group/tab-group.js";
import "@shoelace-style/shoelace/dist/components/tab-panel/tab-panel.js";
import "@shoelace-style/shoelace/dist/components/tab/tab.js";
import "@shoelace-style/shoelace/dist/components/alert/alert.js";

import { CUSTOM_ELEMENT_PREFIX } from "../../../services/system";
import { FirebaseAuthContainer } from "./firebase-auth-container";
import { FirebaseAuthContainerTemplate as template } from "./firebase-auth-container.template";
import { FirebaseAuthContainerStyles as styles } from "./firebase-auth-container.styles";

FirebaseAuthContainer.define({
  name: `${CUSTOM_ELEMENT_PREFIX}-firebase-auth-container`,
  template,
  styles,
});
