// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDuvI0lG8WoEI5vvKbqlEMHqlgMx3Mkyfk",
  authDomain: "expense-tracker-ahnaf.firebaseapp.com",
  projectId: "expense-tracker-ahnaf",
  storageBucket: "expense-tracker-ahnaf.appspot.com",
  messagingSenderId: "927548097340",
  appId: "1:927548097340:web:74ce5f643a3ca553481439",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
