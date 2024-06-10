"use client"
import FileUpload from "@/components/FileUpload";
import Card from "@/components/card";
import axios from "axios";
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
  return (
    <div className="flex flex-row flex-wrap gap-8">
    { files.length>0 &&  files?.map((file: any)=>{
         return(
            <Card key={file.id}>
               {file?.name}
            </Card>
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