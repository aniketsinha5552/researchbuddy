import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'


const Chatbox = ({slug}: {
    slug: string
}) => {

    const [ques,setQues] = useState("")
    const [ans,setAns] = useState("")
    
  const askQuestion = async()=>{
    let res = await axios.post("/api/ask",{
      question: ques,
      fileId: slug
    })
    console.log(res.data)
    setAns(res.data)
  }
  return (
    <div>
        <p>
        <input className='text-black p-2 m-1 rounded-sm' value={ques} type='text' onChange={(e)=>setQues(e.target.value)} />
        <button className='bg-slate-600 p-2 m-1 rounded-sm' onClick={askQuestion}>Go</button>
        <p> {"=>"} {ans}</p> 
       </p>
    </div>
  )
}

export default Chatbox