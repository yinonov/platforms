import "@shoelace-style/shoelace/dist/components/button/button.js";
import "@shoelace-style/shoelace/dist/components/card/card.js";
import { Home } from "./home";
import { HomeTemplate as template } from "./home.template";
import { HomeStyles as styles } from "./home.styles";
import { CUSTOM_ELEMENT_PREFIX } from "@services/system";

Home.define({
  name: `${CUSTOM_ELEMENT_PREFIX}-home`,
  template,
  styles,
});
