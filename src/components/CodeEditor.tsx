import React from 'react'
import { Editor } from '@monaco-editor/react'
import Dropdown from './ui/dropdown'
import languages from '../utils/languages'

const CodeEditor = () => {
  return (
    <div className=' flex flex-col bg-[#1E1E1E] mx-auto shrink'>
      <div className='flex flex-row justify-start m-3 gap-5'>
        <Dropdown name={'Languages'} options={languages}/>
      </div>
        <Editor 
        width='150vh'
        height="90vh"
        defaultLanguage='python'
        theme='vs-dark'
        value={`def helloWorld():\n\treturn "Hello World"\nhelloWorld()`}
        />
        
    </div>
  )
}

export default CodeEditor