"use client"
import Chatbox from '@/components/Chatbox'
import Loading from '@/components/Loading'
import Loading2 from '@/components/Loading2'
import Notes from '@/components/Notes'
import PdfViewer from '@/components/PdfViewer'
import { ThemeContext } from '@/context/ThemeContext'
import { Icon } from '@iconify/react/dist/iconify.js'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { motion } from 'framer-motion'
import { MenuItem, Select } from '@mui/material'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

const File = ({ params }: any) => {

  const { theme } = useContext(ThemeContext)
  const { slug } = params
  const [file, setFile] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [fileName, setFileName] = useState("")
  const [tab, setTab] = useState("chat")
  const [view, setView] = useState(0) // 1: show pdf, 2: show chat, 0: show both

  const [messages,setMessages]= useState([])
  const [content,setContent] = useState("")

  const getFile = async () => {
    let res = await axios.get(`/api/file/${slug}`)
    setFile(res.data)
    setFileName(res.data.name)
    setMessages(res.data.messages)
    setContent(res?.data?.note[0]?.content??"Start taking notes")
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
      <div className='py-3 px-6'>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/home">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink>File</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {file &&
        <div className='flex flex-col justify-center items-center gap-2 '>
          {editMode == true ?
            <div className='flex  flex-col md:flex-row items-center gap-2'>
              <input onChange={onChange} className='p-1 border-2 bg-transparent border-gray-200 rounded-sm text-lg md:text-xl text-center' value={fileName} />
              <button className='rounded p-1 border-2 border-gray-200' onClick={onSave}>Save</button>
              <button className='rounded p-1 border-2 border-gray-200' onClick={onCancel}>Cancel</button>
            </div>
            :
            <div className='flex flex-col md:flex-row items-center gap-2'>
              <h1 className='text-xl md:text-2xl text-center px-4'>{fileName}</h1>
              <button onClick={() => setEditMode(true)}>
                <Icon style={{ fontSize: 24 }} icon="material-symbols-light:edit-outline" />
              </button>
            </div>
          }
          {/* {file.embed == true &&
            <div className='px-3 m-2'>
              <h2 className='text-xl'>About</h2>
              <p className='text-lg italic'>{file.summary}</p>
            </div>} */}
        </div>
      }

      {/* <div className='flex flex-row justify-center mt-2 '>

        {file &&
          <Select size='small' style={{ color: "gray" }} value={view} label="View" onChange={(e: any) => setView(e.target.value)}>
            <MenuItem value={0}>View PDF & Chat</MenuItem>
            <MenuItem value={1}>View PDF Only</MenuItem>
            <MenuItem value={2}>View Chat Only</MenuItem>

          </Select>
        }
      </div> */}


      {file &&
        <div className='p-5 flex flex-col hidden md:block'>
          <p className='mb-1 text-sm italic text-center text-gray-400'>Drag to resize the panel</p>
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel>
              <div className={`flex-1 w-full ${view == 2 && 'hidden'}`}>
                <div className={`p-0 m-1 border-1  overflow-y-auto overflow-x-hidden ${theme == "dark" ? 'bg-[#0f172a] border-gray-100' : 'bg-[#ddd] border-gray-900'} text-black`}>
                  <PdfViewer fileUrl={file.url} />
                </div>
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel>
              <div className={`flex-1 overflow-hidden ${view == 1 && 'hidden'}`}>
                <div className='flex flex-row gap-1 justify-around rounded-sm'>
                  <motion.button
                    // whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`flex-1 rounded-md p-2 mx-2 border-2 border-slate-400 ${tab == "chat" && 'bg-slate-400'}`} onClick={() => setTab("chat")}>Chat</motion.button>
                  <motion.button
                    //  whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`flex-1 rounded-md border-2 mx-2 border-slate-400 p-2 ${tab == "notes" && 'bg-slate-400'}`} onClick={() => setTab("notes")}>Notes</motion.button>
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
                      : <Chatbox messages={messages} setMessages={setMessages} slug={slug} file={file} />}
                  </div>
                  :
                  <Notes setContent={setContent} content= {content} />
                }
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
          <ToastContainer />
        </div>
      }
      {file &&
        <div className={`flex flex-col gap-2 overflow-scroll md:hidden block`}>
          <div className={`p-0 mx-5 overflow-y-auto overflow-x-hidden ${theme == "dark" ? 'bg-[#0f172a]' : 'bg-[#ddd]'} text-black`}>
            <PdfViewer fileUrl={file.url} />
          </div>
          <div className={`flex-1 overflow-scroll  mx-5 ${view == 1 && 'hidden'}`}>
            <div className='flex flex-row gap-1 justify-around rounded-sm'>
              <motion.button
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`flex-1 rounded-md p-2 border-2 border-slate-400 ${tab == "chat" && 'bg-slate-400'}`} onClick={() => setTab("chat")}>Chat</motion.button>
              <motion.button
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
                  : <Chatbox messages={messages} setMessages={setMessages} slug={slug} file={file} />}
              </div>
              :
              <Notes setContent={setContent} content= {content} />
            }
          </div>
        </div>}
      {
        !file && <Loading />
      }

    </div>
  )
}

export default File