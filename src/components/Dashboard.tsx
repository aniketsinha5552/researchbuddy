"use client";
import FileUpload from "@/components/FileUpload";
import Card from "@/components/card";
import { Icon } from "@iconify/react/dist/iconify.js";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";

const Dashboard = () => {
  const [files, setFiles] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedFileId, setSelectedFileId] = useState("");

  const getFiles = async () => {
    let res = await axios.get("/api/files");
   //  console.log(res.data.files);
    setFiles(res.data.files);
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
    <div className="p-4">
      <div className="md:text-3xl text-2xl text-bold text-center mb-10">
        Upload & Start Interacting with Your Files
      </div>
      <div className="flex flex-row flex-wrap gap-8 justify-center md:justify-start p-2">
        <Card>
          <FileUpload getFiles={getFiles} />
        </Card>
        {files.length > 0 &&
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
                    className="absolute cursor-pointer hover:bg-red-200 bottom-1 right-1"
                  >
                    <Icon style={{ fontSize: "2rem" }} icon="ic:baseline-delete" />
                  </button>
                </Card>
              </div>
            );
          })}
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