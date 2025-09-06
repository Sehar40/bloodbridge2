import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";       // <-- Add this import
import { getFirestore } from "firebase/firestore"; // <-- And this import

const firebaseConfig = {
  apiKey: "AIzaSyBw2-gi0FA6alvK_xVAFeVaZQpCqxKqDXE",
  authDomain: "bloodbridge-ee773.firebaseapp.com",
  projectId: "bloodbridge-ee773",
  storageBucket: "bloodbridge-ee773.firebasestorage.app",
  messagingSenderId: "517167273903",
  appId: "1:517167273903:web:53adcbada985f2dca9c15a",
  measurementId: "G-5VEEKDEX3F"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
