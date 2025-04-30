import React, { useEffect } from 'react'
import { useState } from 'react'


const Popup = ({show} : {show: boolean}) => {
    
    const [display, setDisplay] = useState<boolean>(false)

    useEffect(() => {
        if (show) {
            setDisplay(true);
            setTimeout(() => {
              setDisplay(false);
            }, 5000);
        }
    })
    
  return (
    <>
    {display && 
        <div className='bg-white text-black'>
            <h1>Hello Mir</h1>
        </div>
    }
    
    </>
  )
}

export default Popup