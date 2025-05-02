import { signInWithPhoneNumber, RecaptchaVerifier, Auth } from "firebase/auth";

let recaptchaVerifierInstance: RecaptchaVerifier | null = null;

/**
 * שולח קוד SMS לטלפון
 */
export const sendPhoneVerification = async (
  auth: Auth,
  phoneNumber: string,
  container: HTMLElement
) => {
  if (!recaptchaVerifierInstance) {
    recaptchaVerifierInstance = new RecaptchaVerifier(auth, container, {
      size: "invisible",
      callback: (response: string) => {
        console.log("reCAPTCHA solved:", response);
      },
      "expired-callback": () => {
        console.warn("reCAPTCHA expired.");
        recaptchaVerifierInstance?.clear();
        recaptchaVerifierInstance = null;
      },
    });
  }

  return signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifierInstance);
};

/**
 * מאמת קוד שנשלח ב-SMS
 */
export const verifyPhoneCode = async (
  confirmationResult: any,
  code: string
) => {
  return confirmationResult.confirm(code);
};
