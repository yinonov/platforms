import { FirebaseAuth } from "./firebase-auth";
import { FirebaseAuthTemplate as template } from "./firebase-auth.template";
import { FirebaseAuthStyles as styles } from "./firebase-auth.styles";

FirebaseAuth.define({
  name: "firebase-auth",
  template,
  styles,
});
