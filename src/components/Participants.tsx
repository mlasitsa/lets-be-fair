import React from 'react'
import { useState } from 'react'


const Participants = (
    {
        isInterviewer, 
        candidateName ,
        candidateData,
        interviewerName

    } : 
    {
        isInterviewer: boolean, 
        candidateName: string | "",
        candidateData: any | "",
        interviewerName: string
    
    }) => {

    return (
        <div>
          {isInterviewer ? (
            <div>
              <div>{candidateName}</div>
              <ul>
                {candidateData?.map((item: any, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          ) : (
            <div>{interviewerName}</div>
          )}
        </div>
      );
    }
      

export default Participants