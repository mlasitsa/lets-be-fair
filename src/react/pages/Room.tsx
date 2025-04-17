import React from 'react'
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useSocket } from '../../hooks/useSocket';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRole } from '../../context/contextState';
import { useRef } from 'react';

// Okay so here I think I need to get rid of useLocation and this of another way I can pass data, probably should be able
// to extract this data from our server since we already have it there -> so I would need to make some changes to my hook
// But I think I will still have to pass somehow, interviewer or interviewee, maybe I can just do it through query ???
// If so, then how can I protect it from a random person to do this ??? -> in the future I guess I can use auth for this
// and handle it there ??? Might need to do some research, I think what I can also do is to add isInterviewer var to my
// server in the socket, so we can also just get it from our server too and display everything properly ???
// I think I will do it this way
// Remove context, not proper use her for contex -> send isInterviewer param to the server

interface Candidates {
  interviewer: {name: string}
  candidate: {name: string, apps: any}
}

const Room = () => {

    const { roomCode } = useParams()
    // const { isInterviewer } = useRole();
    const code = roomCode ? roomCode : "None"
    const [data, setData] = useState<any>(null);
    const navigate = useNavigate()

    const goBack = () => {
      if (data?.interviewer?.isInterviewer) {
        navigate('/interviewer')
      } else {
        navigate('/interviewee')
      }
    }

    useSocket({
        roomCode: code,
        setData: setData
      })
   
    

    useEffect(() => {
      console.log('Data updated:', data);
    }, [data]);

return (
        <div className='bg-[#C0D8DD]'>
          <div>Room Code: {roomCode}</div>
          {data?.interviewer?.isInterviewer ? (
            <>
              <div>Interviewer Page</div>
              <div>
                Candidate is: {data?.candidate?.name ?? "Waiting for candidate to join..."}
              </div>
            </>
          ) : (
            <>
              <div>Interviewee Page</div>
              <div>
                Your interviewer is: {data?.interviewer?.name ?? "Waiting for interviewer..."}
              </div>
            </>
          )}



          <h1>If you think you have joined wrong session, you can always go back to previous form, to change your code</h1>
          <button onClick={goBack}>Back to Form</button>
        </div>
      );
  
}

export default Room