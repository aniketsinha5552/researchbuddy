"use client"
import Chatbox from '@/components/Chatbox'
import Notes from '@/components/Notes'
import Button from '@/components/button'
import { ThemeContext } from '@/context/ThemeContext'
import axios from 'axios'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'

const File = ({ params }: any) => {

  const { theme } = useContext(ThemeContext)
  const { slug } = params
  const [file, setFile] = useState<any>(null)
  const [text, setText] = useState<string>("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const [tab,setTab]= useState("chat")

  const getFile = async () => {
    let res = await axios.get(`/api/file/${slug}`)
    setFile(res.data)
    generateText(res?.data?.id)
  }

  useEffect(() => {
    getFile()
  }, [])

  const generateText = async (id: string) => {
    let res = await axios.get(`/api/pdfToText?id=${id}`)
    setText(res.data.text)
    console.log("string length= ", res.data.text.length)
    setLoading(false)
    if (res.data.text == null) setError(true)
  }

  const analyze = async () => {
    await axios.post("/api/embed", {
      fileId: slug
    })
  }

  return (
    <div className='p-5 flex flex-col md:flex-row'>
      {file &&
        <>
          <div className='flex-1 w-full'>
            <h1 className='text-2xl text-center'>{file?.name}</h1>
            <div className='text-right flex'>
              <Button type='primary'>
                <Link href={file?.url} target='_blank'>View File</Link>
              </Button>
            </div>
            {/* {text.length>0 && <p className='mt-1'>String Length: {text.length}</p>} */}
            <div className={`p-5 m-2 max-h-[60vh] overflow-y-auto overflow-x-hidden ${theme == "dark" ? 'bg-slate-800 text-slate-300' : 'bg-slate-300 text-slate-800'} text-black rounded-md`}>
              {loading ? <>...Parsing Text</> : <>{text}</>}
              {error && <p className='text-red-500'>Error Parsing Text</p>}

            </div>
             
            {file.embed== false && <button className='bg-blue-500 rounded-md m-2 p-2' onClick={analyze}>Analyze</button>}
            


          </div>
          <div className='flex-1 max-h-[80vh] overflow-hidden'>
            <div className='flex flex-row justify-around border-2 border-slate-400 rounded-sm'>
            <button className={`flex-1 p-2 ${tab=="chat" && 'bg-slate-400'}`} onClick={()=>setTab("chat")}>Chat</button>
            <button className={`flex-1 p-2 ${tab=="notes" && 'bg-slate-400'}`} onClick={()=>setTab("notes")}>Notes</button>
            </div>
            {tab=="chat"? 
            <Chatbox slug={slug} file={file} /> :
            <Notes/>
            }
          </div>
          <ToastContainer/>
        </>
      }

    </div>
  )
}

export default File