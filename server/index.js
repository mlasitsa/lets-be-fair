import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

const rooms = {};

io.on('connection', (socket) => {
  console.log(`Socket connected: ${socket.id}`);

  socket.on('checkRoom', ({ code, isInterviewer, name }) => {
    console.log('Checking room:', code);

    if (isInterviewer) {
      if (!rooms[code]) {
        socket.join(code);
        rooms[code] = {
          interviewer: { socketId: socket.id, name, role: 'interviewer' },
          candidate: null,
          content: null
        };
        socket.emit('checkRoom-interviewer', true);
      } else {
        socket.emit('checkRoom-interviewer', false);
      }
    } else {
      if (rooms[code]) {
        socket.join(code);
        rooms[code].candidate = {
          socketId: socket.id,
          name,
          role: 'candidate',
          applications: undefined,
        };
        socket.emit('checkRoom-interviewee', true);
      } else {
        socket.emit('checkRoom-interviewee', false);
      }
    }

    // Emit session-started if both roles are filled
    const room = rooms[code];
    if (room?.interviewer && room?.candidate) {
      console.log("Emitting session-started to room", code, room);
      io.to(code).emit('session-started', { data: room });
    }
  });

  socket.on('candidate-data', ({ processes, room }) => {
    if (rooms[room]) {
      rooms[room].candidate.applications = processes;
      console.log("Received processes from candidate:", processes);
  
      io.to(room).emit('session-started', { data: rooms[room] });
    }
  });

  socket.on('data-connection', ({ roomCode }) => {
    socket.join(roomCode);
    console.log(`Socket ${socket.id} reconnected to room ${roomCode}`);

    const room = rooms[roomCode];
    if (room?.interviewer && room?.candidate) {
      const role =
        room.interviewer.socketId === socket.id
          ? 'interviewer'
          : room.candidate.socketId === socket.id
          ? 'candidate'
          : 'unknown';

      io.to(socket.id).emit('session-started', {
        data: room,
        role,
      });
    }
  });

  socket.on('update-content', ({ roomId, content }) => {
    console.log('I have received code as:', content)
    socket.join(roomId)
    socket.to(roomId).emit('update-code', { content });
  });

  socket.on('disconnect', () => {
    console.log(`Socket disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
