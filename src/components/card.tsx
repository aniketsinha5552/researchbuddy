"use client"
import { ThemeContext } from '@/context/ThemeContext'
import React, { useContext } from 'react'

const Card = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useContext(ThemeContext)
  return (
    <div className={`${theme=="dark"? "bg-gray-800 text-white" : "bg-gray-300 text-gray-900"} rounded-lg relative overflow-hidden flex flex-col gap-4 p-5 text-lg hover:scale-105 transition duration-400 ease-in-out  hover:cursor-pointer w-72 h-44 md:w-80 md:h-48 text-md`}>
      {children}
    </div>
  )
}

export default Card