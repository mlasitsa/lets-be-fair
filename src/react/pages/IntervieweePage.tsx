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
    const [error, setError] = useState<boolean>(false)


    console.log(interviewee)
      
  return (
    <div>
        <SignUpForm 
            isInterviewer={false}
            page="Interviewee Page"
            setData={setInterviewee}
            code={interviewee.code}
            info={interviewee}
            setError={setError}
        />
        {error && <span>There is no active room with this code, please check with your interviewer</span>}
    </div>
  )
}

export default IntervieweePage