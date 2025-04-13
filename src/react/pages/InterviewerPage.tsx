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

  return (
    <div>
      <SignUpForm
        isInterviewer={true}
        page="Interviewer Page"
        setData={setInterviewer}
        code={interviewer.code}
        info={interviewer}
      /> 
    </div>
  );
};

export default IntervieweePage;
