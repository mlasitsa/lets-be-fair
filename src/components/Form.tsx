//import React from 'react'
import Toggle from './ui/toggle'

const Form = () => {
  return (
    <div>
        <form className='flex flex-col gap-4 items-center justify-center'>
            <Toggle buttonName='Interviewer'/>
            <Toggle buttonName='Interviewee'/>
        </form>
    </div>
  )
}

export default Form