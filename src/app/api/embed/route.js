import { NextResponse } from "next/server";
import { splitter } from "../../../utils/splitter"

export const POST = async(req,res)=>{
    const body = await req.json()

    const text = body.text;
    const data = await splitter(text)
    // console.log(splitter(text))

    return NextResponse.json({data:data},{status:200})
}