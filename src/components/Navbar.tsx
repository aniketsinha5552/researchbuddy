'use client'
import { signOut, useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import React, { useContext, useEffect } from 'react'
import Button from "./button"
import ThemeToggle from "./themeToggle/ThemeToggle"
import { ThemeContext } from '@/context/ThemeContext'
import { Icon } from '@iconify/react/dist/iconify.js'

const Navbar = () => {
  const router = useRouter()
  const {theme}= useContext(ThemeContext)
  const { data, status } = useSession()

  const pathname = usePathname()
  // console.log(pathname)

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/home")
    } else if (status === "unauthenticated") {
      if(pathname !="/") router.push("/login")
    }
  }, [status, router])

  const logout = () => {
    signOut()
    router.push('/login')
  }

  const goHome=()=>{
    if(status === "authenticated"){
      router.push("/home")
    }
    else{
      router.push("/")
    }
  }

  return (
    <div className={`p-3 flex justify-between items-center shadow-lg`}>
      <div onClick={goHome} className='md:block hidden text-3xl font-semibold cursor-pointer hover:text-gray-600 transition-colors'>
        Research Buddy
      </div>      
      <div onClick={goHome} className='md:hidden block text-3xl font-semibold cursor-pointer hover:text-gray-600 transition-colors'>
        📜
      </div>
      
      {status === "authenticated" &&
        <div className='flex items-center gap-4'>
          <ThemeToggle/>
          <span className='hidden sm:inline'>{data?.user?.name}</span>
          <img className='w-10 h-10 rounded-full' src={data?.user?.image ?? ""} alt='user' />
          <button onClick={logout} title='Logout'>
            <Icon icon="material-symbols:logout-sharp" style={{fontSize:30}}/>
          </button>
        </div>
      }
      {status === "unauthenticated" && pathname == "/" &&
        <div className='flex items-center gap-4'>
                <ThemeToggle/>
        <button className='hover:bg-blue-500 rounded-md px-4 py-2 transition-colors' onClick={() => router.push('/login')}>
          Sign In
        </button>
        </div>
      }
            {status === "unauthenticated" && pathname == "/login" &&
        <div className='flex items-center gap-4'>
                <ThemeToggle/>
        <button className='hover:bg-blue-500 rounded-md px-4 py-2 transition-colors' onClick={() => router.push('/')}>
          Home
        </button>
        </div>
      }
    </div>
  )
}

export default Navbar
