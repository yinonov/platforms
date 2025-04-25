import { User } from "firebase/auth";
import { observable } from "@microsoft/fast-element";

/**
 * Provides global access to the current authenticated Firebase user.
 */
class UserContext {
  @observable currentUser: User | null = null;
  @observable isLoggedIn: boolean = false;

  setUser(user: User | null) {
    this.currentUser = user;
    this.isLoggedIn = !!user;
  }
}

export const userContext = new UserContext();
