console.log('Running App...');

const ws = new WebSocket("ws://localhost:3000/");

function setupApp(evt) {
  console.log('Established connection!', evt);

  $('#typehere').on('input', function() {
    const val = $(this).val();
    console.log('sending up data: ' + val);
    ws.send(val);
    console.log('-----');
  })
}

ws.addEventListener('open', setupApp);

ws.addEventListener('message', function(evt) {
  console.log('On message called! ', evt);
  $('#typehere').val(evt.data)
});

