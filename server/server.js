//load express & path
const express = require('express');
const path = require('path');
//load socket io library
const socketIO = require('socket.io');
const http = require('http');

//custom imports
const {generateMessage, generateLocationMessage} = require('./util/message');

const publicFolder = path.join(__dirname, '../public');
var port = process.env.PORT || 3000;
var app = express();
//create server using http module
var server = http.createServer(app);
//integrate socket.io to application
var io = socketIO(server);

//open web socket when client initiates socket request
io.on('connection',(socket) => {
  console.log('New Client Connection');

  //Emit welcome message
  socket.emit('newMessage', generateMessage('admin', 'welcome to chat room !!'));

  //Broadcast that new message has entered
  socket.broadcast.emit('newMessage', generateMessage('admin', 'new user has joined'));

  //Recieve custom event from client
  socket.on('createMessage', (msg) => {
    console.log('Recevied message from client', msg);
    //Send to all a new message
    io.emit('newMessage', generateMessage(msg.from, msg.text));
    //
  });

  //Receive custom event sendLocation
  socket.on('sendLocation', (position) => {
    socket.broadcast.emit('locationMessage', generateLocationMessage('admin', position.latitude, position.longitude));
  });

  socket.on('disconnect', () => {
    console.log('Client disconected');
  });
});

//set public folder for app
app.use(express.static(publicFolder));

//start server
server.listen(port, () => {
  //Message to show that server has started
  console.log(`Node JS start at ${port}`);
});
