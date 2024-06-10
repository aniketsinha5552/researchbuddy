import React from 'react'

const Card = ({children}: {children: React.ReactNode}) => {
  return (
    <div className='rounded-md shadow-black border-slate-500 shadow-sm p-5 text-lg hover:scale-105 transition duration-400 ease-in-out  hover:cursor-pointer w-72 h-32 text-md'>
        {children}
    </div>
  )
}

export default Card