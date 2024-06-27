import { getAuthSession } from "@/utils/auth"
import { putObjectUrl } from "@/utils/awsTemp"
import axios from "axios"
import { NextResponse } from "next/server"

export const GET = async(req: any,res: any)=>{
    
    const session = await getAuthSession()
    if(!session){
        return NextResponse.json({error: "Unauthorized"}, {status: 401})
    }
    const email = session?.user?.email
    const date = new Date()
    const fileName = `${email}_${date.getTime()}`
    const url = await putObjectUrl( fileName, "application/pdf")
    
    return new NextResponse(JSON.stringify({url: url, fileName: fileName }))
}