import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyBps_9iig2PapfVkchLcYk6XhF4X3MGq58",
  authDomain: "charity-a5bde.firebaseapp.com",
  projectId: "charity-a5bde",
  storageBucket: "charity-a5bde.firebasestorage.app",
  messagingSenderId: "1036410154970",
  appId: "1:1036410154970:web:7842d8fb97f572d024dae3",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const functions = getFunctions(app);
