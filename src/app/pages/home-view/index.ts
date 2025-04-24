// index.ts
import { HomeView } from "./home-view";
import { HomeViewTemplate as template } from "./home-view.template";
import { HomeViewStyles as styles } from "./home-view.styles";

HomeView.define({
  name: "home-view",
  template,
  styles,
});
