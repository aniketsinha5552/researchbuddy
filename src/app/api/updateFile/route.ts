import { getAuthSession } from "@/utils/auth"
import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

export const POST = async(req:Request)=>{
    const session = await getAuthSession()
    if(!session){
        return NextResponse.json({message:"Unauthorized"},{status:401})
    }
    let prisma = new PrismaClient();
    const body = await req.json();
    const newName = body.name
    const fileId = body.fileId

    try{
        const updatedFile = await prisma.file.update({
            where:{
                id: fileId
            },
            data:{
                name: newName
            }
        })
        await prisma.$disconnect()
        return NextResponse.json({message:"File updated"},{status:200})
    }catch(e:any){
        return NextResponse.json({message:"Some Error Occurred"},{status:404})
    }

}