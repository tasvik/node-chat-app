//load express & path
const express = require('express');
const path = require('path');

//load socket io library
const socketIO = require('socket.io');
const http = require('http');

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

  //Emit a custom event 'newMessage' using emit()
  // Server ---> Client
  socket.emit('newMessage', {
    from: 'newmessage@email.com',
    text: 'This is new message',
    createdAT: 'DDDD'
  });

  //Recieve custom message from server
  socket.on('createMessage', (msg) => {
    console.log('Recevied message from client', msg);
  });

  socket.on('disconnect', () => {
    console.log('Client disconected');
  });
});

//set public folder for app
app.use(express.static(publicFolder));

//start server
server.listen(port, () => {
  console.log(`Node JS start at ${port}`);
});

//Message to show that server has started
