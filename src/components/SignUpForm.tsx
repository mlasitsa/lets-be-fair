import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import validateRoom from '../hooks/validateRoomSocket';
import { useRole } from '../context/contextState';

declare global {
  interface Window {
    electronAPI: {
      startPython: (role: string, roomCode: string) => void;
    };
  }
}

interface CandidateData {
  firstName: string;
  lastName: string;
  code: string;
}

const UserSchema = z.object({
  firstName: z.string().regex(/^[A-Za-z\s\-]+$/).min(1),
  lastName : z.string().regex(/^[A-Za-z\s\-]+$/).min(1),
  code     : z.string().length(4)
});

type UserData = z.infer<typeof UserSchema>;

type SignUpFormProps = {
  isInterviewer: boolean;
  page: string;
  setData: React.Dispatch<React.SetStateAction<CandidateData>>;
  code: string;
  info?: unknown;
};

const SignUpForm = ({
  isInterviewer,
  page,
  setData,
  code,
  info
}: SignUpFormProps) => {

  const [error, setError] = useState<boolean>(true);
  const { setIsInterviewer } = useRole();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<UserData>({
    mode: 'onChange',
    resolver: zodResolver(UserSchema)
  });

  const navigate = useNavigate();

  const onSubmit = (data: UserData) => {
    validateRoom({
      code: data.code,
      isInterviewer,
      name: `${data.firstName} ${data.lastName}`,
      setRoomExist: setError,
      onSuccess: () => {
        setData(data);
        console.log('Data from useForm Hooks', data);

        // Look into this 
        if (!isInterviewer && window.electronAPI) {
          window.electronAPI.startPython('interviewee', data.code);
        }

        if (isInterviewer) {
          setIsInterviewer(true);
          navigate(`/room/${data.code}`);
        } else {
          setIsInterviewer(false);
          navigate(`/room/${data.code}`);
        }
      }
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#C0D8DD]">
      <h1 className="text-3xl font-semibold text-white mb-6">
        {isInterviewer ? 'Interviewer Page' : 'Interviewee Page'}
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-[#0A9BBC] max-w-md w-full rounded-xl p-6 shadow-md space-y-4"
      >
        {/* First name */}
        <div>
          <label className="block text-white font-semibold mb-1">First Name</label>
          <input
            {...register('firstName', { required: true })}
            type="text"
            placeholder="Enter your first name"
            className="w-full rounded-md px-4 py-2 bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Last name */}
        <div>
          <label className="block text-white font-semibold mb-1">Last Name</label>
          <input
            {...register('lastName', { required: true })}
            type="text"
            placeholder="Enter your last name"
            className="w-full rounded-md px-4 py-2 bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Room code */}
        <div>
          <label className="block text-white font-semibold mb-1">
            {isInterviewer ? 'Generate 4-Digit Code' : 'Enter 4-Digit Code'}
          </label>
          <input
            {...register('code', { required: true })}
            type="text"
            placeholder={isInterviewer ? '1234' : 'Enter the code'}
            className="w-full rounded-md px-4 py-2 bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-lime-500 text-white font-semibold py-2 rounded-md hover:bg-lime-600 transition"
        >
          Start Session
        </button>

        {/* Validation & room errors */}
        <div className="flex flex-col mx-auto text-center text-white font-bold">
          {errors.firstName && <span>First name required (letters only)</span>}
          {errors.lastName && <span>Last name required (letters only)</span>}
          {errors.code && <span>Code must be 4 numeric digits</span>}

          {isInterviewer ? (
            !error && <span>Code already exists—choose another</span>
          ) : (
            !error && (
              <span>No active room with this code—check with interviewer</span>
            )
          )}
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
