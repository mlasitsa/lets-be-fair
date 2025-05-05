import express, { application } from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { log } from 'console';

// HERE I NEED TO FIGURE OUT
// Why I need to join room 3 times for some reason (issues with listeners)
// Why do I have this lag if I start spamming like !!!!!!!!!!!!!! (could it be listeners or is it a normal behavior)
// Add notification on wher user Joins AND LEAVES
// Clear data if user leaves from the server storage, but potentially add it to db before we clean up data from server

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
        // adding data to the socket data since it migth be usefull when we disconnecting
        // maybe I can pass socket data rather than server hmap data
        socket.data = {
          code: code,
          name: name,
          socketId: socket.id,
          role: 'interviewer'
        }
        console.log("Socket data is:", socket.data)
        rooms[code] = {
          interviewer: { socketId: socket.id, name, role: 'interviewer' },
          candidate: null,
          content: null
        };
        socket.emit('checkRoom-interviewer', true);
        socket.to(code).emit('user-joined', socket.data.name)
      } else {
        if (rooms[code] && rooms[code].interviewer.name == name) {
          socket.data = {
            code: code,
            name: name,
            socketId: socket.id,
            role: 'interviewer'
          }

          rooms[code].interviewer.socketId = socket.id
          socket.emit('checkRoom-interviewer', true);
          socket.to(code).emit('user-joined', socket.data.name)
        }
        socket.emit('checkRoom-interviewer', false);
      }
    } else {
      if (rooms[code]) {
        socket.join(code);
        // adding data to socket data, since this might be usefull on disconnect ??? - this is candidate
        socket.data = {
          code: code,
          name: name,
          socketId: socket.id,
          role: 'candidate',
          applications: undefined
        }
        console.log('Socket data is:', socket.data)
        rooms[code].candidate = {
          socketId: socket.id,
          name,
          role: 'candidate',
          applications: undefined,
        };
        socket.emit('checkRoom-interviewee', true);
        socket.to(code).emit('user-joined', socket.data.name)
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
    io.to(roomId).emit('update-code', { content });
  });



  socket.on('disconnect', () => {
    console.log(`Socket disconnected: ${socket.id}`);

    const {code, name, role} = socket.data || {}
  
    const isInterviewer = role === 'interviewer';
    console.log(`Your roomCode is ${code} and isInterview is ${isInterviewer}`);
    
    if (!rooms[code]) return; 
    socket.to(code).emit('user-left', ({name, code, role}))
  
    if (isInterviewer) {
      console.log(`Interviewer left room ${code}`);
      // remove from room
      //rooms[code].interviewer = null
    } else {
      console.log(`Candidate left room ${code}`);
      //remove from room
      //rooms[code].candidate = null
    }

  });

});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

