// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAx07d-p1ZHGyaTIYgKUKchvHZ1YvvHoCE",
  authDomain: "incanto-24543.firebaseapp.com",
  databaseURL: "https://incanto-24543-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "incanto-24543",
  storageBucket: "incanto-24543.firebasestorage.app",
  messagingSenderId: "229805459626",
  appId: "1:229805459626:web:4891cd2f27c22a3e2628d3",
  measurementId: "G-6EWG114MVV"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Analytics (only in browser)
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

// Initialize Realtime Database
const database = getDatabase(app);

export { app, analytics, database };
