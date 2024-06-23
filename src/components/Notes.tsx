import { ThemeContext } from '@/context/ThemeContext'
import React, { useContext } from 'react'

const Notes = () => {
    const { theme } = useContext(ThemeContext)
    return (
        <div className="flex flex-col items-center min-h-[80vh] py-3 flex-1 max-h-[80vh] overflow-hidden">
            <div className={`w-full max-w-full min-h-[80vh] rounded-lg shadow-md p-4 ${theme == "dark" ? 'bg-slate-800' : 'bg-slate-300'}`}>
                   Coming Soon
            </div>
            <div className="flex items-center">


            </div>
        </div>
  )
}

export default Notes