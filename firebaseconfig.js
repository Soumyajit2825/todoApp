import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  //   apiKey: process.env.apiKey,
  //   authDomain: process.env.authDomain,
  //   projectId: process.env.projectId,
  //   storageBucket: process.env.storageBucket,
  //   messagingSenderId: process.env.messagingSenderId,
  //   appId: process.env.appId,
  //   measurementId: process.env.measurementId,
  apiKey: "AIzaSyCLm_6q6OOBsb1wqkdo9dUxxyNpfgyaWdE",
  authDomain: "test-5b1ce.firebaseapp.com",
  projectId: "test-5b1ce",
  storageBucket: "test-5b1ce.appspot.com",
  messagingSenderId: "755392452898",
  appId: "1:755392452898:web:c250fa6ca01c9f04052d7b",
  measurementId: "G-CTZJ7LBQR7",
};

export const app = initializeApp(firebaseConfig);
export const firebase_auth = getAuth(app);
// const storage = getStorage(app);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

// export { storage };
