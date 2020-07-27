import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCw0p4mdThaE-mrPAL8YXrANO2_M3gBeE0",
  authDomain: "messages-8ef1b.firebaseapp.com",
  databaseURL: "https://messages-8ef1b.firebaseio.com",
  projectId: "messages-8ef1b",
  storageBucket: "messages-8ef1b.appspot.com",
  messagingSenderId: "265552656599",
  appId: "1:265552656599:web:12ad23305bedeec7ded892",
  measurementId: "G-HVQXS3ZF4H"
});

const db = firebaseApp.firestore();

export default db;
