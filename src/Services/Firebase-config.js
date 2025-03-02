// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage"
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAgDTCHW5QqxkQkLZJ2dd7P6DK-u8yC6l8",
    authDomain: "wetalk-c0c9d.firebaseapp.com",
    databaseURL: "https://wetalk-c0c9d-default-rtdb.firebaseio.com",
    projectId: "wetalk-c0c9d",
    storageBucket: "wetalk-c0c9d.appspot.com",
    messagingSenderId: "859748410970",
    appId: "1:859748410970:web:dc17d700a66553e2f69a63",
    measurementId: "G-0RFC95FLRN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);




