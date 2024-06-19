import { NextResponse } from "next/server";
import {standAlone} from "../../../utils/standalone_query"


export const POST = async(req: Request,res: Response)=>{
     const body = await req.json();

     let question = body.question;
     let fileId = body.fileId;

     let ques = `${question}.(context should be from the file with the following fileId:${fileId})`

     const ans = await standAlone(ques);

     return NextResponse.json(ans)
}