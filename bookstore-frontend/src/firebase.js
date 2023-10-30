// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8bW0MI2nq_vkw92ZwV5elCKTusGEu0go",
  authDomain: "bookstore-5a6b6.firebaseapp.com",
  projectId: "bookstore-5a6b6",
  storageBucket: "bookstore-5a6b6.appspot.com",
  messagingSenderId: "205085639949",
  appId: "1:205085639949:web:2a3db8ebcae31f5ba2dc44"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;