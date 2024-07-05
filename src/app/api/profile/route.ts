import { getAuthSession } from "@/utils/auth"
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export const GET=async(req:Request,res:Response)=>{
    const session = await getAuthSession();
    if(!session){
        return NextResponse.json({error: "Unauthorized"}, {status: 401})
    }

    const email:any = session?.user?.email
    let prisma = new PrismaClient()
     
    try{
        const currUser = await prisma.user.findFirst({
            where:{
                email: email
            },
            include:{
                files:true
            }
        })
        await prisma.$disconnect()
        return NextResponse.json(currUser)

    }catch(e:any){
        return NextResponse.json({"error": "Some Error Occured"}, {status:500})
    }

}