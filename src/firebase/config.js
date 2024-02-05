import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// console.log(process.env.REACT_APP_FIREBASE_API_KEY);
// console.log(process.env.REACT_APP_FIREBASE_AUTH_DOMAIN);
// console.log(process.env.REACT_APP_FIREBASE_PROJECT_ID);
// console.log(process.env.REACT_APP_FIREBASE_STORAGE_BUCKET);
// console.log(process.env.REACT_APP_MESSAGE_SENDER);
// console.log(process.env.REACT_APP_APP_ID);
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain:process.env.REACT_APP_FIREBASE_AUTH_DOMAIN ,
  projectId:process.env.REACT_APP_FIREBASE_PROJECT_ID ,
  storageBucket:process.env.REACT_APP_FIREBASE_STORAGE_BUCKET ,
  messagingSenderId:process.env.REACT_APP_MESSAGE_SENDER ,
  appId: process.env.REACT_APP_APP_ID
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db=getFirestore(app)
console.log(db);