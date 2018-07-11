// This tries to open a Websocket connection
const client = new WebSocket(`ws://${window.location.host}/`);

// Bad... Hardcoding the URL will make it only work for ME on MY localhost.
// const client = new WebSocket(`ws://localhost:3000/`);

// console.log('hello');

function handleNewMessage(event) {
  const message = event.data;
  // console.log(message);
  $('#typehere').val(message);
}

function onConnection(event) {
  // console.log(event);
  // client.send('hello der from the client');
}

$('#typehere').on('input', function(event) {
  const contents = event.target.value;
  // Potential problem with the code here! It assumes `client` (aka connection is established).
  // This could result in an error if the connection failed to establish or is still being established
  // When the user decides to start typing
  client.send(contents);
})

client.addEventListener('message', handleNewMessage);
client.addEventListener('open', onConnection);
