import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

let prisma = new PrismaClient()
export const GET = async(req,{params})=>{
    const {id} = params
    try{
        const file = await prisma.file.findFirst({
            where:{
                id: id
            }
        })
        await prisma.$disconnect()
        return new NextResponse(JSON.stringify(file))

    }catch(e){
        return NextResponse.json({error:e.message},{status:400})
    }
}


export const POST = async(req,{params})=>{
    // return NextResponse.json({message:"File deleted successfully"},{status:200})
    const {id} = params
    try{
        const message = await prisma.message.deleteMany({
            where:{
                file_id:id
            }
        })
        const file = await prisma.file.delete({
            where:{
                id: id
            }
        })
        await prisma.$disconnect()
        return NextResponse.json({message:"File deleted successfully"},{status:200})

    }catch(e){
        return NextResponse.json({error:e.message},{status:400})
    }
}