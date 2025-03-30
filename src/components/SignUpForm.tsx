import React from 'react'

type SignUpFormProps = {
    isInterviewer: boolean,
    page: string
}

const SignUpForm = ({isInterviewer, page} : SignUpFormProps) => {

    /*
    here it should recieve a prop if its interviwer of interviewee
    */

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#C0D8DD]">
        <h1 className="text-3xl font-semibold text-white mb-6">{page}</h1>
        <form className="bg-[#0A9BBC] max-w-md w-full rounded-xl p-6 shadow-md space-y-4">
        <div>
        <label htmlFor="first-name" className="block text-white font-semibold mb-1">First Name</label>
        <input
            type="text"
            id="first-name"
            name="first-name"
            placeholder="Enter your first name"
            className="w-full rounded-md px-4 py-2 bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        </div>

        <div>
        <label htmlFor="last-name" className="block text-white font-semibold mb-1">Last Name</label>
        <input
            type="text"
            id="last-name"
            name="last-name"
            placeholder="Enter your last name"
            className="w-full rounded-md px-4 py-2 bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        </div>

        {isInterviewer ? (
        <div>
            <label htmlFor="generateCode" className="block text-white font-semibold mb-1">Generate 4-Digit Code</label>
            <input
            type="text"
            id="generateCode"
            name="generateCode"
            placeholder="1234"
            className="w-full rounded-md px-4 py-2 bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
        ) : (
        <div>
            <label htmlFor="enterCode" className="block text-white font-semibold mb-1">Enter 4-Digit Code</label>
            <input
            type="text"
            id="enterCode"
            name="enterCode"
            placeholder="Enter the code"
            className="w-full rounded-md px-4 py-2 bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
        )}

        <button
        type="submit"
        className="w-full bg-lime-500 text-white font-semibold py-2 rounded-md hover:bg-lime-600 transition"
        >
        Start Session
        </button>
        </form>
    </div>

  )
}

export default SignUpForm