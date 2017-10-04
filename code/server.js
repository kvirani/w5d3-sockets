const express = require('express');
const ws = require('ws');

// Set the port to 5000
const PORT = 3000;

// Create a new express server
const app = express()
 // Make the express server serve static assets (html, javascript, css) from the /public folder
.use(express.static('public'))
.listen(
  PORT, '0.0.0.0', 'localhost',
  () => console.log(`Listening on ${PORT}`)
);

// Websocket logic

// const wss = new ws.Server({ server: app });

const wss = new ws.Server({ server: app });

let sharedContent = '';

function broadcast(data) {
  for(let client of wss.clients) {
    if (client.readyState === ws.OPEN) {
      client.send(data);
    }
  }
}

function handleMessage(data) {
  console.log('Message received!! ', data);
  sharedContent = data;
  broadcast(data);
}

function handleConnection(client) {
  console.log('New client connected!');
  console.log('We are at ' + wss.clients.size + ' clients!');
  client.on('message', handleMessage);
  client.send(sharedContent);
}

wss.on('connection', handleConnection);









