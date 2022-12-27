// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyAL1ktkSr9_pqQPbCnjztH0aDeVRTBUdH8",
    authDomain: "chat-app-cc9d8.firebaseapp.com",
    projectId: "chat-app-cc9d8",
    storageBucket: "chat-app-cc9d8.appspot.com",
    messagingSenderId: "543191369397",
    appId: "1:543191369397:web:5e57cf3ae9d1f101bba0fc"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();