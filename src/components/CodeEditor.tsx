import React, { useState } from 'react';
import { Editor, loader } from '@monaco-editor/react';
import Dropdown from './ui/dropdown';
import languages from '../utils/languages';
import { Button } from '@headlessui/react';

// Configure Monaco to load locally for Electron
loader.config({
  paths: { vs: `file:///D:/GitHubPersonal/lets-be-fair/dist-react/monaco/vs` }
});

const CodeEditor = () => {
  const [value, setValue] = useState<string>(`def helloWorld():\n\treturn "Hello World"\nhelloWorld()`);

  const printValue = (val: string | undefined) => {
    if (val) {
      setValue(val);
    }
  };

  return (
    <div className='flex flex-col bg-[#1E1E1E] mx-auto shrink'>
      <div className='flex flex-row justify-start m-3 gap-5'>
        <Dropdown name={'Languages'} options={languages} setValue={setValue} />
        <Button className='inline-flex items-center rounded-md bg-green-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10'>
          Submit
        </Button>
      </div>
      <Editor
        width='150vh'
        height='90vh'
        defaultLanguage='python'
        theme='vs-dark'
        value={value}
        onChange={(value) => printValue(value)}
      />
    </div>
  );
};

export default CodeEditor;
