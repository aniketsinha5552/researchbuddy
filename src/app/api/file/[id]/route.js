import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

export const GET = async(req,{params})=>{
    const {id} = params
    let prisma = new PrismaClient()
    const file = await prisma.file.findFirst({
        where:{
            id: id
        }
    })
    return new NextResponse(JSON.stringify(file))
}