//initiate request to server
var socket = io();

//action on an another event 'disconnect'
socket.on('disconnect', function() {
  console.log('Disconnected to server')
});

//action on event 'locationMessage'
socket.on('locationMessage', function(newMsg) {
  //created formatted time using moment
  var formattedTime = moment(newMsg.createdAt).format('h:mm a');
  //create relevent html elment using jQuery
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My Location</a>');

  //set values of the html element
  li.text(`${newMsg.from} ${formattedTime}:`);
  a.attr('href', newMsg.url);

  //apend the values
  li.append(a);
  jQuery('#messages').append(li);
});

//action on event 'NewMessage'
socket.on('newMessage', function(newMsg) {
  console.log('Recevied new message', newMsg);
  //create formatted time using moment
  var formattedTime = moment(newMsg.createdAt).format('h:mm a');
  //create new element using jQuery
  var li = jQuery('<li></li>');
  //set text of the element list
  li.text(`${newMsg.from} ${formattedTime}: ${newMsg.text}`);


  //append list into order list using id
  jQuery('#messages').append(li);
});

//action to be performed when user clicks submit button
jQuery('#message-form').on('submit', function(e) {
  e.preventDefault();

  var messgaTextBox = jQuery('[name=message]')

  socket.emit('createMessage', {
    from: 'user',
    text: jQuery('[name=message]').val()
  });
});

var locationButton = jQuery('#location-button');

locationButton.on('click', function() {
  //Check if browser support location
  if (!navigator.geolocation) {
    return alert('Your browser does not support geolocation');
  }

  //change text of button
  locationButton.attr('disabled', 'disabled').text('Sending location...');

  //call web API getCurrentPosition to get location from browser
  navigator.geolocation.getCurrentPosition(function(position) {
    locationButton.removeAttr('disabled').text('Send location')
    //create and send event to server
    socket.emit('sendLocation', {
      latitude: `${position.coords.latitude}`,
      longitude: `${position.coords.longitude}`
    });
  });
});
