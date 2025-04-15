import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { z } from "zod";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {io, Socket} from 'socket.io-client'
import validateRoom from '../hooks/validateRoomSocket';
import { useRole } from '../context/contextState';


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
  code: string;
  info?: any;
};

const SignUpForm = ({ isInterviewer, page, setData, code, info}: SignUpFormProps) => {

  const [error, setError] = useState<boolean>(true)
  const { setIsInterviewer } = useRole();

  const { register, handleSubmit, watch, formState: { errors } } = useForm<userData>({
    mode: "onChange",
    resolver: zodResolver(User)
  });

  const navigate = useNavigate(); 

  const onSubmit = (data: userData) => {
    validateRoom({
      code: data.code,
      isInterviewer, 
      name: `${data.firstName} ${data.lastName}`,
      setRoomExist: setError,
      onSuccess: () => {
        setData(data)
        console.log("Data from useForm Hooks", data)

    if (!isInterviewer && ipcRenderer) {
        ipcRenderer.send("start-python", "interviewee");
      }
    
    if (isInterviewer) {
      setIsInterviewer(true)
      navigate(`/room/${data.code}`); 
    } else {
      setIsInterviewer(false)
      navigate(`/room/${data.code}`)
    }
      }
    })   
    
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
              {required: true 
              })}
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
            {...register("lastName", {
              required: true
            })}
            type="text"
            placeholder="Enter your last name"
            className="w-full rounded-md px-4 py-2 bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
        <label htmlFor="roomCode" className="block text-white font-semibold mb-1">
            {isInterviewer ? "Generate 4-Digit Code" : "Enter 4-Digit Code"}
        </label>
            <input
            {...register("code", {
              required: true
            })}
            type="text"
            placeholder={isInterviewer ? "1234" : "Enter the code"}
            className="w-full rounded-md px-4 py-2 bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        </div>


        <button
          type="submit"
          className="w-full bg-lime-500 text-white font-semibold py-2 rounded-md hover:bg-lime-600 transition"
        >
          Start Session
        </button>

        <div className='flex flex-col mx-auto text-center text-white font-bold'>
          {errors.firstName && <span>This field is required and must contain only characters</span>}
          {errors.lastName && <span>Last name is required and must contain only charaters</span>}
          {errors.code && <span>Code must contain numbers only and have 4 digit code</span>}
          {isInterviewer ? 
          (!error && <span>
            This code is already exist, please create a different code
          </span>)
          :
          ( !error &&
          <span>
            There is no active room with this code, please check with your interviewer
          </span>
          )}
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;