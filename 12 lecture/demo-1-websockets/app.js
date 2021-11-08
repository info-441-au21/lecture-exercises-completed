import fs from 'fs';
import express from 'express';

const app = express();

app.get(['/', '/index.html'], (req, res) => {
  res.type('html')
  let cssContents = fs.readFileSync("index.html").toString();
  res.send(cssContents)
})

app.listen(3000, () => {
  console.log('Example app listening at http://localhost:3000')
})
