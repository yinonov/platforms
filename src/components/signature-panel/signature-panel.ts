import { observable } from "@microsoft/fast-element";
import { signInWithPhoneNumber } from "firebase/auth";
import { PhoneAuthElement } from "../../utils";
import { auth } from "../../firebase/firebase-config";
import { SignedEventDetail } from "../../models";

export class SignaturePanel extends PhoneAuthElement {
  @observable signerName: string = "";
  @observable phone: string = "";
  @observable smsCode: string = "";
  @observable isApproved: boolean = false;
  @observable isPhoneVerified: boolean = false;
  @observable signedAt: string = "";
  @observable smsSent: boolean = false;

  private confirmationResult: any = null;

  handleCheckbox(event: Event) {
    const target = event.target as HTMLInputElement;
    this.isApproved = target.checked;
  }

  sendSMS(event: Event) {
    event.preventDefault();
    if (!this.recaptchaVerifier) return;

    signInWithPhoneNumber(auth, this.phone, this.recaptchaVerifier)
      .then((confirmationResult) => {
        this.confirmationResult = confirmationResult;
        this.smsSent = true;
        alert("קוד אימות נשלח בהצלחה");
      })
      .catch((error) => {
        console.error("שגיאה בשליחת SMS:", error);
        alert("שגיאה בשליחת SMS: " + error.message);
      });
  }

  verifyCode(event: Event) {
    event.preventDefault();
    if (!this.confirmationResult) return;

    this.confirmationResult
      .confirm(this.smsCode)
      .then(() => {
        this.isPhoneVerified = true;
        this.signedAt = new Date().toLocaleDateString("he-IL");
        this.dispatchEvent(
          new CustomEvent<SignedEventDetail>("signed", {
            detail: {
              signerName: this.signerName,
              signedAt: this.signedAt,
              phone: this.phone,
              isApproved: this.isApproved,
            },
            bubbles: true,
            composed: true,
          })
        );
      })
      .catch((error: Error) => {
        console.error("קוד אימות שגוי:", error);
        alert("קוד שגוי. נסה שוב.");
      });
  }
}
