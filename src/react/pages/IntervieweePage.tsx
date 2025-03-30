import React from 'react'
import SignUpForm from '../../components/SignUpForm'

const IntervieweePage = () => {
  return (
    <div>
        <SignUpForm isInterviewer={false} page='Interviewee Page' />
    </div>
  )
}

export default IntervieweePage