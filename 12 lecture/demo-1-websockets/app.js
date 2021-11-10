import fs from 'fs';
import express from 'express';
import enableWs from 'express-ws';

const app = express();
enableWs(app);

app.get(['/', '/index.html'], (req, res) => {
  res.type('html')
  let cssContents = fs.readFileSync("index.html").toString();
  res.send(cssContents)
})

let allWebSockets = [];
let socketCounter = 1;

app.ws('/socket', (ws, req) => {

  allWebSockets.push(ws);
  let myNum = socketCounter;
  socketCounter++;
  
  ws.on('message', msg => {
    allWebSockets.forEach( socket => {
      socket.send(myNum + ": " + msg);
    })
  })

  ws.on('close', () => {
    //TODO: remove it from the allWebSockets array
    console.log("websocket " + myNum + " closed")
  })
})

app.listen(3000, () => {
  console.log('Example app listening at http://localhost:3000')
})
