import { getAuthSession } from "@/utils/auth";
import {  PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";


const prisma = new PrismaClient()

export const POST= async(req:Request,res:Response)=>{
    const body = await req.json();

    const session = await getAuthSession()
    if(!session){
        return NextResponse.json({error: "Unauthorized"}, {status: 401})
    }

    const email:any = session?.user?.email

    try{
        const user = await prisma.user.findMany({
          where: {
            email: email
          }
        })
        const file = await prisma.file.create({
          data: {
            url: body.url,
            name: body.name,
            user_id : user[0].id
          }
        })
        return NextResponse.json({file:file},{status:200})
        
       }catch(e:any){
        return new NextResponse(JSON.stringify(e.message))
       }finally{
         await prisma.$disconnect()
       }
}