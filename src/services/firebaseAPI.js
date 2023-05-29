import firebase from "firebase/app";
import "firebase/firestore";
import CautionFirebaseConfig from "./firebaseConfig"

  // Initialize Firebase
firebase.initializeApp(CautionFirebaseConfig);

export const db = firebase.firestore();