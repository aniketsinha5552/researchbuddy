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
               {file?.name}
            </Card>
            </div>
         )
    }) 
    }
    <Card>
      <FileUpload/>
    </Card>
   </div>
  )
}

export default Dashboard