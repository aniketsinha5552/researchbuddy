import { NextResponse } from "next/server";
import {standAlone} from "../../../utils/standalone_query"
import { PrismaClient } from "@prisma/client";
import { getAuthSession } from "@/utils/auth";


export const POST = async(req: Request,res: Response)=>{
     const session = await getAuthSession()
     if(!session){
         return NextResponse.json({error: "Unauthorized"}, {status: 401})
     }
     const body = await req.json();

     let prisma = new PrismaClient()

     let question = body.question;
     let fileId = body.fileId;
     let file = null
     try{
          file = await prisma.file.findFirst({
               where:{
                    id: fileId
               },
               include:{
                    user: true
               }
          })
          if(!file){
            return NextResponse.json({error:"Invalid File Id"},{status:404})
          }

          let messages = await prisma.message.findMany({
               where:{
                   file_id: fileId
               }
           })

          const ans = await standAlone(question,fileId,file,messages);
          return NextResponse.json(ans)

     }catch(e:any){
          return NextResponse.json({error:"Something went wrong. Please try again."},{status:404})
     }
}