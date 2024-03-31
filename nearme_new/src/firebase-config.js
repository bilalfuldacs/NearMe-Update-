// firebase-config.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { doc, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAD6Y_lITGj-o0G6bZLLcUfw8xO9eq98h0",
  authDomain: "nearme-5d337.firebaseapp.com",
  databaseURL: "https://nearme-5d337-default-rtdb.firebaseio.com",
  projectId: "nearme-5d337",
  storageBucket: "nearme-5d337.appspot.com",
  messagingSenderId: "730109380561",
  appId: "1:730109380561:web:209cc076ec844be1ec82f0",
  measurementId: "G-SC7C3TR98S",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app); // Initialize Firebase Storage
// Optionally initialize Firebase Analytics
// Check if analytics is supported in the current environment
let analytics;
if (typeof window !== "undefined" && "measurementId" in firebaseConfig) {
  analytics = getAnalytics(app);
}

export { db, auth, analytics, storage };
