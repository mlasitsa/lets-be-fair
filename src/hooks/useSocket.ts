import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
// @ts-ignore
import socket from '../utils/socket.js'

interface UseSocketOptions {
  roomCode: string;
  setData: (data: any) => void;
  setIsInterviewer: (isInterviewer: boolean) => void;
}

export function useSocket({ roomCode, setData, setIsInterviewer }: UseSocketOptions) {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = socket;

    console.log("useSocket hook is running for room:", roomCode);

    socket.on('session-started', ({ data, role } : {data: any, role: any}) => {
      console.log("CLIENT RECEIVED SESSION-STARTED", data);
      setData(data);
      setIsInterviewer(role === 'interviewer');
    });

    socket.emit('data-connection', { roomCode });
    console.log("I just emmited code");

    return () => {
      
    };
  }, [roomCode]);
}
