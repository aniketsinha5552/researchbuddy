import { PrismaClient } from "@prisma/client";
import { GetTextFromPDF } from "../../../utils/textExtractor";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
    // console.log(req.URL)
    const {searchParams} = new URL(req.url)
    const id = searchParams.get("id") 
    
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
    console.log(text)
    

    return NextResponse.json({ text: text },{status:200});


};