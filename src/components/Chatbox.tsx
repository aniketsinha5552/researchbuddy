import React, { useContext } from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { File, Message } from '@prisma/client'
import { ThemeContext } from '@/context/ThemeContext'


const Chatbox = ({ slug ,file}: {
  slug: string,
  file: File
}) => {

  const {theme} = useContext(ThemeContext)
  console.log(theme)

  const [ques, setQues] = useState("")
  const [chat,setChat]= useState<any[]>([])

  const getChatHistory=async()=>{
    let res = await axios.get(`/api/chat?fileId=${slug}`)
    setChat(res.data)
  }

  useEffect(()=>{
    getChatHistory()
  },[])

  const askQuestion = async () => {

    if(ques=="") return
    setQues("")

    setChat((prev:Message[])=> [...prev,{
      text: ques,
      type: "USER"
    }])

    let res = await axios.post("/api/ask", {
      question: ques,
      fileId: slug
    })
    
    setChat((prev:Message[])=> [...prev, {
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
  }
  return (
    <div className="flex flex-col items-center min-h-[80vh] py-3 flex-1 max-h-[80vh] overflow-hidden">
      <h1>Chat History</h1>
    <div className={`w-full max-w-full rounded-lg shadow-md p-4 ${theme=="dark"? 'bg-slate-800' : 'bg-slate-300'}`}>
      <div className="mb-4 space-y-2 min-h-[60vh] max-h-[60vh] overflow-y-auto overflow-x-hidden p-2">
        {chat.length > 0 && chat.map((message: Message) => (
          <div
            key={message.id}
            className={`p-2 m-2 w-fit rounded text-white ${
              message.type === 'USER' ? 'bg-green-500 ml-auto' : 'bg-blue-500 mr-auto'
            }`}
          >
            <p className={` ${message.type === 'USER' ? 'text-right' : 'text-left'}`}>{message.text}</p>
          </div>
        ))}
      </div>
      <div className="flex items-center">
        <input
          className="text-black p-2 m-1 rounded-sm flex-grow border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={ques}
          type='text'
          onChange={(e) => setQues(e.target.value)}
          placeholder="Type your question..."
        />
        <button
          className="bg-blue-600 text-white p-2 m-1 rounded-sm hover:bg-blue-700"
          onClick={askQuestion}
        >
          Go
        </button>
      </div>
    </div>
  </div>
  
  )
}

export default Chatbox