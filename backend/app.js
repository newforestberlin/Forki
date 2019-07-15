const app = require('express')();
const http = require('http').Server(app);
const ioListener = require('socket.io')(http);
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const socketRouting = require('./routes/routing');
const socketSonar = require('./routes/sonar');
const socketMovement = require('./routes/movement');
const socketLocalization = require('./routes/localization');
const io = require('socket.io-client')
const socket = io.connect('http://192.168.2.67:3000', {
  reconnection: true
});
require('dotenv').config()


mongoose.connect(process.env.MONGO_DB);

ioListener.on('connection', (socket) => {
  console.log('user connected');
  socketLocalization.sockets(socket, ioListener);
  socketRouting.sockets(socket, ioListener);
  socketSonar.sockets(socket, ioListener);
  socketMovement.sockets(socket, io);
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

socket.on('connect', () => {
  console.log('Connected');
  socketMovement.sockets(socket);
});

http.listen(3000, () => {
  console.log("started on port 3000");
});
