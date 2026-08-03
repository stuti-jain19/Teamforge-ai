import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDt4wk1-7mc9qg011KiyrzH8q4By4YasVk",
  authDomain: "teamforge-ai-44d1d.firebaseapp.com",
  projectId: "teamforge-ai-44d1d",
  storageBucket: "teamforge-ai-44d1d.firebasestorage.app",
  messagingSenderId: "917779101116",
  appId: "1:917779101116:web:549d334f498b16e87b27b9",
};

const app = initializeApp(firebaseConfig);

// Firebase Authentication
export const auth = getAuth(app);

// Google Sign-In Provider
export const googleProvider = new GoogleAuthProvider();

export default app;