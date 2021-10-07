
function auditUrl(){
    let url = 
        document.getElementById("urlInput").value;

    fetch("api/auditurl?url=" + url)
    .then(response => response.text()) // or response.json()
    .then(function(responseText){
        document.getElementById("results").innerHTML = responseText;
    })
    .catch(function(error){
        document.getElementById("results").innerHTML = "There was an error: " + error;
    });

}