"use client"
import Chatbox from '@/components/Chatbox'
import Loading from '@/components/Loading'
import Loading2 from '@/components/Loading2'
import Notes from '@/components/Notes'
import PdfViewer from '@/components/PdfViewer'
import Button from '@/components/button'
import { ThemeContext } from '@/context/ThemeContext'
import { Icon } from '@iconify/react/dist/iconify.js'
import axios from 'axios'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { motion } from 'framer-motion'

const File = ({ params }: any) => {

  const { theme } = useContext(ThemeContext)
  const { slug } = params
  const [file, setFile] = useState<any>(null)
  const [text, setText] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [fileName, setFileName] = useState("")
  const [tab, setTab] = useState("chat")

  const getFile = async () => {
    let res = await axios.get(`/api/file/${slug}`)
    setFile(res.data)
    setFileName(res.data.name)
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
    try {
      await axios.post("/api/embed", {
        fileId: slug
      })
      notify()
      getFile()
    } catch (e) {
      alert("Ran into some error. Please try again")
      setLoading(false)
    }

  }

  const onSave = async () => {
    try {
      let res = await axios.post("/api/updateFile", {
        name: fileName,
        fileId: slug
      })
      setEditMode(false)
      getFile()
    } catch (e: any) {
    }
  }

  const onChange = (e: any) => {
    setFileName(e.target.value)
  }

  const onCancel = (e: any) => {
    setEditMode(false)
    setFileName(file.name)
  }

  return (
    <div className='min-h-screen'>
      {file &&
        <div className='flex flex-row justify-center items-center gap-2 p-1'>
          {editMode == true ?
            <div className='flex flex-row items-center gap-2'>
              <input onChange={onChange} className='p-1 border-2 bg-transparent border-gray-200 rounded-sm text-2xl mt-1 text-center' value={fileName} />
              <button className=' rounded p-1 border-2 border-gray-200' onClick={onSave}>Save</button>
              <button className=' rounded p-1 border-2 border-gray-200' onClick={onCancel}>Cancel</button>
            </div>
            :
            <>
              <h1 className='text-2xl mt-1 text-center'>{fileName}</h1>
              <button onClick={() => setEditMode(true)}>
                <Icon style={{ fontSize: 24 }} icon="material-symbols-light:edit-outline" />
              </button>
            </>
          }
        </div>
      }


      {file &&
        <div className='p-3 flex flex-col md:flex-row'>

          <div className='flex-1 w-full'>
            <div className={`p-0 m-1 overflow-y-auto overflow-x-hidden ${theme == "dark" ? 'bg-[#0f172a]' : 'bg-[#ddd]'} text-black rounded-md`}>
              {/* {loading ? <>...Parsing Text</> : <>{text}</>}
              {error && <p className='text-red-500'>Error Parsing Text</p>} */}
              <PdfViewer fileUrl={file.url} />
            </div>
          </div>
          <div className='flex-1 overflow-hidden'>
            <div className='flex flex-row gap-1 justify-around rounded-sm'>
              <motion.button
                  // whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
               className={`flex-1 rounded-md p-2 border-2 border-slate-400 ${tab == "chat" && 'bg-slate-400'}`} onClick={() => setTab("chat")}>Chat</motion.button>
              <motion.button
                          //  whileHover={{ scale: 1.05 }}
                           whileTap={{ scale: 0.95 }}
                           transition={{ type: "spring", stiffness: 300 }}
               className={`flex-1 rounded-md border-2 border-slate-400 p-2 ${tab == "notes" && 'bg-slate-400'}`} onClick={() => setTab("notes")}>Notes</motion.button>
            </div>
            {tab == "chat" ?
              <div>
                {file.embed == false ?
                  <div className='m-2 p-2 text-center'>
                    {loading ?
                      <Loading2 /> :
                      <div className='min-h-[60vh] flex flex-col justify-center items-center'>
                        <p>Analyze the document to chat</p>
                        <button className={`bg-blue-500 rounded-md m-2 p-2`} onClick={analyze}>Analyze 🪄</button>
                      </div>}
                  </div>
                  : <Chatbox slug={slug} file={file} />}
              </div>
              :
              <Notes />
            }
          </div>
          <ToastContainer />
        </div>
      }
      {
        !file && <Loading />
      }

    </div>
  )
}

export default File