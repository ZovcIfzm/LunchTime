
function sendRequest() {
    var elmnt = document.getElementById("results");
    elmnt.scrollIntoView();
    var uid = document.getElementById("the-only-submission").value;
    console.log("polling API! " + uid);
    var req = new XMLHttpRequest();
    var url = "https://ml-dot-hoohacks-saferoute.appspot.com/recommendation";
    req.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var linkElt = document.getElementById("recipe-link");
        var multElt = document.getElementById("multiplier");
        
        var temp = this.responseText;
        if (temp.startsWith("Bad")) {
            console.log(temp);
            linkElt.textContent = "That is not a valid user ID, please input a valid user ID.";
            multElt.textContent = "That is not a valid user ID, please input a valid user ID.";
        }
        if (temp.startsWith("Error")) {
            console.log(temp);
            linkElt.textContent = "Server error! Please try again.";
            multElt.textContent = "Server error! Please try again.";
            return;
        }
        var data = JSON.parse(this.responseText);
        console.log(data);
        linkElt.textContent = "Click here to see your recipe!";
        linkElt.href = "https://"+data["url"];
        linkElt.target = "_blank"
        multElt.textContent = "We recommend you make " + String(Math.round(data["multipler"]*10)/10) + " servings of this dish";
    }
};
    
    var formdata = new FormData();
    formdata.append("uid",uid);
    req.open("POST",url,true);
//    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    req.send(formdata);
}