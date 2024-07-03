"use client"
import Link from 'next/link';
import upload from "../../public/home/upload.json"
import analyze from "../../public/home/analyze.json"
import chat from "../../public/home/chat.json"
import Lottie from "react-lottie";

// import { useRouter } from 'next/router';

export default function LandingPage() {
  const uploadOptions = {
    loop: true,
    autoplay: true,
    animationData: upload,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const analyzeOptions = {
    loop: true,
    autoplay: true,
    animationData: analyze,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const chatOptions = {
    loop: true,
    autoplay: true,
    animationData: chat,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  //   const router = useRouter()
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">

      <main className="flex-1 min-h-screen container mx-auto px-6 flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Welcome to Research Buddy ✨
        </h1>
        <p className="text-lg md:text-2x mb-6">
          Your AI-powered assistant for all your research needs. Converse with your documents and get relevant answers instantly.
        </p>
        <div>
          <Link href="/login">
            <span className="bg-blue-500 text-white px-6 py-3 rounded text-lg font-semibold">Get Started</span>
          </Link>
        </div>
      </main>

      <main className="flex-1 min-h-screen container mx-auto px-6 flex md:flex-row flex-col items-center justify-around text-center">
        <div>
          <Lottie
            options={uploadOptions}
            height={220}
            width={220}
            isStopped={false}
          />
          <p className='font-bold text-xl md:text-2xl'>Upload</p>
        </div>
        <div>
          <Lottie
            options={analyzeOptions}
            height={220}
            width={220}
            isStopped={false}
          />
          <p className='font-bold text-xl md:text-2xl'>Analyze</p>
        </div>
        <div>
          <Lottie
            options={chatOptions}
            height={220}
            width={220}
            isStopped={false}
          />
          <p className='font-bold text-xl md:text-2xl'>Chat</p>
        </div>

      </main>
    </div>
  );
}