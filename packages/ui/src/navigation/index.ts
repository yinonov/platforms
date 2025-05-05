import "@shoelace-style/shoelace/dist/components/button/button.js";
import "@shoelace-style/shoelace/dist/components/icon-button/icon-button.js";
import "@shoelace-style/shoelace/dist/components/drawer/drawer.js";

import { AppNavigation } from "./components/app-navigation/app-navigation";
import { AppNavigationTemplate as template } from "./components/app-navigation/app-navigation.template";
import { AppNavigationStyles as styles } from "./components/app-navigation/app-navigation.styles";
import { CUSTOM_ELEMENT_PREFIX } from "../services";

AppNavigation.define({
  name: `${CUSTOM_ELEMENT_PREFIX}-app-navigation`,
  template,
  styles,
});
