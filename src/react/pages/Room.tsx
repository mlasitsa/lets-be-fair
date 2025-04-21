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
  interviewer: {socketId: string, name: string, role:string}
  candidate: {socketId: string, name: string, role:string, applications: ProcessSnapshot}
}

type ProcessSnapshot = Record<string, [string, number]>;

const Room = () => {

    const { roomCode } = useParams()
    // const { isInterviewer: roleMode } = useRole();
    const code = roomCode ? roomCode : "None"
    const [data, setData] = useState<Candidates | null>(null);
    const [isInterviewer, setIsInterviewer] = useState<boolean | null>(null)
    const navigate = useNavigate()
    const [processes, setProcesses] = useState<ProcessSnapshot>({});

    // useEffect(() => {
    //   const ipc = window.require('electron').ipcRenderer;

    //   ipc.on('process-data', (_event:any, processes: any) => {
    //     setProcesses(processes); 
    //   });

    //   return () => ipc.removeAllListeners('process-data');
    // }, []);


    useSocket({
        roomCode: code,
        setData: setData,
        setIsInterviewer: setIsInterviewer
      })
   
    

    useEffect(() => {
      console.log('Data updated:', data);
      console.log("Is Interviewer", isInterviewer)
    }, [data]);


return (
        <div className='bg-[#C0D8DD]'>

          <div>Room Code: {roomCode}</div>
              <div className='font-bold'>
                Interviewer is: {data?.interviewer?.name ?? "Waiting for interviewer..."}
              </div>
              <div className='font-bold'>
                Candidate is: {data?.candidate?.name ?? "Waiting for candidate to join..."}
              </div>

              {data?.candidate.applications ? 
              
              Object.entries(data.candidate.applications).map(([name, [label, count]]) => (
                <div key={name}>
                  {label} | Running: {count}
                </div>
              ))
              
              : <h1>Waiting for data to load...</h1>}
              

        </div>
      );
  
}

export default Room