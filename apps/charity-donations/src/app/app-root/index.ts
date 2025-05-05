import "@components/ui/src/firebase-auth/components/firebase-auth-menu";
import "@components/ui/src/navigation";
import { CUSTOM_ELEMENT_PREFIX } from "@services/system";

import { AppRoot } from "./app-root";
import { AppRootTemplate as template } from "./app-root.template";
import { AppRootStyles as styles } from "./app-root.styles";
import {
  AppNotificationContainer,
  AppNotificationContainerTemplate,
} from "./app-notification-container";

AppRoot.define({
  name: `${CUSTOM_ELEMENT_PREFIX}-app-root`,
  template,
  styles,
});

AppNotificationContainer.define({
  name: "app-notification-container",
  template: AppNotificationContainerTemplate,
});
