import { FASTElement, html, observable } from "@microsoft/fast-element";
import "@shoelace-style/shoelace/dist/components/alert/alert.js";
import { notificationService } from "@services/notification-service";

export class AppNotificationContainer extends FASTElement {
  @observable service = notificationService;
}

export const AppNotificationContainerTemplate = html<AppNotificationContainer>`
  <sl-alert
    ?open="${(x) => x.service.open}"
    variant="${(x) => x.service.type}"
    style="position: fixed; top: 1.5rem; right: 1.5rem; z-index: 9999; min-width: 250px;"
    closable
    @sl-after-hide="${() => (notificationService.open = false)}"
  >
    ${(x) => x.service.message}
  </sl-alert>
`;
