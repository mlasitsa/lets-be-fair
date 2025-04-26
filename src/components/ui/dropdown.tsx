import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'

interface LanguageModel {
    language: string,
    value: string
}
interface DropDownProps {
    name: string,
    options: LanguageModel[]
}

const Dropdown = ({name = 'Options', options}: DropDownProps) => {
    const [language, setLanguage] = useState<string>('')


    const setValue = (item: string) => {
        setLanguage(item)
    }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50">
          {language ? language : name}
          <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
        </MenuButton>
      </div>

      <MenuItems
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
        <div className="py-1">
          {options.map((item) => (
            <MenuItem>
        <div className={
        `block px-4 py-2 text-sm hover:bg-gray-200 ${item.language === language ? 'text-blue-700 font-bold': 'text-gray-700'}`}
            onClick={() => setValue(item.language)}>
            {item.language}
          </div>
          </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  )
}

export default Dropdown
