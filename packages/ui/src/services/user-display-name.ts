// Central helper to get a display name for a Firebase user object
// Usage: import { getDisplayName } from "../services/user-display-name";

import { User } from "firebase/auth";

export function getDisplayName(user: User): string {
  console.log("getDisplayName", user);
  if (!user) return "משתמש";
  return user.displayName || user.phoneNumber || user.email || "משתמש";
}
