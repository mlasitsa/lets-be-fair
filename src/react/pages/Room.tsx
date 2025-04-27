import React from 'react'
import { useParams } from 'react-router-dom';
import { useSocket } from '../../hooks/useSocket';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MonacoEditor from 'react-monaco-editor';
import CodeEditor from '../../components/CodeEditor';
import CodeCard from '../../components/CodeCard';
import Popverbutton from '../../components/ui/popverbutton';
import Dropdown from '../../components/ui/dropdown';
// import { useRole } from '../../context/contextState';
// import { useRef } from 'react';

interface Candidates {
  interviewer: {socketId: string, name: string, role:string}
  candidate: {socketId: string, name: string, role:string, applications: ProcessSnapshot}
}

type ProcessSnapshot = Record<string, [string, number]>;

const Room = () => {
    const examples = [{
      num: 1,
      input: '1, 2, 3, 4',
      output: '3'
    },
    {
      num: 2,
      input: '1, 3, 4',
      output: '10'
    },
    {
      num: 3,
      input: '1, 3, 3, 4',
      output: '5'
    }
  ]
    const { roomCode } = useParams()
    // const { isInterviewer: roleMode } = useRole();
    const code = roomCode ? roomCode : "None"
    const [data, setData] = useState<Candidates | null>(null);
    const [isInterviewer, setIsInterviewer] = useState<boolean | null>(null)
    const navigate = useNavigate()
    const [processes, setProcesses] = useState<ProcessSnapshot>({});
    const [newProcesses, setNewProcesses] = useState<string[]>([])

    useSocket({
        roomCode: code,
        setData: setData,
        setIsInterviewer: setIsInterviewer
      })
   
    

    useEffect(() => {
      console.log('Data updated:', data);
      console.log("Is Interviewer", isInterviewer)
    }, [data]);

    useEffect(() => {
      if (data?.candidate.applications) {
        const labels = Object.entries(data.candidate.applications).map(([name, [label, count]]) => label);
        setNewProcesses((prev) => [...prev, ...labels]);
      }
    }, [data?.candidate.applications]);
    
    

return (
        <div className='bg-[#C0D8DD]'>

          <div className='flex flex-row justify-between mx-40'>
            <div className='flex flex-col items-start'>
              <div><span className='font-bold'>Room Code:</span> {roomCode}</div>
              <div>
                <span className='font-bold'>Interviewer is:</span> {data?.interviewer?.name ?? "Waiting for interviewer..."}
              </div>
              <div>
                <span className='font-bold'>Candidate is:</span> {data?.candidate?.name ?? "Waiting for candidate to join..."}
              </div>
            </div>

            <div className='flex flex-row gap-10'>
              <Popverbutton 
              text="Proccesses"
              data={newProcesses} />
              <Popverbutton 
              text="Connectors"
              data={"No Data"} />
              <Popverbutton 
              text="AI Notes"
              data={"bla bla bla, he is valid guy I think he is handsome"} />
            </div>
          </div>
        

             {/* {data?.candidate.applications ? 
              
              Object.entries(data.candidate.applications).map(([name, [label, count]]) => (
                <div key={name}>
                  {label} | Running: {count}
                </div>
              ))
              
              : <h1>Waiting for data to load...</h1>} */}

              <div className='flex flex-row justify-center mt-10 gap-5'>
                <CodeCard 
                  CardTitle='House Robber II' 
                  CardDescription='Given number of that, please provide this that and that fgfdgdf gssdsfsd fsdfsdfsd ffsdfsfs dssdv gsdf, sfsdf '
                  CardConstraints={["array wont be empty", "num will exist"]}
                  CardExamples={examples}/>
                <CodeEditor roomId={code}/>
                {/*Make a pop up display here on submit that can be closed, shold be like a layover everything*/}
              </div>
              

        </div>
      );
  
}

export default Room