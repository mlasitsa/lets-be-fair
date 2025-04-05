import React from 'react'
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useSocket } from '../../hooks/useSocket';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';



const Room = () => {

    const location = useLocation();
    const {info, isInterviewer } = location.state;
    const [data, setData] = useState<{ interviewer: string, interviewee: string } | null>(null);
    console.log(info)
    console.log(isInterviewer)
    const navigate = useNavigate()

    const goBack = () => {
      if (isInterviewer) {
        navigate('/interviewer')
      } else {
        navigate('/interviewee')
      }
    }

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
        <div className='bg-[#C0D8DD]'>
          <div>Room Code: {info.code}</div>
          {isInterviewer ?
          <>
          <div>Interviewer Page</div>
          <div>Candidate is: {data ? data.interviewee : "Waiting for candidate jo join..." }</div>
          </>
          :
          
          <>
          <div>Interviewee Page</div>
          <div> Your interviewer is: {data ? data.interviewer : "Waiting for interviewer to join..." }</div>
          </>
          }


          <h1>If you think you have joined wrong session, you can always go back to previous form, to change your code</h1>
          <button onClick={goBack}>Back to Form</button>
        </div>
      );
  
}

export default Room