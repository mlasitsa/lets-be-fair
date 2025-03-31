import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSocket } from '../../hooks/useSocket'
import SignUpForm from '../../components/SignUpForm'

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

    const socket = useSocket({
        role: 'interviewee',
        roomCode: interviewee.code, 
        name: `${interviewee.firstName} ${interviewee.lastName}`,
        onSessionStart: ({ interviewer, candidate }) => {
          console.log(`Session started with: ${interviewer} and ${candidate}`);
        },
        onCandidateData: (data) => {
          console.log("Received candidate process data:", data);
        }
      }, isSessionStarted);

      
  return (
    <div>
        <SignUpForm 
            isInterviewer={false}
            page="Interviewer Page"
            setData={setInterviewee}
            onSubmit={() => setIsSessionStarted(true)}
        />
    </div>
  )
}

export default IntervieweePage