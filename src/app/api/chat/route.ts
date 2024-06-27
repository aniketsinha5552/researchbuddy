import { getAuthSession } from "@/utils/auth"
import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

let prisma = new PrismaClient()

export const GET=async(req:Request,res:Response)=>{
  const session = await getAuthSession()
  if(!session){
      return NextResponse.json({error: "Unauthorized"}, {status: 401})
  }
    const {searchParams} = new URL(req.url)

    let fileId = searchParams.get("fileId")??""



    try{
        let messages = await prisma.message.findMany({
            where:{
                file_id: fileId
            }
        })
        await prisma.$disconnect()
        return NextResponse.json(messages)
    }catch(e:any){
        return NextResponse.json({error:e.message},{status:404})
    }

}




export const POST = async (req:Request, res:Response) => {
    try {
      const { fileId, message, type } = await req.json();
  
      // Find the highest sequence number for the given fileId
      const highestSequenceMessage = await prisma.message.findFirst({
        where: { file_id: fileId },
        orderBy: { sequence: 'desc' },
      });
  
      // Increment the sequence number by 1
      const newSequence = highestSequenceMessage ? highestSequenceMessage.sequence + 1 : 1;
  
      // Create a new message
      const newMessage = await prisma.message.create({
        data: {
          text: message,
          sequence: newSequence,
          file_id: fileId,
          type: type
        },
      });
  
      return NextResponse.json(newMessage);
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'An error occurred while creating the message.' },{status:500});
    } finally {
      await prisma.$disconnect();
    }
  };