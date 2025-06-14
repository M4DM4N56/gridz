// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "gridz-2529c.firebaseapp.com",
  projectId: "gridz-2529c",
  storageBucket: "gridz-2529c.firebasestorage.app",
  messagingSenderId: "813235058741",
  appId: "1:813235058741:web:c5407b5407a9b6cdb1d97c",
  measurementId: "G-C690SSNGNJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);