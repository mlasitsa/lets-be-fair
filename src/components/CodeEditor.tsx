import React, { useEffect, useState } from 'react';
import { Editor, loader } from '@monaco-editor/react';
import Dropdown from './ui/dropdown';
import languages from '../utils/languages';
import { Button } from '@headlessui/react';
import useBroadcast from '../hooks/useBroadcast';

// Configure Monaco to load locally for Electron
loader.config({
  paths: { vs: `file:///D:/GitHubPersonal/lets-be-fair/dist-react/monaco/vs` }
});

const CodeEditor = ({ roomId }: { roomId: any }) => {
  const [value, setValue] = useState<string>(`def helloWorld():\n\treturn "Hello World"\nhelloWorld()`);

  window.console.log('Editor loaded and roomId is', roomId);

  useBroadcast({
    roomCode: roomId,
    setCode: setValue,  
    value: value        
  });

  useEffect(() => {
    console.log('CLIENT GOT VALUE', value)
  }, [value])
  

  const handleEditorChange = (val: string | undefined) => {
    if (val !== undefined) {
      setValue(val);  
    }
  };

  return (
    <div className="flex flex-col bg-[#1E1E1E] mx-auto shrink">
      <div className="flex flex-row justify-start m-3 gap-5">
        <Dropdown name="Languages" options={languages} setValue={setValue} />
        <Button className="inline-flex items-center rounded-md bg-green-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10">
          Submit
        </Button>
      </div>
      <Editor
        width="150vh"
        height="90vh"
        defaultLanguage="python"
        theme="vs-dark"
        value={value}  // Always showing value
        onChange={handleEditorChange}
      />
    </div>
  );
};

export default CodeEditor;
