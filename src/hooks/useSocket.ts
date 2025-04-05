import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

interface UseSocketOptions {
  role: boolean;
  roomCode: string;
  name: string;
  // onSessionStart?: (data: { interviewer: string; candidate: string }) => void;
  setData: (data: any) => void;
  // onPeerJoined?: (peerData: { name: string; role: boolean }) => void;
}


export function useSocket(
  { role, roomCode, name, setData }: UseSocketOptions,

) {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = io('http://localhost:3001');
    socketRef.current = socket;
  
    // 1. Connect user to room
    if (role) {
      socket.emit('create-room', { roomCode, name });
    } else {
      socket.emit('join-room', { roomCode, name });
    }

    socket.on('session-started', (data) => {
        setData(data);
    })
  
    // // 2. Broadcast your presence to the other person
    // socket.emit('user-joined', { name, role });
  
    // // 3. Listen for the other user's data
    // socket.on('user-joined', (peerData) => {
    //   if (onPeerJoined) onPeerJoined(peerData);
    // });
  
    // 4. Listen for other existing logic
    // socket.on('session-started', (data) => {
    //   if (onSessionStart) onSessionStart(data);
    // });
  
    // socket.on('candidate-data', (data) => {
    //   if (role && onCandidateData) onCandidateData(data);
    // });
  
    return () => {
      socket.disconnect();
    };
  }, [role]); // roomCode, name, onSessionStart, onCandidateData, onPeerJoined
  

  return socketRef;
}