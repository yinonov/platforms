import { FASTElement, observable } from "@microsoft/fast-element";

export type NotificationType =
  | "primary"
  | "success"
  | "neutral"
  | "warning"
  | "danger";

export class NotificationService {
  @observable message = "";
  @observable type: NotificationType = "primary";
  @observable open = false;

  show(message: string, type: NotificationType = "primary") {
    this.message = message;
    this.type = type;
    this.open = true;
    setTimeout(() => (this.open = false), 3500);
  }
}

export const notificationService = new NotificationService();
