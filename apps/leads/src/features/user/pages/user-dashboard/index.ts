import { UserDashboard } from "./user-dashboard";
import { UserDashboardTemplate as template } from "./user-dashboard.template";
import { UserDashboardStyles as styles } from "./user-dashboard.styles";
import { CUSTOM_ELEMENT_PREFIX } from "@services/system";

UserDashboard.define({
  name: `${CUSTOM_ELEMENT_PREFIX}-user-dashboard`,
  template,
  styles,
});
