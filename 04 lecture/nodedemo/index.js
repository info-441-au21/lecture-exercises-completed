let title = "This page";
let subtitle = "this is an example page";
let description = undefined;

let html = "<html><body>" +
           "<H1>" + title + "<H1>" +
           "<H2>" + subtitle + "<H2>" +
           "<html><body>"

console.log(html);


let html2 = `
<html>
  <body>
    <h1>${title}</h1>
    <h2>${subtitle}</h2>
    <p>${(description ? description : "")}</p>
  <body>
</html>`

console.log(html2);



function makeDescriptionHtml(description){
    if(description) {
        return `<p>${description}</p>`;
    }
    return "";
}

let html3 = `
<html>
  <body>
    <h1>${title}</h1>
    <h2>${subtitle}</h2>
    ${makeDescriptionHtml(description)}
  <body>
</html>`

console.log(html3);



let arr = [
    "first name : Kyle",
    "last name : Thayer",
    "age : 37",
    "glasses : yes"
]

let values = {};
arr.forEach( item => {
    let split_item = item.split(" : ")
    values[split_item[0]] = split_item[1];
})
console.log(values);


let modifiedArr = arr.map(item =>{
    return item.replace(":", "=");
})
console.log(modifiedArr);


let modifiedArr2 = arr.map(item =>{
    let split_item = item.split(" : ")
    return split_item[0];
})
console.log(modifiedArr2);


let filteredArr = arr.filter(item => {
    if(item.includes("name")){
        return true;
    }
    return false;
})
console.log(filteredArr);
