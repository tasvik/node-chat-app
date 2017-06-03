//initiate request to server
var socket = io();

//action on an another event 'disconnect'
socket.on('disconnect', function() {
  console.log('Disconnected to server')
});

//action on event 'NewMessage'
socket.on('newMessage', function(newMsg) {
  console.log('Recevied new message', newMsg);

  //create new element using jQuery
  var li = jQuery('<li></li>');
  //set text of the element list
  li.text(`${newMsg.from}: ${newMsg.text}`);

  //append list into order list using id
  jQuery('#messages').append(li);
});

//action to be performed when user clicks submit button
jQuery('#message-form').on('submit', function (e){
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'user',
    text: jQuery('[name=message]').val()
  });
});
