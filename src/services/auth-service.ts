import { auth } from "@services/firebase-config";
import { signOut } from "firebase/auth";

/**
 * התנתקות מהמערכת (Logout) - תומך בכל סוגי ההתחברות
 */
export const logout = async () => {
  return signOut(auth);
};
