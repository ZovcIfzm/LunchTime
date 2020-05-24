  
// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// If you enabled Analytics in your project, add the Firebase SDK for Analytics

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
var firebaseConfig = {
    apiKey: "AIzaSyAmW_j4-0PNdQ9M8_wgfgruYe66AFeVawg",
    authDomain: "lunchtime-929c6.firebaseapp.com",
    databaseURL: "https://lunchtime-929c6.firebaseio.com",
    projectId: "lunchtime-929c6",
    storageBucket: "lunchtime-929c6.appspot.com",
    messagingSenderId: "328669618858",
    appId: "1:328669618858:web:0d0934796a3731df76a6d3",
    measurementId: "G-0WMK2HGS4Z"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;