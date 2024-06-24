import React from 'react'

const Card = ({children}: {children: React.ReactNode}) => {
  return (
    <div className='rounded-lg relative overflow-hidden flex flex-col gap-4 border-black border-2 p-5 text-lg hover:scale-105 transition duration-400 ease-in-out  hover:cursor-pointer w-96 h-64 text-md'>
        {children}
    </div>
  )
}

export default Card