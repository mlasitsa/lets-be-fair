import React from 'react'
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useSocket } from '../../hooks/useSocket';
import { useState } from 'react';



const Room = () => {

    const location = useLocation();
    const {info, isInterviewer } = location.state;
    const [peer, setPeer] = useState<{ name: string; role: boolean } | null>(null);
    const [interviewerr, setInterviwerr] = useState("")
    const [candidate, setCandidate] = useState("")
    console.log(info)
    console.log(isInterviewer)

    useSocket({
        role: isInterviewer,
        roomCode: info.code,
        name: `${info.firstName} ${info.lastName}`,
        onPeerJoined: (peerInfo) => {
          setPeer(peerInfo);
        },
        onSessionStart: ({ interviewer, candidate }) => {
            setInterviwerr(interviewer);
            setCandidate(candidate);
          console.log(`Session started with: ${interviewer} and ${candidate}`);
        },
        onCandidateData: (data) => {
          console.log('Received candidate process data:', data);
        }
      });
return (
        <div>
          <div>Room Code: {info.code}</div>
          <div>You are: {isInterviewer ? interviewerr : candidate}</div>
          <div>
            Peer: {peer ? isInterviewer ? interviewerr : candidate : "Waiting for other user..."}
          </div>
        </div>
      );
  
}

export default Room