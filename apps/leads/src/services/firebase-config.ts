import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyCpEO10twac2dqKItn8XwR6wVpUF85q904",
  authDomain: "leads-71f3c.firebaseapp.com",
  projectId: "leads-71f3c",
  storageBucket: "leads-71f3c.firebasestorage.app",
  messagingSenderId: "442528930933",
  appId: "1:442528930933:web:47825209521ee5664d2c3c",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const functions = getFunctions(app);
