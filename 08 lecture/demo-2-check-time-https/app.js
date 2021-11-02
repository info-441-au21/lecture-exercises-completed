import fs from 'fs';
import dateFormat from 'dateFormat';
import https  from 'https';
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

app.get('/api/getTime', (req, res) => {
  //solutin suggested here: https://stackoverflow.com/questions/10645994/how-to-format-a-utc-date-as-a-yyyy-mm-dd-hhmmss-string-using-nodejs
  let day=dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");
  res.type('txt');
  res.send(day);
})

https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
}, app).listen(3000, () => {
  console.log('Example app listening at http://localhost:3000')
})
