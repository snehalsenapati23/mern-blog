// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-c8075.firebaseapp.com",
  projectId: "mern-blog-c8075",
  storageBucket: "mern-blog-c8075.appspot.com",
  messagingSenderId: "1095948278650",
  appId: "1:1095948278650:web:84230ba9864b40d5d154c3",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
