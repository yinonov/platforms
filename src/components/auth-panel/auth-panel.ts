// auth-panel.ts
import { observable } from "@microsoft/fast-element";
import {
  signInWithPhoneNumber,
  onAuthStateChanged,
  signOut,
  User,
} from "firebase/auth";
import { PhoneAuthElement } from "../../utils";
import { auth } from "../../firebase/firebase-config";

export class AuthPanel extends PhoneAuthElement {
  @observable phone: string = "";
  @observable smsCode: string = "";
  @observable isLoggedIn: boolean = false;
  @observable currentUser: User | null = null;
  @observable smsSent: boolean = false;

  private confirmationResult: any = null;

  connectedCallback() {
    super.connectedCallback();
    onAuthStateChanged(auth, (user) => {
      this.currentUser = user;
      this.isLoggedIn = !!user;
    });
  }

  sendSMS(event: Event) {
    event.preventDefault();
    if (!this.recaptchaVerifier) return;

    signInWithPhoneNumber(auth, this.phone, this.recaptchaVerifier)
      .then((confirmationResult) => {
        this.confirmationResult = confirmationResult;
        this.smsSent = true;
        alert("קוד אימות נשלח");
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
      .then((result: { user: User }) => {
        this.currentUser = result.user;
        this.isLoggedIn = true;
        alert("התחברת בהצלחה");
      })
      .catch((error: Error) => {
        console.error("שגיאת אימות:", error);
        alert("קוד לא תקין");
      });
  }

  signOutUser(event: Event) {
    event.preventDefault();
    signOut(auth)
      .then(() => {
        this.currentUser = null;
        this.isLoggedIn = false;
        this.smsSent = false;
        this.phone = "";
        this.smsCode = "";
        alert("התנתקת בהצלחה");
      })
      .catch((error) => {
        console.error("שגיאה בהתנתקות:", error);
        alert("שגיאה בהתנתקות: " + error.message);
      });
  }
}
