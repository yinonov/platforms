import { auth } from "@services/firebase-config";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const provider = new GoogleAuthProvider();

/**
 * התחברות עם חשבון Google
 */
export const googleLogin = async () => {
  return signInWithPopup(auth, provider);
};

/**
 * התנתקות
 */
export const googleLogout = async () => {
  return signOut(auth);
};
