import { getAuthSession } from "@/utils/auth"
import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

let prisma = new PrismaClient()
export const GET = async(req:Request,{params}:any)=>{
    const session = await getAuthSession()
    if(!session){
        return NextResponse.json({error: "Unauthorized"}, {status: 401})
    }
    const {id} = params
    try{
        const file = await prisma.file.findFirst({
            where:{
                id: id
            }
        })
        await prisma.$disconnect()
        return new NextResponse(JSON.stringify(file))

    }catch(e:any){
        return NextResponse.json({error:e.message},{status:400})
    }
}


export const POST = async(req:Request,{params}:any)=>{
    const session = await getAuthSession()
    if(!session){
        return NextResponse.json({error: "Unauthorized"}, {status: 401})
    }
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

    }catch(e:any){
        return NextResponse.json({error:e.message},{status:400})
    }
}