import React from 'react'

const Card = ({children}: {children: React.ReactNode}) => {
  return (
    <div className='rounded-md shadow-black border-slate-500 shadow-sm p-5 text-lg transition duration-400 ease-in-out hover:bg-red-500 hover:cursor-pointer'>
        {children}
    </div>
  )
}

export default Card