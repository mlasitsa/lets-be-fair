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