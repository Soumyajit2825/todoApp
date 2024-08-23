import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA5p9EeSxGKorfLUsAocW7_pKdr0KBn3vU",
  authDomain: "soumyafb-a82b5.firebaseapp.com",
  projectId: "soumyafb-a82b5",
  storageBucket: "soumyafb-a82b5.appspot.com",
  messagingSenderId: "237662554577",
  appId: "1:237662554577:web:8835ebb32f6f3ace49f8f0",
  measurementId: "G-2M2TBBYJR5"
};

export const app = initializeApp(firebaseConfig);
export const firebase_auth = getAuth(app);

