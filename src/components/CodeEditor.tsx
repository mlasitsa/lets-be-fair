import React from 'react'
import { Editor } from '@monaco-editor/react'
import Dropdown from './ui/dropdown'
import languages from '../utils/languages'
import { useState, useEffect } from 'react'
import { Button } from '@headlessui/react'

const CodeEditor = () => {

  const [value, setValue] = useState<string>(`def helloWorld():\n\treturn "Hello World"\nhelloWorld()`)

  // useEffect(() => {
  //   console.log(value)
  // },[value])

  const printValue = (val:string | undefined) => {
    console.log(val)

    if (val) {
      setValue(val)
    }
  }

  return (
    <div className=' flex flex-col bg-[#1E1E1E] mx-auto shrink'>
      <div className='flex flex-row justify-start m-3 gap-5'>
        <Dropdown name={'Languages'} options={languages} setValue={setValue}/>
        <Button className='inline-flex items-center rounded-md bg-green-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700'>Submit</Button>
      </div>
        <Editor 
        width='150vh'
        height="90vh"
        defaultLanguage='python'
        theme='vs-dark'
        value={value}
        onChange={(value) => printValue(value)}
        />
        
    </div>
  )
}

export default CodeEditor