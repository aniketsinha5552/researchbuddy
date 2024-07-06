"use client";
import FileUpload from "@/components/FileUpload";
import Card from "@/components/card";
import { Icon } from "@iconify/react/dist/iconify.js";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";
import { ThemeContext } from "@emotion/react";
import Loading2 from "./Loading2";

const Dashboard = () => {
  const [files, setFiles] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedFileId, setSelectedFileId] = useState("");
  const [loading,setLoading] = useState(false)

  const getFiles = async () => {
    setLoading(true)
    try {
      let res = await axios.get("/api/files?cache=true");
      //  console.log(res.data.files);
      setFiles(res.data.files);
    } catch (e: any) {
      //  
    }finally{
      setLoading(false)
    }

  };

  useEffect(() => {
    getFiles();
  }, []);

  const handleClickOpen = (fileId: string) => {
    setSelectedFileId(fileId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedFileId("");
  };

  const handleDelete = async () => {
    if (selectedFileId) {
      await axios.post(`/api/file/${selectedFileId}`);
      getFiles();
      handleClose();
    }
  };

  const router = useRouter();

  return (
    <div className="p-4 min-h-screen">
      <div className="md:text-3xl text-2xl text-bold text-center mb-10">
        Upload & Start Interacting with Your Files
      </div>
      <div className={`w-fit m-auto p-5 border-2 border-gray-400 border-dotted rounded-xl`}>
        <FileUpload getFiles={getFiles} />
      </div>
      <h2 className="text-xl mt-8 m-6 flex justify-start items-center gap-2">My Documents <Icon icon="oui:documents" /></h2>
      <div className="flex flex-row ml-4 w-full flex-wrap gap-8 justify-center md:justify-start p-2">
        { (files.length > 0 && loading==false)? 
          files.map((file: any) => {
            return (
              <div onClick={() => router.push(`/file/${file.id}`)} key={file.id}>
                <Card>
                  <p className="text-bold text-xl max-w-96 overflow-hidden break-words">
                    {file.name.substring(0, 60)}
                  </p>
                  <p className="text-md text-slate-500">
                    Created At: {new Date(file.created_at).toDateString()}
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClickOpen(file.id);
                    }}
                    className="absolute cursor-pointer hover:bg-red-700 rounded bottom-1 right-1"
                  >
                    <Icon style={{ fontSize: "2rem" }} icon="ic:baseline-delete" />
                  </button>
                </Card>
              </div>
            );
          }):
          (files.length == 0 && loading==false) ?
            <div>No Files Uploaded :( </div> :
            <Loading2/>
            }
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this file and all associated messages?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Dashboard;