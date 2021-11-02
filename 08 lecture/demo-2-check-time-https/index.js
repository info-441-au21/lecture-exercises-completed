function checktime(){

    fetch("/api/getTime")
    .then(response => response.text())
    .then(function(dateString){
        document.getElementById("results").innerHTML = dateString;
    })
    .catch(function(error){
        document.getElementById("results").innerHTML = "ERROR:" + error;
    })
}