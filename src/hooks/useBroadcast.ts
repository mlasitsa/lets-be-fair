import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

type useBroadCastData = {
  roomCode: string,
  setCode: (code: any) => void,
  value: any
}

const useBroadcast = ({ roomCode, setCode, value }: useBroadCastData) => {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = io('http://localhost:3001');
    socketRef.current = socket;

    socket.on('update-code', ({ content }) => {
        console.log('SOCKET: this is the content I have and update:', content)
      setCode(content);
    });

    return () => {
      socket.disconnect();
    };
  }, [roomCode, setCode]);

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.emit('update-content', { roomId: roomCode, content: value });
    }
  }, [value, roomCode]);
}

export default useBroadcast;
