import { PrismaClient } from "@prisma/client";
import { GetTextFromPDF } from "../../../utils/textExtractor";
import { NextResponse } from "next/server";
import { getAuthSession } from "@/utils/auth";

export const GET = async (req:Request, { params }:any) => {
    const session = await getAuthSession()
    if(!session){
        return NextResponse.json({error: "Unauthorized"}, {status: 401})
    }
    // console.log(req.URL)
    const {searchParams} = new URL(req.url)
    const id:any = searchParams.get("id") 
    
    let prisma = new PrismaClient();
    
    const file = await prisma.file.findFirst({
        where: {
            id: id
        }
    });
    if(!file){
        return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    let url = file.url;
    let text = await GetTextFromPDF(url)    

    return NextResponse.json({ text: text },{status:200});


};