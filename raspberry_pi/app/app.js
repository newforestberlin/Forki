const movement = require('./routes/movement')
const movementService = require('./services/movement')
const database = require('./services/database')
const app = require('express')();
const http = require('http').Server(app);
const ioListener = require('socket.io')(http);
const redis = require('redis');
const client = redis.createClient();
const io = require('socket.io-client');

require('dotenv').config();

const socket = io.connect(process.env.IOT_PLATFORM_URL, {
  reconnection: true
});

// conect to redis database
client.on('connect', async function () {
  console.log('Redis client connected');
});

client.on('error', function (err) {
  console.log('Something went wrong ' + err);
});

// enable pins for motorController
movementService.setupPins();

// connect to socket from IoT backend
socket.on('connect', () => {
  console.log('Connected');
  setInterval(async () => {
    socket.emit('setAnchorParameters', await database.getAnchors())
  }, 200);
  setInterval(async () => {
    socket.emit('setRobotPosition', await database.getPosition())
  }, 200);
  setInterval(async () => {
    socket.emit('setSonarParameter', await database.getUltrasonic())
  }, 100);
});

// listen to socket from IoT backend
ioListener.on('connection', (socket) => {
  console.log('User connected');
  movement.sockets(socket, ioListener);
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// start server on localhost 3000 for socket listener
http.listen(process.env.PORT, () => {
  console.log("started on port " + process.env.PORT);
});