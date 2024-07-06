"use client"
import { ThemeContext } from '@/context/ThemeContext'
import React, { useContext } from 'react'
import { motion } from 'framer-motion'

const Card = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useContext(ThemeContext)
  return (
    <motion.div
      className={`${theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-300 text-gray-900"} border-2 border-black rounded-md relative overflow-hidden flex flex-col gap-4 p-5 text-lg hover:cursor-pointer w-72 h-44 md:w-80 md:h-48 text-md shadow-lg`}
      whileHover={{ scale: 1.04, rotate: 1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {children}
    </motion.div>
  )
}

export default Card