import { FASTElement, observable } from "@microsoft/fast-element";
import {
  auth,
  emailLogin,
  googleLogin,
  logout,
  sendPhoneVerification,
  verifyPhoneCode,
} from "@features/user/services";
import { onAuthStateChanged } from "firebase/auth";

export class UserAuth extends FASTElement {
  @observable authMethod: "email" | "phone" | "google" = "email";
  @observable email = "";
  @observable password = "";
  @observable phoneNumber = "";
  @observable smsCode = "";
  @observable loading = false;
  @observable errorMessage = "";
  @observable currentUser: any = null;

  private confirmationResult: any = null;
  private recaptchaContainer: HTMLDivElement | null = null;

  connectedCallback() {
    super.connectedCallback();

    this.recaptchaContainer = document.createElement("div");
    this.recaptchaContainer.style.display = "none";
    this.recaptchaContainer.setAttribute("recaptcha-container", "");
    document.body.appendChild(this.recaptchaContainer);

    onAuthStateChanged(auth, (user) => {
      this.currentUser = user;
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    if (this.recaptchaContainer) {
      this.recaptchaContainer.remove();
      this.recaptchaContainer = null;
    }
  }

  async signIn() {
    this.errorMessage = "";
    this.loading = true;
    try {
      if (this.authMethod === "email") {
        await this.emailLogin();
      } else if (this.authMethod === "phone") {
        await this.verifyPhoneLogin();
      } else if (this.authMethod === "google") {
        await this.googleSignIn();
      }
    } catch (error) {
      console.error(error);
      this.errorMessage = (error as Error).message || "Sign in failed.";
    } finally {
      this.loading = false;
    }
  }

  async emailLogin() {
    await emailLogin(this.email, this.password);
  }

  async sendPhoneCode() {
    this.errorMessage = "";
    this.loading = true;
    try {
      if (!this.recaptchaContainer) {
        throw new Error("No reCAPTCHA container available.");
      }
      this.confirmationResult = await sendPhoneVerification(
        this.phoneNumber,
        this.recaptchaContainer
      );
    } catch (error) {
      console.error(error);
      this.errorMessage =
        (error as Error).message || "Failed to send verification code.";
    } finally {
      this.loading = false;
    }
  }

  async verifyPhoneLogin() {
    if (!this.confirmationResult) {
      throw new Error("No verification in progress.");
    }
    await verifyPhoneCode(this.confirmationResult, this.smsCode);
  }

  async googleSignIn() {
    await googleLogin();
  }

  async signOut() {
    this.errorMessage = "";
    this.loading = true;
    try {
      await logout();
    } catch (error) {
      console.error(error);
      this.errorMessage = (error as Error).message || "Sign out failed.";
    } finally {
      this.loading = false;
    }
  }
}
