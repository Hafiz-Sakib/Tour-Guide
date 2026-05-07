import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Replace these values with your own Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyAoj21_CgVl8LA9WUX-IfYIWYPQkzd1iN0",
  authDomain: "tour-guide-553b5.firebaseapp.com",
  projectId: "tour-guide-553b5",
  storageBucket: "tour-guide-553b5.appspot.com",
  messagingSenderId: "654153106265",
  appId: "1:654153106265:web:0e8cafc6ea37706c458248",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app;
