import React from 'react'
import SignUpForm from '../../components/SignUpForm'

const InterviewerPage = () => {
  return (
    <div>
        <SignUpForm isInterviewer={true} page='Interviewer Page'/>
    </div>
  )
}

export default InterviewerPage