//initiate request to server
var socket = io();

//action on an even 'connect'
socket.on('connect', function() {
  console.log('Connected to server');
  socket.emit('SendMessage', {
    from: 'sendmessahe@email.com',
    text: 'Hello, How are you !!!'
  })
});

//action on an another event 'disconnect'
socket.on('disconnect', function() {
  console.log('Disconnected to server')
});

//action on event 'NewMessage'
socket.on('NewMessage', function(newMsg) {
  console.log('Recevied new message', newMsg);
});
