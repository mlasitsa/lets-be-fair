import React from 'react'
import Toggle from './ui/toggle'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Form = () => {

  const [value, setValue] = useState('')
  const [link, setLink] = useState('')
  const navigate = useNavigate()


  const submitForm = (e: React.FormEvent) => {
    e.preventDefault()
    const role = value.toLowerCase();

    if (role === 'interviewer') {
      navigate('/interviewer')
    } else if (role === 'interviewee') {
      navigate('/interviewee')
    }
    console.log(role)
  }
  /*
  I think here I will need to add onsubmit that will send to 2 Different pages that will have another Form to fill out
  One will be for interviewer, another for interviewee
  Once the interviewer entres info and generates code -> we need to estable WebSocket connection and wait for the interviewee to enter the code
  Once interviewee joined and connectiong is active, we need to start kicking off python script that checks for the applications that are running 
  and if any external tools are used (bluetooth headset/extrnal monitor/ etc)
  */

  return (
    <div>
        <form className='flex flex-col gap-4 items-center justify-center' onSubmit={submitForm} >
            <Toggle buttonName='Interviewer' onRoleChange={setValue} selectedRole={value} description='Use this if you are running an interview'/>
            <Toggle buttonName='Interviewee' onRoleChange={setValue} selectedRole={value} description='Use this if you are taking an interview'/>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' type='submit'>Submit</button>
        </form>
    </div>
  )
}

export default Form