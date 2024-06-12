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

  return (
    <div className='p-5'>
      {file &&
       <div>
      <h1 className='text-2xl text-center'>{file?.name}</h1>
      <div className='text-right flex flex-row-reverse'>
        <Button type='primary'>
        <Link href={file?.url} target='_blank'>View File</Link>
        </Button>
      </div>

      <div className='p-5 m-2 max-h-96 overflow-y-auto bg-white text-black rounded-md'>
        {loading? <>...Parsing Text</> : <>{text}</>}
        {error && <p className='text-red-500'>Error Parsing Text</p>}
        
      </div>

       </div>
      }

    </div>
  )
}

export default File