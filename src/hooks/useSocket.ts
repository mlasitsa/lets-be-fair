import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

interface UseSocketOptions {
  role: 'interviewer' | 'interviewee';
  roomCode: string;
  name: string;
  onSessionStart?: (data: { interviewer: string; candidate?: string }) => void;
  onCandidateData?: (data: any) => void;
}

export function useSocket(
  { role, roomCode, name, onSessionStart, onCandidateData }: UseSocketOptions,
  shouldConnect: boolean
) {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!shouldConnect) return;

    const socket = io('http://localhost:3001');
    socketRef.current = socket;

    // Emit role-specific join/create event
    if (role === 'interviewer') {
      socket.emit('create-room', { roomCode, name });
    } else {
      socket.emit('join-room', { roomCode, name });
    }

    // Listen for session start (interviewer & candidate names)
    socket.on('session-started', (data) => {
      if (onSessionStart) onSessionStart(data);
    });

    // Interviewer receives candidate data
    socket.on('candidate-data', (data) => {
      if (role === 'interviewer' && onCandidateData) {
        onCandidateData(data);
      }
    });

    // Handle disconnection cleanup
    return () => {
      socket.disconnect();
    };
  }, [role, roomCode, name, shouldConnect, onSessionStart, onCandidateData]);

  return socketRef;
}