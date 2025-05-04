import "@shoelace-style/shoelace/dist/components/button/button.js";
import "@shoelace-style/shoelace/dist/components/icon-button/icon-button.js";
import "@shoelace-style/shoelace/dist/components/drawer/drawer.js";

import { AppNavigation } from "./app-navigation";
import { AppNavigationTemplate as template } from "./app-navigation.template";
import { AppNavigationStyles as styles } from "./app-navigation.styles";

AppNavigation.define({
  name: "app-navigation",
  template,
  styles,
});
console.log("AppNavigation defined");
