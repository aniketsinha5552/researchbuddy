'use client'
import { signOut, useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import ThemeToggle from "./themeToggle/ThemeToggle"
import { ThemeContext } from '@/context/ThemeContext'
// import { Icon } from '@iconify/react/dist/iconify.js'
import Image from 'next/image'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";
import ProfileDd from './ProfileDd'

const Navbar = () => {
  const router = useRouter()
  const {theme}= useContext(ThemeContext)
  const { data, status } = useSession()
  const [open,setOpen] = useState<boolean>(false);
  const handleClose = ()=>{
    setOpen(false)
  }
  const handleOpen = ()=>{
    setOpen(true)
  }

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
    <div className={`p-4 flex justify-between items-center shadow-lg`}>
      <div className='flex flex-row gap-3 ml-8'>
      <div onClick={goHome} className='text-3xl font-semibold cursor-pointer hover:text-gray-600 transition-colors'>
        <Image src="/rb.jpg" alt='' width={40} height={40} className='rounded-lg'/>
      </div>
      <div onClick={goHome} className='md:block hidden text-3xl font-semibold cursor-pointer hover:text-gray-600 transition-colors'>
        Research Buddy
      </div>  
      </div>    
      
      {status === "authenticated" &&
        <div className='flex items-center gap-4 mr-8'>
          <ProfileDd user={data?.user}/>
          <ThemeToggle/>
          {/* <span className='hidden sm:inline'>{data?.user?.name}</span> */}
          {/* <img className='w-10 h-10 rounded-full' src={data?.user?.image ?? ""} alt='user' /> */}
          {/* <button onClick={handleOpen} title='Logout'>
            <Icon icon="material-symbols:logout-sharp" style={{fontSize:30}}/>
          </button> */}
          

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
       <Dialog open={open} onClose={handleClose}>
        <DialogTitle >{"Confirm Logout"}</DialogTitle>
        <DialogContent >
          <DialogContentText >
            Are you sure you want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={logout} color="secondary" autoFocus>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Navbar
