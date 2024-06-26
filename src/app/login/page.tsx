'use client'
import { Icon } from '@iconify/react/dist/iconify.js'
import { signIn, useSession } from 'next-auth/react'
import React, { useState } from 'react'

const LoginPage = () => {
  const {data,status}= useSession()
  console.log(data,status)

  const [isLogin, setIsLogin] = useState(true);

  const googleLogin =()=>{
    signIn("google")
  }
  const gitLogin=()=>{
    signIn("github")
  }

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center">
    <div className="pb-20 rounded shadow-md w-full max-w-sm">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Sign In
      </h2>
      <div className='rounded-sm grid place-items-center gap-4'>

        <button className='bg-red-700 hover:bg-red-800 w-36 text-center p-3 rounded-md text-2xl font-medium flex justify-center items-center gap-2' onClick={googleLogin} >Google <Icon icon="devicon:google" /></button>
        <p>OR</p>
        <button className='bg-black hover:bg-gray-800 w-36 text-center p-3 rounded-md text-white text-2xl font-medium flex  justify-center items-center gap-2' onClick={gitLogin}>Github <Icon icon="mdi:github" /></button>
    </div>
    </div>
  </div>

  )
}

export default LoginPage