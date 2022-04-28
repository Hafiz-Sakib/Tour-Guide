// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAoj21_CgVl8LA9WUX-IfYIWYPQkzd1iN0",
  authDomain: "tour-guide-553b5.firebaseapp.com",
  projectId: "tour-guide-553b5",
  storageBucket: "tour-guide-553b5.appspot.com",
  messagingSenderId: "654153106265",
  appId: "1:654153106265:web:0e8cafc6ea37706c458248",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
