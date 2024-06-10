"use client"
import Button from '@/components/button'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const File = ({params}: any) => {
  const {slug} = params
  const [file,setFile] = useState<any>(null)

  const getFile=async()=>{
    let res = await axios.get(`/api/file/${slug}`)
    setFile(res.data)
  }

  useEffect(()=>{
    getFile()
  },[])

  return (
    <div className='p-2'>
      {file &&
       <div>
      <h1 className='text-2xl'>{file?.name}</h1>
      <Button type='primary'>
      <Link href={file?.url} target='_blank'>View File</Link>

      </Button>
       </div>
      }

    </div>
  )
}

export default File