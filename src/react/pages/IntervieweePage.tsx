import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSocket } from '../../hooks/useSocket'
import SignUpForm from '../../components/SignUpForm'
import Participants from '../../components/Participants'

interface IntervieweeData {
    firstName: string;
    lastName: string;
    code: string;
  }

const IntervieweePage = () => {

    const [interviewee, setInterviewee] = useState<IntervieweeData>({
        firstName: "",
        lastName: "",
        code: ""
    })

    const [isSessionStarted, setIsSessionStarted] = useState(false);
    const [interviewerName, setInterviewerName] = useState<string>("");
     

    const socket = useSocket({
        role: 'interviewee',
        roomCode: interviewee.code, 
        name: `${interviewee.firstName} ${interviewee.lastName}`,
        onSessionStart: ({ interviewer, candidate }) => {
          setInterviewerName(interviewer)
          console.log(`Session started with: ${interviewer} and ${candidate}`);
        },
        onCandidateData: (data) => {
          console.log("Received candidate process data:", data);
        }
      }, isSessionStarted);

      
  return (
    <div>
      { !isSessionStarted ?
        <SignUpForm 
            isInterviewer={false}
            page="Interviewee Page"
            setData={setInterviewee}
            onSubmit={() => setIsSessionStarted(true)}
        />
        :
      !interviewee ? 

      <div> loading </div> 
      :
        <Participants isInterviewer={false} candidateName={`${interviewee.firstName} ${interviewee.lastName}`} candidateData={""} interviewerName={interviewerName}/>
      }
    </div>
  )
}

export default IntervieweePage