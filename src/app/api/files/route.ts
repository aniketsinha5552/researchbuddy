import { PrismaClient } from "@prisma/client"
import { getAuthSession } from "@/utils/auth";
import { NextResponse } from "next/server";


// get all user files
export const GET = async(req:Request,res:Response)=>{
    let prisma = new PrismaClient()
    const session = await getAuthSession()
    if(!session){
        return NextResponse.json({error: "Unauthorized"}, {status: 401})
    }
    const email:any = session?.user?.email  

    try{
        const files = await prisma.file.findMany({
            where: {
                user : {
                    email: email
                }
            },
            select:{
                id:true,
                name: true,
                created_at: true,
                _count:{
                    select:{
                        messages:true
                    }
                }
            },
            orderBy:[
                {
                    created_at: "desc"
                }
            ]
        })
        return new NextResponse(JSON.stringify({files: files}))
    }catch(e:any){
        return new NextResponse(e.message)
    }finally {
        await prisma.$disconnect();
    }
}