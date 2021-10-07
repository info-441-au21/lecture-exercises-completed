function checktime(){

    document.getElementById("results").innerHTML = "";
    let wordToPluralize = document.getElementById("wordInput").value;
    url = "/api/pluralize?word=" + wordToPluralize;
    fetch(url)
    .then(response => response.text())
    .then(function(pluralizedWord){
        document.getElementById("results").innerHTML = pluralizedWord;
    })
    .catch(function(error){
        document.getElementById("results").innerHTML = "ERROR:" + error;
    })
}