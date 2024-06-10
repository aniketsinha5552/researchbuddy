import { getAuthSession } from "@/utils/auth";
import {  PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";


const prisma = new PrismaClient()

export const POST= async(req,res)=>{
    const body = await req.json();

    const session = await getAuthSession()

    const email = session?.user?.email

    try{
        const user = await prisma.User.findMany({
          where: {
            email: email
          }
        })
        const file = await prisma.File.create({
          data: {
            url: body.url,
            name: body.name,
            user_id : user[0].id
          }
        })
        return new NextResponse(JSON.stringify(file))
        
       }catch(e){
        return new NextResponse(JSON.stringify(e.message))
       }
}