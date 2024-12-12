// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mernestate-72653.firebaseapp.com",
  projectId: "mernestate-72653",
  storageBucket: "mernestate-72653.firebasestorage.app",
  messagingSenderId: "1077028907504",
  appId: "1:1077028907504:web:752a2a6e990487a1fb9535",
  measurementId: "G-S07YSSKKT6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);