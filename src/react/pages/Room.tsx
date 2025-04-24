import React from 'react'
import { useParams } from 'react-router-dom';
import { useSocket } from '../../hooks/useSocket';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MonacoEditor from 'react-monaco-editor';
// import { useRole } from '../../context/contextState';
// import { useRef } from 'react';

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

              <div className='flex justify-center m-10'>
              <MonacoEditor 
              width={600}
              height={800}
              theme={'vs-dark'}
              language="python"
              options={{
                lineNumbers: 'on',
                lineNumbersMinChars: 3,
              }}/>
              </div>
              

        </div>
      );
  
}

export default Room