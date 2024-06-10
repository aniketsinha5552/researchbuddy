import Dashboard from "@/components/Dashboard";
import { ToastContainer } from "react-toastify";

export default async function Home() {

  
  return (
     <div className="p-4">
        {/* <h1 className="text-2xl">Research Buddy</h1>  */}
      <Dashboard/>
      <ToastContainer/>
     </div>
  );
}
