import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyBldNdhBLRxv7IasPclPiLULSkhvxwlaOw",
	authDomain: "foto-review-7769d.firebaseapp.com",
	projectId: "foto-review-7769d",
	storageBucket: "foto-review-7769d.appspot.com",
	messagingSenderId: "989751294719",
	appId: "1:989751294719:web:f32df87ef9c3e23f2beaca",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();

const db = getFirestore(app);

const storage = getStorage(app);

export { app as default, auth, db, storage };
