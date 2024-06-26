import Dashboard from "@/components/Dashboard";
import LandingPage from "@/components/landingPage";
import { ToastContainer } from "react-toastify";

export default async function Home() {

  
  return (
     <div>
        {/* <h1 className="text-2xl">Research Buddy</h1>  */}
      {/* <Dashboard/> */}
      <LandingPage/>
      <ToastContainer/>
     </div>
  );
}
