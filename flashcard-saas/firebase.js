// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDMhUDOM2V9319uxHVs1IDh3VmH0JBap_w",
  authDomain: "flashcardsaas-58a66.firebaseapp.com",
  projectId: "flashcardsaas-58a66",
  storageBucket: "flashcardsaas-58a66.appspot.com",
  messagingSenderId: "748075250744",
  appId: "1:748075250744:web:2eb7d55eea39b05a9622cd",
  measurementId: "G-ZB0HGGQ1P6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);