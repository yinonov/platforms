import { app } from "@services/firebase-config";
import { getAuth, signOut } from "firebase/auth";

export const auth = getAuth(app);

/**
 * התנתקות מהמערכת (Logout) - תומך בכל סוגי ההתחברות
 */
export const logout = async () => {
  return await signOut(auth);
};
