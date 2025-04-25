import React from 'react'

const List = ({text}: {text: string}) => {
  return (
    <li className="text-body-color dark:text-dark-6 flex text-base">
      <span className="bg-black mr-2 mt-2 flex h-2 w-full max-w-[8px] items-center justify-center rounded-full text-base"></span>
      {text}
    </li>
  )
}

export default List