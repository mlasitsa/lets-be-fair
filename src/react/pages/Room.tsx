import React from 'react'
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useSocket } from '../../hooks/useSocket';
import { useState } from 'react';
import { useEffect } from 'react';



const Room = () => {

    const location = useLocation();
    const {info, isInterviewer } = location.state;
    const [data, setData] = useState<{ interviewer: string, interviewee: string } | null>(null);
    console.log(info)
    console.log(isInterviewer)

    useEffect(() => {
      console.log('Data updated:', data);
    }, [data]);

    useSocket({
        role: isInterviewer,
        roomCode: info.code,
        name: `${info.firstName} ${info.lastName}`,
        setData: setData,
        // onPeerJoined: (peerInfo) => {
        //   setPeer(peerInfo);
        // },
        // onSessionStart: ({ interviewer, candidate }) => {
        //     setInterviwerr(interviewer);
        //     setCandidate(candidate);
        //   console.log(`Session started with: ${interviewer} and ${candidate}`);
        // },
        // onCandidateData: (data) => {
        //   console.log('Received candidate process data:', data);
        // }
      });
return (
        <div>
          <div>Room Code: {info.code}</div>
          <div>{data ? isInterviewer ? data?.interviewee : data?.interviewer : "No Data" }</div>
          {/* <div>You are: {isInterviewer ? data : }</div> */}
          <div>
            {/* Peer: {peer ? isInterviewer ? interviewerr : candidate : "Waiting for other user..."} */}
          </div>
        </div>
      );
  
}

export default Room