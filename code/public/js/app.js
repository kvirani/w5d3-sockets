console.log('Running App...');

const ws = new WebSocket("ws://10.30.10.167:3000/");

function setupApp() {

  $('#typehere').on('input', function() {
    const val = $(this).val();
    console.log('sending up data: ' + val);
    ws.send(val);
    console.log('-----');
  })

}

ws.onopen = function(evt) {
  console.log('Established connection!', evt);
  setupApp();
}

ws.onmessage = function(evt) {
  console.log('On message called! ', evt);
  $('#typehere').val(evt.data)
}



