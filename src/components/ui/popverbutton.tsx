import React, { use } from 'react'
import { useState, useEffect } from 'react'

interface popverProps {
    text: string,
    data: any
}

const Popverbutton = ({text, data = "Nothing to show"} : popverProps) => {

    const [show, setShow] = useState<boolean>(false)


  return (
    <div className='relative inline-block'>
    <button data-ripple-light="true" data-popover-target="popover" onClick={() => setShow((prev) => !prev)}
        className="select-none rounded-lg bg-gray-900 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20">
        {text}
    </button>
    
    {show && <div data-popover="popover"
        className="absolute left-1/2 transform -translate-x-1/2 mt-2 p-4 z-50 font-sans text-sm font-normal whitespace-normal bg-white border rounded-lg shadow-lg w-max border-blue-gray-50 text-blue-gray-500 shadow-blue-gray-500/10 focus:outline-none">
        {Array.isArray(data) 
            ? data.map((item: any, index: number) => <div key={index}>{item}</div>) 
            : data}
    </div> }
    </div>
  )
}

export default Popverbutton


