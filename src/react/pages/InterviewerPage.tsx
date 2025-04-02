import React, { useState } from 'react';
import { useSocket } from '../../hooks/useSocket';
import SignUpForm from '../../components/SignUpForm';

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
  const [interviewee, setInterviewee] = useState<string | undefined>("");
  const [data, setData] = useState<any>(null);
  


  const socket = useSocket(
    {
      role: 'interviewer',
      roomCode: interviewer.code,
      name: `${interviewer.firstName} ${interviewer.lastName}`,
      onSessionStart: ({ interviewer, candidate }) => {
        setInterviewee(candidate)
        console.log(`Session started with: ${interviewer} and ${candidate}`);
      },
      onCandidateData: (data) => {
        setData(data);
        console.log('Received candidate process data:', data);
      }
    },
    isSessionStarted
  );

  return (
    <div>
      { !isSessionStarted ?
      <SignUpForm
        isInterviewer={true}
        page="Interviewee Page"
        setData={setInterviewer}
        onSubmit={() => setIsSessionStarted(true)}
      /> 
      :
      !interviewee ? <div> loading </div> :
        <div>{interviewee}</div>
      }

    </div>
  );
};

export default IntervieweePage;
