import { NextResponse } from "next/server";
import { splitter } from "../../../utils/splitter"
import { createClient } from "@supabase/supabase-js";
import {SupabaseVectorStore} from "langchain/vectorstores/supabase"
import  {OpenAIEmbeddings} from "langchain/embeddings/openai";
import { PrismaClient } from "@prisma/client";
import { GetTextFromPDF } from "@/utils/textExtractor";

export const POST = async(req,res)=>{
    const body = await req.json()

    // const text = body.text;
    let prisma = new PrismaClient();

    const fileId = body.fileId

    const file = await prisma.file.findFirst({
      where: {
          id: fileId
      }
    }); 
    if(!file){
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    let url = file.url;
    let text = await GetTextFromPDF(url)  
    const data = await splitter(text)

    const sbAPIKey = process.env.SUPABASE_KEY;
    const sbUrl = process.env.SUPABASE_URL;
    const openAIKey = process.env.OPENAI_KEY;

    // Add file id to data
    const documentsWithIds = data.map(doc => ({
        pageContent: doc.pageContent,
        metadata: {
            ...doc.metadata,
            fileId : fileId
        }
    }));
    

    const client = createClient(sbUrl,sbAPIKey);
    try {
        await SupabaseVectorStore.fromDocuments(
          documentsWithIds,
          new OpenAIEmbeddings({ openAIApiKey: openAIKey }),
          {
            client: client,
            tableName: "documents",
          }
        );
      } catch (e) {
        console.log(e);
      }
    
      // console.log(text)
      await prisma.$disconnect()

    return NextResponse.json({data:data},{status:200})
}