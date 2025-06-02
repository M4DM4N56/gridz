// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDDuzmgG--mFls6y1LGaBbWa1Nnv4U7WMg",
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