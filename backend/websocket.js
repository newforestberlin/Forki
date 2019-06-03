const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const sockets = require('./routes/sockets');
require('dotenv').config()


mongoose.connect(process.env.MONGO_DB);

io.on('connection', (socket) => {
  console.log('user connected');
  sockets.sockets(socket, io);
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

http.listen(3000, () => {
  console.log("started on port 3000");
});
