// components/signature-panel/signature-panel.ts (מתוקן)
import { FASTElement, attr, observable } from "@microsoft/fast-element";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
} from "firebase/auth";
import { auth } from "../../firebase/firebase-config";
import type { SignatureData } from "../../models";

export class SignaturePanel extends FASTElement {
  @observable signerName = "";
  @observable phone = "";
  @observable code = "";
  @observable sent = false;
  @observable verified = false;
  @observable loading = false;
  @observable error = "";
  private confirmationResult: ConfirmationResult | null = null;
  private recaptchaVerifier: RecaptchaVerifier | null = null;

  connectedCallback() {
    super.connectedCallback();
    this.initRecaptcha();
  }

  initRecaptcha() {
    if (!this.recaptchaVerifier) {
      this.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => console.log("Recaptcha solved"),
        }
      );
    }
  }

  async sendCode() {
    this.loading = true;
    this.error = "";
    try {
      this.confirmationResult = await signInWithPhoneNumber(
        auth,
        this.phone,
        this.recaptchaVerifier!
      );
      this.sent = true;
    } catch (err: any) {
      this.error = err.message;
    } finally {
      this.loading = false;
    }
  }

  async verifyCodeAndSign() {
    if (!this.confirmationResult) return;
    this.loading = true;
    this.error = "";
    try {
      const result = await this.confirmationResult.confirm(this.code);
      const verifiedPhone = result.user.phoneNumber || this.phone;
      this.verified = true;

      const signed: SignatureData = {
        signerName: this.signerName,
        phone: verifiedPhone,
        signedAt: new Date().toISOString(),
        isApproved: true,
      };
      this.$emit("signed", signed);
    } catch (err: any) {
      this.error = "קוד שגוי או פג תוקף.";
    } finally {
      this.loading = false;
    }
  }
}
