import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "./auth-service";

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
