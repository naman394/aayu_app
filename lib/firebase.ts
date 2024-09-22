// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAfbMqOjKKTj24vm3aIEIho-RMVZ4833Uk",
  authDomain: "aayu-880f6.firebaseapp.com",
  projectId: "aayu-880f6",
  storageBucket: "aayu-880f6.appspot.com",
  messagingSenderId: "531496495639",
  appId: "1:531496495639:web:322afd1a92c1ae7eed0a52",
  measurementId: "G-VJSVRLBHRW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };