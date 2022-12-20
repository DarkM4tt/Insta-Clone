import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD9lQmUY0tBnVr8fxfa-GEvuJBuNKd5vps",
  authDomain: "soc-med-f0448.firebaseapp.com",
  projectId: "soc-med-f0448",
  storageBucket: "soc-med-f0448.appspot.com",
  messagingSenderId: "925043529930",
  appId: "1:925043529930:web:d3cc5ffb94ee93a4f5bc33",
  measurementId: "G-JXVN3551EW",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
