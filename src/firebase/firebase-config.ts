import { initializeApp } from "firebase/app";
import { getFunctions } from "firebase/functions";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD8SkiPGIznzCAu5tc60jx3kpXLydbLi6A",
  authDomain: "smart-contracts-254e8.firebaseapp.com",
  projectId: "smart-contracts-254e8",
  storageBucket: "smart-contracts-254e8.firebasestorage.app",
  messagingSenderId: "424761640128",
  appId: "1:424761640128:web:73b52cf09637e7aeafd925",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const functions = getFunctions(app);
export { auth, RecaptchaVerifier, signInWithPhoneNumber };
