// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {collection,doc, setDoc,getDocFromCache} from 'firebase/firestore';
//import StartFirebase  from 'firebaseConfig/index';
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC3_c4T5KpchMriShYNgwNLH2kkUituid0",
    authDomain: "otochain-f5bbd.firebaseapp.com",
    databaseURL: "https://otochain-f5bbd-default-rtdb.firebaseio.com",
    projectId: "otochain-f5bbd",
    storageBucket: "otochain-f5bbd.appspot.com",
    messagingSenderId: "557582238019",
    appId: "1:557582238019:web:c321c3f98c721af20d6ff6",
    measurementId: "G-C16C1JZSNY"
};
// Initialize Firebase
// Get a document, forcing the SDK to fetch from the offline cache.
const app = initializeApp(firebaseConfig);
//export
//export {collection,doc}
export const db = getDatabase(app);
export const auth = getAuth(app);
