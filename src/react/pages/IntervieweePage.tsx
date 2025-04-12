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


    console.log(interviewee)
      
  return (
    <div>
        <SignUpForm 
            isInterviewer={false}
            page="Interviewee Page"
            setData={setInterviewee}
            code={interviewee.code}
            info={interviewee}
        />
    </div>
  )
}

export default IntervieweePage