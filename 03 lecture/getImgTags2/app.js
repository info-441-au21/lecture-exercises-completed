import fs from 'fs';
import fetch from 'node-fetch';
import parser from 'node-html-parser';
import express from 'express';

const app = express()

app.get('/', (req, res) => {
  res.type('html')
  let htmlContents = fs.readFileSync("index.html").toString();
  res.send(htmlContents)
})

app.get('/styles.css', (req, res) => {
    res.type('css')
    let cssContents = fs.readFileSync("styles.css").toString();
    res.send(cssContents)
})

app.get('/index.js', (req, res) => {
  res.type('js')
  let cssContents = fs.readFileSync("index.js").toString();
  res.send(cssContents)
})

app.get('/api/auditurl', (req, res) => {
  let url = req.query.url;
  fetch(url)
      .then(response => response.text())
      .then(function(pagetext) {
          let htmlPage = parser.parse(pagetext);
          let imgTags = htmlPage.querySelectorAll("img");
          let summaryInfo = [];
          for(let i = 0; i < imgTags.length; i++){
              let imgTag = imgTags[i];
              let imgInfo = {};
              imgInfo.num = i;
              imgInfo.alt = imgTag.attributes.alt;
              imgInfo.src = imgTag.attributes.src || imgTag.attributes["data-src"];
              imgInfo.id =  imgTag.attributes.id;
              summaryInfo.push(imgInfo);
          }

          let html = summaryInfo.map( imginfo => {
              return "<h3>Image " + imginfo.num + " Info</h3>" +
                "alt: " + imginfo.alt + "<br>" +
                "id: " + imginfo.id + "<br>" + 
                "src: " + imginfo.src + "<br>" +
                "<img src='" + url + imginfo.src + "' />" +
                "<br><br><br>";
          }).join("");
          res.type('html');
          res.send(html);
      })
      .catch(function(error){
          console.log("error:" + error)
      })
})

app.listen(3000, () => {
  console.log('Example app listening at http://localhost:3000')
})
 