"use client"
import React from 'react'
import Lottie from "react-lottie";
import loadAnimation from "../../public/load.json"

const Loading2 = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className='min-h-[60vh] flex justify-center items-center'>  
        <Lottie
          options={defaultOptions}
          height={300}
          width={300}
          isStopped={false}
        />
    </div>
  )
}

export default Loading2