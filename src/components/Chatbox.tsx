"use client"
import React, { useContext, useRef } from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { File, Message } from '@prisma/client'
import { ThemeContext } from '@/context/ThemeContext'
import MessageComp from './MessageComp'
import { Icon } from '@iconify/react/dist/iconify.js'


const Chatbox = ({ slug, file }: {
  slug: string,
  file: File
}) => {

  const { theme } = useContext(ThemeContext)
  const chatContainerRef = useRef<any>(null);


  const [ques, setQues] = useState("")
  const [chat, setChat] = useState<any[]>([])
  const [isLoading, setIsloading] = useState(false)

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chat]);

  const getChatHistory = async () => {
    try {
      let res = await axios.get(`/api/chat?fileId=${slug}`)
      setChat(res.data)

    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getChatHistory()
  }, [])

  const askQuestion = async (e: any) => {
    e.preventDefault()
    setIsloading(true)
    if (ques == "") return
    setQues("")

    setChat((prev: Message[]) => [...prev, {
      text: ques,
      type: "USER"
    }])

    try {
      let res = await axios.post("/api/ask", {
        question: ques,
        fileId: slug
      })
      setChat((prev: Message[]) => [...prev, {
        text: res.data,
        type: "BOT"
      }])


      let res2 = await axios.post("/api/chat", {
        fileId: slug,
        message: ques,
        type: "USER"
      })

      let res3 = await axios.post("/api/chat", {
        fileId: slug,
        message: res.data,
        type: "BOT"
      })
    } catch (e:any) {
      alert(e.message)
    } finally {
      setIsloading(false)

    }
  }


  return (
    <div className="flex flex-col items-center py-2 flex-1 overflow-hidden">
      <div className={`w-full max-w-full rounded-lg shadow-md p-4 ${theme == "dark" ? 'bg-slate-800' : 'bg-slate-300'}`}>
        <div ref={chatContainerRef} className="mb-4 space-y-2 min-h-[60vh] max-h-[60vh] overflow-y-auto overflow-x-hidden p-2">
          {chat.length > 0 && chat.map((message: Message, idx: number) => (
            <MessageComp message={message} key={idx} />
          ))}
        </div>
        <form onSubmit={askQuestion} className="flex items-center">
          <input
            className="text-black p-2 m-1 rounded-sm flex-grow border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={ques}
            type='text'
            onChange={(e) => setQues(e.target.value)}
            placeholder="Type your question..."
          />
          {isLoading ?
            <button
              className="bg-blue-600 text-white p-2 m-1 rounded-sm hover:bg-blue-700"
              // onClick={askQuestion}
              disabled={true}
            >
              <Icon icon="line-md:loading-loop" />
            </button> :

            <button
              className="bg-blue-600 text-white p-2 m-1 rounded-sm hover:bg-blue-700"
              // onClick={askQuestion}
              type='submit'
            >
              Go
            </button>
          }

        </form>
      </div>
    </div>

  )
}

export default Chatbox