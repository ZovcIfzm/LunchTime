  
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
var db = firebase.firestore();


function addDay(username) {
    
    var today = new Date();
    var date = (today.getMonth()+1)+'-'+today.getDate()+'-'+today.getFullYear();
    db.collection("users").doc(username).collection("dates").doc(date).set({
        calories: 0,
        fiber: 0,
        iron: 0,
        protein: 0,
        saturated_fat:0,
        unsaturated_fat:0,
        vitaminA:0,
        vitaminB:0,
        vitaminC:0   
})
.then(function() {
    console.log("Added empty day for today!");
})
.catch(function(error) {
    console.error("Error adding day: ", error);
});
}

function updateDay(username,nutrition) {
    var today = new Date();
        var date = (today.getMonth()+1)+'-'+today.getDate()+'-'+today.getFullYear();
    var docRef = db.collection("users").doc(username).
    collection("dates").doc(date);
    //now we have the document reference
    
    docRef.get().then(function(doc) {
    if (doc.exists) { //we have to update the day's stuff with new data
        var old_data = doc.data();
        var new_data = {
        calories: nutrition.calories+old_data.calories,
        fiber: nutrition.fiber+old_data.fiber,
        iron: nutrition.iron+old_data.iron,
        protein: nutrition.protein+old_data.protein,
        saturated_fat:nutrition.saturated_fat+old_data.saturated_fat,
        unsaturated_fat:nutrition.unsaturated_fat+old_data.unsaturated_fat,
        vitaminA:nutrition.vitaminA+old_data.vitaminA,
        vitaminB:nutrition.vitaminB+old_data.vitaminB,
        vitaminC:nutrition.vitaminC+old_data.vitaminC   
            }
        
        docRef.set(new_data).then(function() {
            console.log("added new data to old!")
        }).catch(function(error) {
            console.log("Error updating: " + error)});
    } else {
        // doc.data() will be undefined in this case
        console.log("Could not find existing document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});
}
    
function addEntry(username,nutrition) {
        var today = new Date();
    var date = (today.getMonth()+1)+'-'+today.getDate()+'-'+today.getFullYear();
    var docRef = db.collection("users").doc(username).collection("dates").doc(date);
    docRef.get().then(function(doc) {
        if (doc.exists) {
            console.log("just updating an existing entry");
            updateDay(username,nutrition);
        }
        else {
            addDay(username);
            console.log("made a new entry and udpated it!");
            updateDay(username,nutrition);
        }
    })
}

function getPresentDay (username) {
    var today = new Date();
    var date = (today.getMonth()+1)+'-'+today.getDate()+'-'+today.getFullYear();
    var docRef = db.collection("users").doc(username).
    collection("dates").doc(date);
    docRef.get().then(function(doc) {
        if (!doc.exists) {
            console.log('user data does not exist, please create it');
            return;
        }
        else {
        console.log(doc.data());
        return doc.data();}
    }).catch(function (error) {
        console.log("Error getting document: " + error);
        return error;
    });
}

function addMeal (username,mealname,mealingredients) {
        var today = new Date();
    var date = (today.getMonth()+1)+'-'+today.getDate()+'-'+today.getFullYear();
    var record_name = mealname+'-'+date;
    var ingredient_string = mealingredients.join();
    db.collection("users").doc(username).collection("meals").doc(record_name).set(
    {ingredients:ingredient_string}
    ).then(function() {
        console.log('updated database with meal: ' + mealname);
    }).catch(function(error) {
        console.log("Error when trying to add a meal: "+error);
    })
}

