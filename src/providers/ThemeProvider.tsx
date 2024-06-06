"use client"
import { ThemeContext } from '@/context/ThemeContext'
import React, { useContext, useEffect, useState } from 'react'

const ThemeProvider = ({children}:{children: React.ReactNode}) => {
  const {theme} = useContext(ThemeContext)
  const [mounted,setMounted]= useState(false)

  useEffect(()=>{
    setMounted(true)
  },[])

  if(mounted){
    return (
      <div className={theme} style={{minHeight:"100vh"}}>{children}</div>
    )
  }
}

export default ThemeProvider