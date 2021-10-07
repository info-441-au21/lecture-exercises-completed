const fs = require('fs');
const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.type('html')
  res.send(fs.readFileSync('index.html').toString());
})

app.get('/styles.css', (req, res) => {
    res.type('css')
    res.send(fs.readFileSync('style.css').toString())
})

app.listen(3000, () => {
  console.log('Example app listening at http://localhost:3000')
})
