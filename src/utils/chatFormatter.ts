import { Message } from "@prisma/client";

export const chatFormatter=(chat: Message[]): string=>{
    let ans = ""
    chat.forEach((message:Message)=>{
        ans = ans+ `${message.type}: ${message.text}, `
    })
    console.log(ans)
    return ans
}