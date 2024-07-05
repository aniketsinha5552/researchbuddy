"use client"
import Loading from '@/components/Loading'
import axios from 'axios'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'



const Profile = () => {

  let [user,setUser] = useState<any>(null)

  const getUser = async()=>{
    try{
      let res = await axios.get("api/profile")
      console.log(res.data)
      setUser(res.data)

    }catch(e){
      console.log(e)
    }
  }

  useEffect(()=>{
    getUser()
  },[])
  

  return (
    <div className='min-h-screen'>
      {
        user?
        <div className='flex flex-col items-center p-10 w-fit m-auto'>
        <Image src={user.image} alt='' width={200} height={200} className='rounded-full' />
        <h1 className='text-start w-full text-2xl font-bold mt-4'>{user.name}</h1>
        <h1 className='text-start w-full '>{user.email}</h1>
        <p className='text-start w-full '>Files uploaded: {user.files.length}</p>
      </div>: 
      <Loading/>
      }
   
    </div>
  )
}

export default Profile