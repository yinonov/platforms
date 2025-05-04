import { Auth, signOut } from "firebase/auth";

/**
 * התנתקות מהמערכת (Logout) - תומך בכל סוגי ההתחברות
 */
export const logout = async (auth: Auth) => {
  return await signOut(auth);
};
