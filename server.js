const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const app = express();
const server = http.createServer(app);

const io = socketIO(server);

io.on('connection', (socket) => {
    console.log('A user connected');
  
    // Handle events from the client
    socket.on('eventFromClient', (data) => {
      // Handle the event data
    });
  
    // Emit events to the client
    socket.emit('eventToClient', data);
  });
  
