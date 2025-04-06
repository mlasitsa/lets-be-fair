import React from 'react'
import Form from '../../components/Form'

const StartPage = () => {
  return (
    <>
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='text-3xl font-bold mb-4'>Welcome to the Interview App</h1>
      <p className='text-lg mb-8'>Please select your role:</p>
    <Form />
    </div> 
    </>
  )
}

export default StartPage