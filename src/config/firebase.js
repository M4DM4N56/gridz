// firebase.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "gridz-2529c.firebaseapp.com",
  projectId: "gridz-2529c",
  storageBucket: "gridz-2529c.appspot.com",
  messagingSenderId: "813235058741",
  appId: "1:813235058741:web:c5407b5407a9b6cdb1d97c",
  measurementId: "G-C690SSNGNJ",
};

// initialize if not already initialized
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
