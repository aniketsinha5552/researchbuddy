import React from 'react'

const Card = ({children}: {children: React.ReactNode}) => {
  return (
    <div className='rounded-lg relative overflow-hidden flex flex-col gap-4 border-black border-2 p-5 text-lg hover:scale-105 transition duration-400 ease-in-out  hover:cursor-pointer w-72 h-44 md:w-80 md:h-48 text-md'>
        {children}
    </div>
  )
}

export default Card