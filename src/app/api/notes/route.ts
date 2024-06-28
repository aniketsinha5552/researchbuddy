import { getAuthSession } from "@/utils/auth";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

let prisma = new PrismaClient();

export const GET = async (req: Request, res: Response) => {
  const session = await getAuthSession()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  let { searchParams } = new URL(req.url)
  let fileId: any = searchParams.get("fileId")

  try {
    let note = await prisma.notes.findFirst({
      where: {
        file_id: fileId
      }
    })
    if(!note){
      return NextResponse.json({content: "Start taking notes"})
    }
    prisma.$disconnect()
    return NextResponse.json(note)
  } catch (e) {
    return NextResponse.json({ message: "Some Error Occured. Please try again." }, { status: 404 })
  }
}

export const POST = async (req: Request, res: Response) => {
  const body = await req.json();

  let fileId = body.fileId;
  let content = body.content;

  try {
    // first check if a note exists for that fileId
    let existingNotes = await prisma.notes.findMany({
      where: {
        file_id: fileId
      }
    });

    if (existingNotes.length > 0) {
      // update the existing note
      let updatedNote = await prisma.notes.update({
        where: {
          id: existingNotes[0].id // Assuming `id` is the primary key of the notes table
        },
        data: {
          content: content
        }
      });
      return NextResponse.json({ message: updatedNote }, { status: 200 });
    } else {
      // create a new note
      let newNote = await prisma.notes.create({
        data: {
          content: content,
          file_id: fileId
        }
      });
      return NextResponse.json({ message: newNote }, { status: 204 });
    }
  } catch (e: any) {
    return NextResponse.json({ message: "Some error occurred. Please try again." }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};