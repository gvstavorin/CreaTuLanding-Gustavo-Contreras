// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDdL1S7PRHvTrcfjhElW5vYr5ENR6fWmEw",
  authDomain: "store-mng.firebaseapp.com",
  projectId: "store-mng",
  storageBucket: "store-mng.appspot.com",
  messagingSenderId: "618557175547",
  appId: "1:618557175547:web:662e74495625e7e0bca25e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);