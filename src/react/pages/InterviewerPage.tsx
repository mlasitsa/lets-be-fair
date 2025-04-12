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

  const [isSessionStarted, setIsSessionStarted] = useState<boolean>(false);
  const [isInterviewer, setIsInterviewer] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false)

  return (
    <div>
      <SignUpForm
        isInterviewer={isInterviewer}
        page="Interviewer Page"
        setData={setInterviewer}
        code={interviewer.code}
        info={interviewer}
        setError={setError}
      /> 
      {error && <span>This code is already exist, please create a different code</span>}
    </div>
  );
};

export default IntervieweePage;
