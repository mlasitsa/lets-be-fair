import React, { useState } from 'react';
import { useSocket } from '../../hooks/useSocket';
import SignUpForm from '../../components/SignUpForm';
import Participants from '../../components/Participants';

interface InterviewerData {
  firstName: string;
  lastName: string;
  code: string;              
}

const IntervieweePage = () => {
  const [interviewer, setInterviewer] = useState<InterviewerData>({
    firstName: '',
    lastName: '',
    code: '',
  });

  const [isSessionStarted, setIsSessionStarted] = useState(false);
  const [isInterviewer, setIsInterviewer] = useState(true);
  

  return (
    <div>
      <SignUpForm
        isInterviewer={isInterviewer}
        page="Interviewer Page"
        setData={setInterviewer}
        code={interviewer.code}
        info={interviewer}
      /> 
    </div>
  );
};

export default IntervieweePage;
