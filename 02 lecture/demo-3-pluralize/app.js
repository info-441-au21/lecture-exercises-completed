import fs from 'fs';
import pluralize from 'pluralize';
import express from 'express';
const app = express()

app.get('/', (req, res) => {
  res.type('html')
  res.send(fs.readFileSync('index.html').toString());
})

app.get('/styles.css', (req, res) => {
    res.type('css')
    res.send(fs.readFileSync('style.css').toString())
})

app.get('/index.js', (req, res) => {
  res.type('js')
  res.send(fs.readFileSync('index.js').toString())
})

app.get('/api/pluralize', (req, res) => {
  let queryparams = req.query;
  let word = queryparams.word;
  let pluralizedWord = pluralize(word)
  res.send(pluralizedWord);
})

app.listen(3000, () => {
  console.log('Example app listening at http://localhost:3000')
})
