import firebase from './firebase_init'
var db = firebase.firestore();


export function addDay(username) {
    
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

export function updateDay(username,nutrition) {
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
    
export function addEntry(username,nutrition) {
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

export function getPresentDay (username) {
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

export function addMeal (username,mealname,mealingredients) {
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

export function testHi(){
    let ret = "testHI"
    return ret
}