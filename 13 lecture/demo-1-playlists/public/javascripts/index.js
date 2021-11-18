async function addUser(){
    let name = 
        document.getElementById("name_input")
        .value;

    
    await fetch("/users", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name: name})
    })

    console.log("added user " + name);
}


async function loadUsers(){
    document.getElementById("allusersdiv").innerHTML = "Loading...";

    //load users from server
    let response = await fetch("/users");
    let userJson = await response.json();

    //display users
    let usersHTML = userJson.map(userInfo => {
        return `
        <hr>
        <div>
            <h3>Username: ${userInfo.username} <button onclick="deleteUser('${userInfo._id}')">Delete</button></h3>
            
            <strong>Favorite Bands: </strong>${userInfo.favorite_bands.join(", ")}<br>
            <strong>Add Band:</strong> <input type="text" id="add_band_text_${userInfo._id}" /> 
            <button onclick="addBand('${userInfo._id}')">Add Band</button><br>
            <h3>Playlists</h3>
            <div id="playlist_div_${userInfo._id}"></div>
            <br>
            <h3>Add Playlist:</h3>
            <strong>Title: </strong> <input type="text" id="add_playlist_title_text_${userInfo._id}" /><br>
            <strong>Songs: </strong> <input type="text" id="add_playlist_songs_text_${userInfo._id}" /><br>
            <button onclick="addPlaylist('${userInfo._id}')">Add Playlist</button><br>
        </div>`
    }).join("<hr>")

    document.getElementById("allusersdiv").innerHTML = usersHTML;

    userJson.forEach(userInfo => {
        loadPlaylists(userInfo._id);
    })
}


async function loadPlaylists(userID){
    
    //TODO: Load Playlist from server

    let playlists_info = []
    if(userID == 42){ // Kyle
        playlists_info = [
            {
                userID: 42,
                title: "sad playlist",
                songs: ["that sad lonely song", "that sad breakup song", "that whistful future song"]
            },{
                userID: 42,
                title: "fun playlist",
                songs: ["that everyone dance song", "that play loud music song"]
            }
        ]
    }else if(userID == 57) { //AnotherPerson
        playlists_info = [
            {
                userID: 57,
                title: "angry playlist",
                songs: ["that angry breakup song", "that angry at the authorities song"]
            }
        ]
    }


    let playlistHTML = playlists_info.map(playlistInfo => {
        return `
        <div>
            <h4>Playlist: ${playlistInfo.title}</h3>
            <strong>Songs:</strong> ${playlistInfo.songs.join(", ")}
        </div>`
    }).join("<br>")

    document.getElementById(`playlist_div_${userID}`).innerHTML = playlistHTML;
}

async function addBand(userID){
    alert("TODO: add band to user: " + userID);
}

async function addPlaylist(userID){
    alert("TODO: add playlist to user: " + userID);
}

async function deleteUser(userID){
    await fetch("/users", {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({userID: userID})
    })
    console.log("user deleted");
}