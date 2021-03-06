function getPterosaurPreview(onePterosaur){
    let html = `<div>
        <p>${onePterosaur.Genus}</p>
        <img src="${onePterosaur.img}" />
    </div>`;
    return html
}

async function getPterosaurs(){
    try{
        let pterosaurResponse = await fetch("/api/getPterosaurs")
        let pterosaurInfo = await pterosaurResponse.json();
        
        let html = pterosaurInfo.map(onePterosaur => {
            return getPterosaurPreview(onePterosaur);
        }).join("");

        document.getElementById("results").innerHTML = html;
    } catch(error) {
        document.getElementById("results").innerHTML = "there was an error" + error;
    }

    //alternate load of ajax fetch
    //let pterosaurInfo = await fetch("/api/getPterosaurs")
    //                            .then(response => response.text());
}