import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAxdRNn9cTMmmoUoxeJ26uCZJN5Oh8ukgw",
  authDomain: "chaitanya-veda-assessment.firebaseapp.com",
  projectId: "chaitanya-veda-assessment",
  storageBucket: "chaitanya-veda-assessment.appspot.com",
  messagingSenderId: "278717241169",
  appId: "1:278717241169:web:bf64103cfe6e1b42b22570",
};

const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
