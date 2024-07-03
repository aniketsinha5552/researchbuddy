import { ThemeContext } from '@/context/ThemeContext'
import React, { useContext, useEffect, useState } from 'react'
import Tiptap from './Tiptap'
import axios from 'axios'
import { usePathname } from 'next/navigation'
import Loading from './Loading'

const Notes = () => {
    const { theme } = useContext(ThemeContext)
    const [content, setContent] = useState<any>(null)
    const handleContentChange = (reason: any) => {
      setContent(reason)
    }

    const pathname = usePathname()
    const fileId = pathname.split("/")[2]
    const getNotes = async()=>{
      let res = await axios.get(`/api/notes?fileId=${fileId}`)
      console.log(res.data.content)
      setContent(res.data.content)
    }

    useEffect(()=>{
      getNotes()
    },[])


    return (
        <div className="flex flex-col items-center min-h-[80vh] max-h-[80vh] py-2 flex-1 ">
            <div className={`overflow-y-auto w-full max-w-full min-h-[70vh] rounded-lg shadow-md p-4 ${theme == "dark" ? 'bg-slate-800' : 'bg-slate-300'}`}>
            {content ? <Tiptap
            content={content}
            onChange={(newContent: string) => handleContentChange(newContent)}
            /> : <Loading/>}
            </div>
            <div className="flex items-center">

            </div>
        </div>
  )
}

export default Notes