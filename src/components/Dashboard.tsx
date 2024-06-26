"use client"
import FileUpload from "@/components/FileUpload";
import Card from "@/components/card";
import { Icon } from "@iconify/react/dist/iconify.js";
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



   const deleteFile=async(e:any,fileId:string)=>{
       e.stopPropagation()
       alert("Warning the File and all the associated messages will be deleted")
       let res = await axios.post(`/api/file/${fileId}`)
       getFiles()
   }

  const router = useRouter()
  return (
    <div className="flex flex-row flex-wrap gap-8 justify-start p-4">
    <Card>
      <FileUpload getFiles={getFiles}/>
    </Card>
    { files.length>0 &&  files?.map((file: any)=>{
         return(
            <div onClick={()=>router.push(`/file/${file.id}`)} key={file.id}>
            <Card >
               <p className="text-bold text-xl max-w-96 overflow-hidden break-words">{file?.name.substring(0,60)}</p>
               <p className="text-md text-slate-500">Created At: {new Date(file.created_at).toDateString()}</p>
               <button onClick={((e)=>deleteFile(e,file.id))} className="absolute cursor-pointer hover:bg-red-200 bottom-1 right-1"><Icon style={{fontSize:"2rem"}} icon="ic:baseline-delete" /></button> 
            </Card>
            </div>
         )
    }) 
    }
   </div>
  )
}

export default Dashboard