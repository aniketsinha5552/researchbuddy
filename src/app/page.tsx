import Card from "@/components/card";
import Image from "next/image";

export default function Home() {
  return (
     <div className="p-4">
        {/* <h1 className="text-2xl">Research Buddy</h1>  */}
        <div className="flex flex-row flex-wrap gap-5">
        <Card>
            File 1
         </Card>
         <Card>
            File 2
         </Card>
         <Card>
        <input type="file" placeholder="upload pdf"/>

         </Card>
        </div>

     </div>
  );
}
