// import React from 'react'

const Toggle = ({buttonName, description} : {buttonName: string, description?: string}) => {
  return (
    <>
    <div>
      <label
        htmlFor={buttonName}
        className="flex items-center justify-between gap-4 rounded border border-gray-300 bg-white p-3 text-sm font-medium shadow-sm transition-colors hover:bg-gray-50 has-checked:border-blue-600 has-checked:ring-1 has-checked:ring-blue-600"
      >
        <div>
          <p className="text-gray-900">{buttonName}</p>
          <p className="text-gray-700">{description? description : ""}</p>
        </div>

        <input
          type="radio"
          name={buttonName}
          value={buttonName}
          id={buttonName}
          className="size-5 border-gray-300"
          checked
        />
      </label>
    </div>
    </>
  )
}

export default Toggle