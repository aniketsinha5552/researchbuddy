"use client"
import Loading from '@/components/Loading'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import { toast, ToastContainer } from 'react-toastify'



const Profile = () => {

  let [user,setUser] = useState<any>(null)

  const {register,handleSubmit} = useForm()

  const notify=()=>toast("Profile Updated!")

  const onsubmit=async(data:any)=>{
    let res = await axios.post("/api/profile",{
      userId:user.id ,
      name: data.name
    })
    notify()
  }

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
        <form className='flex flex-col items-center p-10 gap-3 w-fit m-auto' onSubmit={handleSubmit(onsubmit)}>
          <Image src={user.image} alt='' width={200} height={200} className='rounded-full' />
           <input  className='text-start w-full border-2 border-gray-400 p-2 bg-transparent rounded-md text-xl' defaultValue={user.name} {...register("name")} />
           <input disabled className='cursor-not-allowed text-start w-full border-2 border-gray-400 p-2  bg-transparent rounded-md text-md' defaultValue={user.email} {...register("email")} />
           <p className='cursor-not-allowed text-start w-full border-2 border-gray-400 p-2 rounded-md '>Files uploaded: {user._count.files}</p>

           <Button>Save</Button>
        </form>
   : 
      <Loading/>
      }
     <ToastContainer/>
    </div>
  )
}

export default Profile