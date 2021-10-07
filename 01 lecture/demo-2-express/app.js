const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.type('html')
  res.send('<html><head>' + 
    '<link rel="stylesheet" href="styles.css">' +
    '</head><body><h1>Hello World!</h1></body></html>')
})

app.get('/styles.css', (req, res) => {
    res.type('css')
    res.send('h1 {background-color: red;}')
})

app.listen(3000, () => {
  console.log('Example app listening at http://localhost:3000')
})
