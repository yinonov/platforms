import {
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

/**
 * התחברות עם חשבון Google
 */
export const googleLogin = async (auth: Auth) => {
  return signInWithPopup(auth, provider);
};

/**
 * התנתקות
 */
export const googleLogout = async (auth: Auth) => {
  return signOut(auth);
};
