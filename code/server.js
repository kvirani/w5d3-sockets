const express = require('express');
const ws      = require('ws');

// Set the port to 3000
const PORT = 3000;

// Create a new express server
const app = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(
    PORT, '0.0.0.0', 'localhost',
    () => console.log(`Listening on ${PORT}`)
  );

// App logic below

// Temporary store for the current state of the document
let contents = '';

// wss = web socket server
const wss = new ws.Server({ server: app });

function broadcastMessage(message) {
  for (let client of wss.clients) {
    if (client.readyState === ws.OPEN) {
      client.send(message);
    }
  }
}

function handleMessage(message) {
  // console.log('NEW MESSAGE!');
  // console.log(message);
  contents = message;
  broadcastMessage(contents);
}

function handleConnection(client) {
  // console.log(client);
  // console.log('New Connection!');
  client.on('message', handleMessage);
  // Send this new person the current state of the document!
  client.send(contents);
}

wss.on('connection', handleConnection);
