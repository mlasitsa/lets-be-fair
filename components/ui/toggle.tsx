import React from 'react'

const Toggle = ({buttonName} : {buttonName: string}) => {
  return (
    <>
    <label className='gap-x-6'> 
        <input type="radio" name={buttonName} value="option1"></input>
        {buttonName}
    </label>
    </>
  )
}

export default Toggle