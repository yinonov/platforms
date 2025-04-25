// auth-panel.ts
import { observable, when } from "@microsoft/fast-element";
import {
  signInWithPhoneNumber,
  onAuthStateChanged,
  signOut,
  User,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { PhoneAuthElement } from "../../utils";
import { auth } from "../../firebase/firebase-config";
import { userContext } from "../../context";

export class AuthPanel extends PhoneAuthElement {
  @observable phone: string = "";
  @observable smsCode: string = "";
  @observable isLoggedIn: boolean = false;
  @observable currentUser: User | null = null;
  @observable smsSent: boolean = false;
  @observable isExpanded: boolean = false;

  private confirmationResult: any = null;

  connectedCallback() {
    super.connectedCallback();
    onAuthStateChanged(auth, (user) => {
      this.currentUser = user;
      this.isLoggedIn = !!user;
      userContext.setUser(user);
    });
  }

  togglePanel(event: Event) {
    event.preventDefault();
    this.isExpanded = !this.isExpanded;
  }

  signInWithGoogle(event: Event) {
    event.preventDefault();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        this.currentUser = result.user;
        this.isLoggedIn = true;
        this.isExpanded = false;
        userContext.setUser(result.user);
      })
      .catch((error) => {
        console.error("שגיאה בהתחברות עם גוגל:", error);
        this.showError("שגיאה בהתחברות עם גוגל: " + error.message);
      });
  }

  sendSMS(event: Event) {
    event.preventDefault();
    if (!this.recaptchaVerifier) return;

    signInWithPhoneNumber(auth, this.phone, this.recaptchaVerifier)
      .then((confirmationResult) => {
        this.confirmationResult = confirmationResult;
        this.smsSent = true;
      })
      .catch((error) => {
        console.error("שגיאה בשליחת SMS:", error);
        this.showError("שגיאה בשליחת SMS: " + error.message);
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
        this.isExpanded = false;
        userContext.setUser(result.user);
      })
      .catch((error: Error) => {
        console.error("שגיאת אימות:", error);
        this.showError("קוד לא תקין");
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
        this.isExpanded = false;
        userContext.setUser(null);
      })
      .catch((error) => {
        console.error("שגיאה בהתנתקות:", error);
        this.showError("שגיאה בהתנתקות: " + error.message);
      });
  }

  showError(message: string) {
    const errorElement = this.shadowRoot?.getElementById("error-message");
    if (errorElement) errorElement.textContent = message;
  }
}
