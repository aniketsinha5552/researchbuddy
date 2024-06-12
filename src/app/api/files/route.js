import { PrismaClient } from "@prisma/client"
import { getAuthSession } from "@/utils/auth";
import { NextResponse } from "next/server";


// get all user files
export const GET = async(req,res)=>{
    let prisma = new PrismaClient()
    const session = await getAuthSession()
    const email = session?.user?.email  

    try{
        const files = await prisma.file.findMany({
            where: {
                user : {
                    email: email
                }
            }
        })
        return new NextResponse(JSON.stringify({files: files}))
    }catch(e){
        return new NextResponse(e.message)
    }finally {
        await prisma.$disconnect();
    }
}