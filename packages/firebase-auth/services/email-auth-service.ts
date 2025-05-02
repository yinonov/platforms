import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  Auth,
} from "firebase/auth";

/**
 * כניסה עם אימייל וסיסמה
 * @param email כתובת האימייל
 * @param password הסיסמה
 */
export const emailLogin = async (
  auth: Auth,
  email: string,
  password: string
) => {
  return signInWithEmailAndPassword(auth, email, password);
};

/**
 * הרשמה (Sign Up) עם אימייל וסיסמה
 * @param email כתובת האימייל
 * @param password הסיסמה
 */
export const emailRegister = async (
  auth: Auth,
  email: string,
  password: string
) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

/**
 * שליחת מייל לאיפוס סיסמה
 * @param email כתובת האימייל
 */
export const sendPasswordReset = async (auth: Auth, email: string) => {
  return sendPasswordResetEmail(auth, email);
};
