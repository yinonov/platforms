import { FASTElement, observable } from "@microsoft/fast-element";
import {
  emailLogin,
  googleLogin,
  logout,
  sendPhoneVerification,
  verifyPhoneCode,
} from "../../services";
import {
  Auth,
  onAuthStateChanged,
  signInAnonymously,
  type User,
} from "firebase/auth";
export class FirebaseAuthContainer extends FASTElement {
  @observable auth?: Auth;

  @observable authMethod: "email" | "phone" | "google" = "email";
  @observable email = "";
  @observable password = "";
  @observable phoneNumber = "";
  @observable smsCode = "";
  @observable loading = false;
  @observable errorMessage = "";
  @observable currentUser: User | null = null;
  @observable phoneCodeSent = false;

  private confirmationResult: any = null;
  private recaptchaContainer: HTMLDivElement | null = null;

  connectedCallback() {
    super.connectedCallback();

    this.recaptchaContainer = document.createElement("div");
    this.recaptchaContainer.style.display = "none";
    this.recaptchaContainer.setAttribute("recaptcha-container", "");
    document.body.appendChild(this.recaptchaContainer);

    if (!this.auth) {
      throw new Error("Firebase auth is not initialized.");
    }
    onAuthStateChanged(this.auth, (user) => {
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

  async emailLogin() {
    if (!this.auth) {
      throw new Error("No auth instance available.");
    }
    await emailLogin(this.auth, this.email, this.password);
  }

  async sendPhoneCode() {
    this.errorMessage = "";
    this.loading = true;
    try {
      if (!this.recaptchaContainer) {
        throw new Error("No reCAPTCHA container available.");
      }
      if (!this.auth) {
        throw new Error("No auth instance available.");
      }
      this.confirmationResult = await sendPhoneVerification(
        this.auth,
        this.phoneNumber,
        this.recaptchaContainer
      );
      this.phoneCodeSent = true;
    } catch (error) {
      console.error(error);
      this.errorMessage =
        (error as Error).message || "Failed to send verification code.";
      this.phoneCodeSent = false;
    } finally {
      this.loading = false;
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
        this.phoneCodeSent = false;
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

  async verifyPhoneLogin() {
    if (!this.confirmationResult) {
      throw new Error("No verification in progress.");
    }
    await verifyPhoneCode(this.confirmationResult, this.smsCode);
  }

  async googleSignIn() {
    if (!this.auth) {
      throw new Error("No auth instance available.");
    }
    await googleLogin(this.auth);
  }

  async signInAsGuest() {
    this.errorMessage = "";
    this.loading = true;
    try {
      if (!this.auth) {
        throw new Error("No auth instance available.");
      }
      await signInAnonymously(this.auth);
    } catch (error) {
      console.error(error);
      this.errorMessage = (error as Error).message || "Guest sign-in failed.";
    } finally {
      this.loading = false;
    }
  }

  async signOut() {
    this.errorMessage = "";
    this.loading = true;
    try {
      if (!this.auth) {
        throw new Error("No auth instance available.");
      }
      await logout(this.auth);
    } catch (error) {
      console.error(error);
      this.errorMessage = (error as Error).message || "Sign out failed.";
    } finally {
      this.loading = false;
    }
  }

  // Add a method to handle tab change and reset phoneCodeSent
  handleTabChange(method: "email" | "phone" | "google") {
    this.authMethod = method;
    this.phoneCodeSent = false;
  }
}
