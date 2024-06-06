'use client'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import Button from "./button"

const Navbar = () => {
  const router = useRouter()
  const { data, status } = useSession()

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/")
    } else if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router])

  const logout = () => {
    signOut()
    router.push('/login')
  }

  return (
    <div className='bg-gray-800 p-4 flex justify-between items-center text-white shadow-lg'>
      <div onClick={() => router.push('/')} className='text-3xl font-semibold cursor-pointer hover:text-gray-300 transition-colors'>
        Research Buddy
      </div>
      {status === "authenticated" &&
        <div className='flex items-center gap-4'>
          <span className='hidden sm:inline'>{data?.user?.name}</span>
          <img className='w-10 h-10 rounded-full' src={data?.user?.image ?? ""} alt='user' />
          <Button type='primary' onClick={logout}>
            Logout
          </Button>
        </div>
      }
      {status === "unauthenticated" &&
        <button className='bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2 transition-colors' onClick={() => router.push('/login')}>
          Login
        </button>
      }
    </div>
  )
}

export default Navbar
