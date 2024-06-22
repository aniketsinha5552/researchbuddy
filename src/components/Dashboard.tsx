"use client"
import FileUpload from "@/components/FileUpload";
import Card from "@/components/card";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Dashboard = () => {
   const [files,setFiles] = useState([]);

   const getFiles = async()=>{
      let res = await axios.get("/api/files");
      console.log(res.data.files)
      setFiles(res.data.files)
   }

   useEffect(()=>{
      getFiles()
   },[])

  const router = useRouter()
  return (
    <div className="flex flex-row flex-wrap gap-8">
    { files.length>0 &&  files?.map((file: any)=>{
         return(
            <div onClick={()=>router.push(`/file/${file.id}`)} key={file.id}>
            <Card >
               <p className="text-bold text-2xl">{file?.name}</p>
               <p className="text-md text-slate-500">Created At: {new Date(file.created_at).toDateString()}</p> 
            </Card>
            </div>
         )
    }) 
    }
    <Card>
      <FileUpload getFiles={getFiles}/>
    </Card>
   </div>
  )
}

export default Dashboard