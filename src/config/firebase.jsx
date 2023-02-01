// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBVPFCSvhF6QUWkgag2iGrp4oQPjiyKaoA",
    authDomain: "walletfy-728ca.firebaseapp.com",
    projectId: "walletfy-728ca",
    storageBucket: "walletfy-728ca.appspot.com",
    messagingSenderId: "307710124433",
    appId: "1:307710124433:web:baa2ca9e8bfe49341dba30"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore(app)

