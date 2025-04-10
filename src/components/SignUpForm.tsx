import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { z } from "zod";
import { useForm } from 'react-hook-form';

const ipcRenderer = window.require?.('electron')?.ipcRenderer;
interface CandidateData {
  firstName: string;
  lastName: string;
  code: string;
}

const User = z.object({
  firstName: z.string().regex(/^[A-Za-z\s\-]+$/).min(1),
  lastName: z.string().regex(/^[A-Za-z\s\-]+$/).min(1),
  code: z.string().length(4)
});

type userData = z.infer<typeof User>

type SignUpFormProps = {
  isInterviewer: boolean;
  page: string;
  setData: React.Dispatch<React.SetStateAction<CandidateData>>;
  code: number | string;
  info?: any;
};

const SignUpForm = ({ isInterviewer, page, setData, code, info }: SignUpFormProps) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const navigate = useNavigate(); 

  const onSubmit = (data: userData) => {

    setData(data)
    if (!isInterviewer && ipcRenderer) {
        ipcRenderer.send("start-python", "interviewee");
      }
    
    if (isInterviewer) {
      navigate(`/room/${code}`, {
        state: {
          info: info,
          isInterviewer: isInterviewer,
        }
      }); 
    } else {
      navigate(`/room/${code}`, {
        state: {
          info: info,
          isInterviewer: isInterviewer,
        }
      })
    }
    
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#C0D8DD]">
      <h1 className="text-3xl font-semibold text-white mb-6">{isInterviewer ? "Interviewer Page" : "Interviewee Page"}</h1>
      <form
        className="bg-[#0A9BBC] max-w-md w-full rounded-xl p-6 shadow-md space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label htmlFor="first-name" className="block text-white font-semibold mb-1">
            First Name
          </label>
          <input
            {...register("firstName",
              {required: true })}
            type="text"
            placeholder="Enter your first name"
            className="w-full rounded-md px-4 py-2 bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="last-name" className="block text-white font-semibold mb-1">
            Last Name
          </label>
          <input
            type="text"
            id="last-name"
            name="last-name"
            placeholder="Enter your last name"
            className="w-full rounded-md px-4 py-2 bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setData((prev) => ({ ...prev, lastName: e.target.value }))}
          />
        </div>

        <div>
        <label htmlFor="roomCode" className="block text-white font-semibold mb-1">
            {isInterviewer ? "Generate 4-Digit Code" : "Enter 4-Digit Code"}
        </label>
            <input
            type="text"
            id="roomCode"
            name="roomCode"
            placeholder={isInterviewer ? "1234" : "Enter the code"}
            className="w-full rounded-md px-4 py-2 bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setData((prev) => ({ ...prev, code: e.target.value }))}
        />
        </div>


        <button
          type="submit"
          className="w-full bg-lime-500 text-white font-semibold py-2 rounded-md hover:bg-lime-600 transition"
        >
          Start Session
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;