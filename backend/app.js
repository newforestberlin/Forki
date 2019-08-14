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
require('dotenv').config()
const socket = io.connect(process.env.RASPBERRY_BACKEND_URL, {
  reconnection: true
});

mongoose.connect(process.env.MONGO_DB);

ioListener.on('connection', (socket) => {
  console.log('Frontend connected');
  socketLocalization.sockets(socket, ioListener);
  socketRouting.sockets(socket, ioListener);
  socketSonar.sockets(socket, ioListener);
  socketMovement.sockets(socket, io);
  socket.on('Frontend', () => {
    console.log('user disconnected');
  });
});

socket.on('connect', () => {
  console.log('Connected to Raspberry Pi');
  socketMovement.sockets(socket);
});

http.listen(process.env.PORT, () => {
  console.log("started on port " + process.env.PORT);
});