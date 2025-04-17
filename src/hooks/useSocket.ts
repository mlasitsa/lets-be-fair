import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

interface UseSocketOptions {
  roomCode: string;
  // onSessionStart?: (data: { interviewer: string; candidate: string }) => void;
  setData: (data: any) => void;
  // onPeerJoined?: (peerData: { name: string; role: boolean }) => void;
}


export function useSocket(
  { roomCode, setData }: UseSocketOptions,

) {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = io('http://localhost:3001');
    socketRef.current = socket;
  
    console.log("useSocket hook is running for room:", roomCode);

    socket.on('session-started', ({data}) => {
      console.log("CLIENT RECEIVED SESSION-STARTED", data);
      setData(data); 
    });
  
    socket.emit('data-connection', { roomCode });
    console.log("I just emmited code")

    
  
    return () => {
      socket.disconnect();
    };
  }, [roomCode]);
}  