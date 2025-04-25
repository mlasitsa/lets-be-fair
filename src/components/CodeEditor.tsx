import React from 'react'
import { Editor } from '@monaco-editor/react'

const CodeEditor = () => {
  return (
    <div>

        <Editor 
        width={900}
        height={700}
        defaultLanguage='python'/>


    </div>
  )
}

export default CodeEditor