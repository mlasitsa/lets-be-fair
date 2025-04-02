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
  const [interviewee, setInterviewee] = useState<string | undefined>("");
  const [candidateData, setCandidateData] = useState<any>(null);
  


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
        setCandidateData(data);
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
        page="Interviewer Page"
        setData={setInterviewer}
        onSubmit={() => setIsSessionStarted(true)}
      /> 
      :
      !interviewee ? 

      <div> loading </div> 
      :
        <Participants isInterviewer={true} candidateName={interviewee} candidateData={candidateData} interviewerName={`${interviewer.firstName} ${interviewer.lastName}`}/>
      }

    </div>
  );
};

export default IntervieweePage;
