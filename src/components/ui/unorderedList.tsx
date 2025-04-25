import React from 'react'
import List from './list'


interface Data {
    description: string,
    constraints: string[]
}


const UnorderedList = ({description, constraints} : Data) => {
  return (
    <div className="w-full">
        <p className='font-bold'>{description}</p>
      <ul className="space-y-3">
        {
            constraints.map((constraint) => (
                <List text={constraint} />
            ))
        }
      </ul>
    </div>
  )
}

export default UnorderedList;