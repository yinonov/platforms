import { auth } from "@services/firebase-config";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

/**
 * כניסה עם אימייל וסיסמה
 * @param email כתובת האימייל
 * @param password הסיסמה
 */
export const emailLogin = async (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

/**
 * הרשמה (Sign Up) עם אימייל וסיסמה
 * @param email כתובת האימייל
 * @param password הסיסמה
 */
export const emailRegister = async (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

/**
 * שליחת מייל לאיפוס סיסמה
 * @param email כתובת האימייל
 */
export const sendPasswordReset = async (email: string) => {
  return sendPasswordResetEmail(auth, email);
};
