const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const socketRouting = require('./routes/routing');
const socketLocalization = require('./routes/localization');
require('dotenv').config()


mongoose.connect(process.env.MONGO_DB);

io.on('connection', (socket) => {
  console.log('user connected');
  socketLocalization.sockets(socket, io);
  socketRouting.sockets(socket, io);
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

http.listen(3000, () => {
  console.log("started on port 3000");
});
