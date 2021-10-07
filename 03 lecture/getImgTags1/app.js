import fetch from 'node-fetch';
import parser from 'node-html-parser';


let url = "https://ischool.uw.edu/"
fetch(url)
    .then(response => response.text())
    .then(function(pagetext) {
        let htmlPage = parser.parse(pagetext);
        let imgTags = htmlPage.querySelectorAll("img");
        for(let i = 0; i < imgTags.length; i++){
            let imgTag = imgTags[i];
            console.log("Image " + i + " Info:")
            console.log("alt: " + imgTag.attributes.alt)
            console.log("src: " + imgTag.attributes.src)
            console.log("id: " + imgTag.attributes.id)
            console.log("\n\n\n\n")
        }
        console.log(htmlPage);
    })
    .catch(function(error){
        console.log("error:" + error)
    })