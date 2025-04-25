// src/components/user-auth/user-auth.ts
import { FASTElement, observable } from "@microsoft/fast-element";
import { auth } from "../../services/firebase-config";
import {
  GoogleAuthProvider,
  RecaptchaVerifier,
  signInWithPopup,
  signInWithPhoneNumber,
  signOut,
  onAuthStateChanged,
  ConfirmationResult,
  User,
} from "firebase/auth";

export class UserAuth extends FASTElement {
  @observable user: User | null = null;
  @observable phone = "";
  @observable code = "";
  @observable codeSent = false;
  private confirmationResult: ConfirmationResult | null = null;
  private recaptchaVerifier: RecaptchaVerifier | null = null;
  private recaptchaContainer: HTMLElement | null = null;

  connectedCallback() {
    super.connectedCallback();
    // Create a container in light DOM for reCAPTCHA
    const container = document.createElement("div");
    container.style.display = "none";
    document.body.appendChild(container);
    this.recaptchaContainer = container;
    // Initialize recaptcha verifier using HTMLElement
    this.recaptchaVerifier = new RecaptchaVerifier(auth, container, {
      size: "invisible",
    });
    // Listen auth state changes
    onAuthStateChanged(auth, (u) => {
      this.user = u;
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    // Clean up container
    if (this.recaptchaContainer && this.recaptchaContainer.parentNode) {
      this.recaptchaContainer.parentNode.removeChild(this.recaptchaContainer);
    }
  }

  async loginWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error(err);
    }
  }

  async sendPhoneCode() {
    if (!this.recaptchaVerifier) return;
    try {
      this.confirmationResult = await signInWithPhoneNumber(
        auth,
        this.phone,
        this.recaptchaVerifier
      );
      this.codeSent = true;
    } catch (err) {
      console.error(err);
    }
  }

  async verifyPhoneCode() {
    if (!this.confirmationResult) return;
    try {
      await this.confirmationResult.confirm(this.code);
    } catch (err) {
      console.error(err);
    }
  }

  async logout() {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  }
}
