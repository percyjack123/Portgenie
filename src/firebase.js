import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCtU5g0QhLuGAOjcAkINUEvsJHchB5AHZM",
  authDomain: "portgenie.firebaseapp.com",
  projectId: "portgenie",
  storageBucket: "portgenie.appspot.com", // 🔴 IMPORTANT FIX
  messagingSenderId: "806588112304",
  appId: "1:806588112304:web:aa957cefd8cfdadb3f8a75",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app); // ✅ MUST EXIST
