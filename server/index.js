import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});


const rooms = {}; 

io.on('connection', (socket) => {
  console.log(`Socket connected: ${socket.id}`);

  socket.on('create-room', ({ name, roomCode }) => {
    socket.join(roomCode); 
    rooms[roomCode] = {
      interviewer: { socketId: socket.id, name }
    };
    console.log(`Interviewer ${name} created and joined room ${roomCode}`);
  });

  socket.on('join-room', ({ name, roomCode }) => {
    if (!rooms[roomCode]) {
      socket.emit('error', 'Room does not exist');
      return;
    }

    socket.join(roomCode);
    rooms[roomCode].candidate = { socketId: socket.id, name };
    console.log(`Candidate ${name} joined room ${roomCode}`);

    io.to(roomCode).emit('session-started', {
      interviewer: rooms[roomCode].interviewer.name,
      candidate: name
    });
  });

  socket.on('process-update', ({ roomCode, data }) => {
    if (!rooms[roomCode]) return;
    
    const interviewerSocketId = rooms[roomCode].interviewer.socketId;
    io.to(interviewerSocketId).emit('candidate-data', data);
  });

  socket.on('disconnect', () => {
    console.log(`Socket disconnected: ${socket.id}`);
  });
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
