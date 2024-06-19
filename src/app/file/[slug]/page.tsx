"use client"
import Button from '@/components/button'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const File = ({params}: any) => {
  const {slug} = params
  const [file,setFile] = useState<any>(null)
  const [text,setText] = useState<string>("")
  const [loading,setLoading] = useState(true)
  const [error,setError] = useState(false)

  const [ques,setQues] = useState("")
  const [ans,setAns] = useState("")

  const getFile=async()=>{
    let res = await axios.get(`/api/file/${slug}`)
    setFile(res.data)
    generateText(res?.data?.id)
  }

  useEffect(()=>{
     getFile()
  },[])

  const generateText=async(id:string)=>{
    let res = await axios.get(`/api/pdfToText?id=${id}`)
    setText(res.data.text)
    console.log("string length= ", res.data.text.length)
    setLoading(false)
    if(res.data.text== null) setError(true)
  }

  const analyze=async()=>{
    await axios.post("/api/embed",{
      fileId: slug
    })
  }

  const askQuestion = async()=>{
    let res = await axios.post("/api/ask",{
      question: ques,
      fileId: slug
    })
    console.log(res.data)
    setAns(res.data)
  }

  return (
    <div className='p-5 flex flex-row'>
      {file &&
       <div className='flex-1'>
      <h1 className='text-2xl text-center'>{file?.name}</h1>
      <div className='text-right flex'>
        <Button type='primary'>
        <Link href={file?.url} target='_blank'>View File</Link>
        </Button>
      </div>
      {text.length>0 && <p>String Length: {text.length}</p>}
      <div className='p-5 m-2 max-h-[80vh] overflow-y-auto bg-white text-black rounded-md'>
        {loading? <>...Parsing Text</> : <>{text}</>}
        {error && <p className='text-red-500'>Error Parsing Text</p>}
        
      </div>

       </div>
      }
      <div className='bg-slate-800 flex-1 p-3'>
      <button className='bg-blue-500 rounded-md m-2 p-2' onClick={analyze}>Analyze</button>
       <p>
        <input className='text-black p-2 m-1 rounded-sm' value={ques} type='text' onChange={(e)=>setQues(e.target.value)} />
        <button className='bg-slate-600 p-2 m-1 rounded-sm' onClick={askQuestion}>Go</button>
        <p>=> {ans}</p> 
       </p>
      </div>

    </div>
  )
}

export default File