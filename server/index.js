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
    console.log(`Interviewer ${name} created and joined room ${roomCode}`);
  });

  socket.on('join-room', ({ name, roomCode }) => {
    if (!rooms[roomCode]) {
      return;
    }

    socket.join(roomCode);
    console.log(`Candidate ${name} joined room ${roomCode}`);

    const interviewer = rooms[roomCode].interviewer.name;
    console.log("Hello from server:", interviewer)
    const interviewee = rooms[roomCode].candidate.name;
    console.log("Hello from server:", interviewee)

    if (interviewer && interviewee) {
      io.to(roomCode).emit('session-started', {
        interviewer: interviewer,
        interviewee: interviewee
      })
    }
    // if (interviewer) {
    //   socket.emit("user-joined", {
    //     name: interviewer.name,
    //     role: true
    //   })
    //   if (interviewer && interviewee) {
    //     io.to(roomCode).emit('session-started', {
    //       interviewer: interviewer.name,
    //       candidate: interviewee
    //     });
    //   }
    // }
  });

  socket.on("checkRoom", ({code, isInterviewer, name}) => {
    console.log(rooms)
    console.log('Code is', code)
    if (isInterviewer) {
      if (!rooms[code]) {
        socket.emit('checkRoom-interviewer', true)   // Room is open and can be created
        rooms[code] = {
          interviewer: { socketId: socket.id, name },
          candidate: {}
        };
      } else {
        socket.emit('checkRoom-interviewer', false)  // Room is taken and cannot be created
      }
    } else {
      if (rooms[code]) {
        socket.emit('checkRoom-interviewee', true); // Room exists — candidate can join
        rooms[code].candidate = { socketId: socket.id, name };
      } else {
        socket.emit('checkRoom-interviewee', false); // Room does not exist — can't join
      }
    }
  })

  // socket.on('process-update', ({ roomCode, data }) => {
  //   if (!rooms[roomCode]) return;
    
  //   const interviewerSocketId = rooms[roomCode].interviewer.socketId;
  //   io.to(interviewerSocketId).emit('candidate-data', data);
  // });

  // socket.on('user-joined', ({ name, role }) => {
  //   const roomsJoined = Array.from(socket.rooms).filter((room) => room !== socket.id);
  //   const roomCode = roomsJoined[0];
  
  //   if (!roomCode) return;
  
  //   socket.to(roomCode).emit('user-joined', { name, role });
  // });
  

  socket.on('disconnect', () => {
    console.log(`Socket disconnected: ${socket.id}`);
  });
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
