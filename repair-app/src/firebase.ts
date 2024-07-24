// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA0RfLQoXbwY33y882YUXTw0WseDe-W2qo",
  authDomain: "intro-to-consultancy.firebaseapp.com",
  projectId: "intro-to-consultancy",
  storageBucket: "intro-to-consultancy.appspot.com",
  messagingSenderId: "430902031373",
  appId: "1:430902031373:web:40f385355852b01f5a5144",
  measurementId: "G-T5V25QGG82"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export{db}