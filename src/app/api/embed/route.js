import { NextResponse } from "next/server";
import { splitter } from "../../../utils/splitter"
import { createClient } from "@supabase/supabase-js";
import {SupabaseVectorStore} from "langchain/vectorstores/supabase"
import  {OpenAIEmbeddings} from "langchain/embeddings/openai";
import { v4 as uuidv4 } from 'uuid';

export const POST = async(req,res)=>{
    const body = await req.json()

    const text = body.text;
    const data = await splitter(text)

    const sbAPIKey = process.env.SUPABASE_KEY;
    const sbUrl = process.env.SUPABASE_URL;
    const openAIKey = process.env.OPENAI_KEY;

    // Add file id to data
    const documentsWithIds = data.map(doc => ({
        pageContent: doc.pageContent,
        metadata: {
            ...doc.metadata,
            fileId : 999
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

    return NextResponse.json({data:data},{status:200})
}