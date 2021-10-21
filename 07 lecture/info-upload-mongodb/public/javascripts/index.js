async function uploadData(){
    let myData = {};
    myData.first_name = 
        document.getElementById("first_name_input")
        .value;

    myData.last_name = 
        document.getElementById("last_name_input")
        .value;

    myData.favorite_ice_cream = 
        document.getElementById("favorite_ice_cream_input")
        .value;

    let response = await fetch(
        "/users/addUserData",
        {
            method: "POST",
            body: JSON.stringify(myData),
            headers: {
                'Content-Type': 'application/json'
              }
        }
    )

}


async function loadUsers(){
    let response = await fetch("/users/getUsers");
    let responseText = await response.text();
    document.getElementById("allusersdiv").innerHTML = responseText;
}