import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB4vNwORbEcZ92qRVNfj9kxApop23_Fvx0",
  authDomain: "jetcars-dealership.firebaseapp.com",
  projectId: "jetcars-dealership",
  storageBucket: "jetcars-dealership.firebasestorage.app",
  messagingSenderId: "253308611973",
  appId: "1:253308611973:web:4f4f40805a6e2cf99d68ec",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
