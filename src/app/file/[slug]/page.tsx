"use client"
import Chatbox from '@/components/Chatbox'
import Notes from '@/components/Notes'
import PdfViewer from '@/components/PdfViewer'
import Button from '@/components/button'
import { ThemeContext } from '@/context/ThemeContext'
import { Icon } from '@iconify/react/dist/iconify.js'
import axios from 'axios'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'

const File = ({ params }: any) => {

  const { theme } = useContext(ThemeContext)
  const { slug } = params
  const [file, setFile] = useState<any>(null)
  const [text, setText] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const [tab, setTab] = useState("chat")

  const getFile = async () => {
    let res = await axios.get(`/api/file/${slug}`)
    setFile(res.data)
    // generateText(res?.data?.id)
  }

  useEffect(() => {
    getFile()
  }, [])

  const notify = () => toast("Document Analyzed");

  // const generateText = async (id: string) => {
  //   let res = await axios.get(`/api/pdfToText?id=${id}`)
  //   setText(res.data.text)
  //   console.log("string length= ", res.data.text.length)
  //   setLoading(false)
  //   if (res.data.text == null) setError(true)
  // }

  const analyze = async () => {
    setLoading(true)
    try{
      await axios.post("/api/embed", {
        fileId: slug
      })
      notify()
      getFile()
    }catch(e){
      alert("Ran into some error. Please try again")
      setLoading(false)
    }

  }

  return (
    <div className='min-h-screen'>
      <div className='flex flex-row justify-center gap-2 p-1'>
        <h1 className='text-2xl mt-1 text-center'>{file?.name}</h1>
      </div>


      {file &&
        <div className='p-3 flex flex-col md:flex-row'>

          <div className='flex-1 w-full'>
            <div className={`p-5 m-2 overflow-y-auto overflow-x-hidden ${theme == "dark" ? 'bg-[#0f172a]' : 'bg-[#ddd]'} text-black rounded-md`}>
              {/* {loading ? <>...Parsing Text</> : <>{text}</>}
              {error && <p className='text-red-500'>Error Parsing Text</p>} */}
              <PdfViewer fileUrl={file.url} />
            </div>
          </div>
          <div className='flex-1 overflow-hidden'>
            <div className='flex flex-row justify-around border-2 border-slate-400 rounded-sm'>
              <button className={`flex-1 p-2 ${tab == "chat" && 'bg-slate-400'}`} onClick={() => setTab("chat")}>Chat</button>
              <button className={`flex-1 p-2 ${tab == "notes" && 'bg-slate-400'}`} onClick={() => setTab("notes")}>Notes</button>
            </div>
            {tab == "chat" ?
            <div>
            {file.embed == false ?
            <div className='m-2 p-2 text-center'> 
            <p>Analyze the document to chat</p>
            {loading?
                <button
                  className="bg-blue-500 rounded-md m-2 p-2"
                  // onClick={askQuestion}
                  disabled={true}
                >
                  <Icon icon="line-md:loading-loop" />
                </button> :
            <button className={`bg-blue-500 rounded-md m-2 p-2`} onClick={analyze}>Analyze 🪄</button> }
            </div>
            : <Chatbox slug={slug} file={file} /> }
            </div>
             :
              <Notes />
            }
          </div>
          <ToastContainer />
        </div>
      }

    </div>
  )
}

export default File