"use client"
import React, { useRef, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const FileUpload = () => {
  const fileRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<any>(null);
  const [error, setError] = useState('');
  const [disableUpload, setDisableUpload]= useState(true)
  
  const notify = () => toast("File uploaded successfully");

  const handleFileChange = (e: any) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      if (selectedFile.type !== 'application/pdf') {
        setError('Please select a PDF file');
        setFile(null);
        return;
      }

      if (selectedFile.size > 5 * 1024 * 1024) {
        setError('File size should be less than 5MB');
        setFile(null);
        return;
      }

      setError('');
      setFile(selectedFile);
      setDisableUpload(false)
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('No file selected');
      return;
    }
    setDisableUpload(true)

    const formData = new FormData();
    formData.append('data', file);
    console.log(file)
    console.log(formData)

    try {
      // get the pre signed url from the api
      const res = await axios.get('/api/upload');
      let url = res?.data?.url
      let fileName = res?.data?.fileName

      try {
        const response = await axios.put(url, file, {
          headers: {
            'Content-Type': file?.type
          },
          maxBodyLength: Infinity,
          data: file,
          timeout: 10000 // Set a reasonable timeout value
        });
        console.log('File uploaded successfully:', response.data);
      } catch (e: any) {
        console.log(e)
      }
      
      console.log('File uploaded successfully');
      setFile(null)
      if (fileRef.current) {
        fileRef.current.value = '';
      }

      console.log(process.env.AWS_S3_URL)
      let res3 = await axios.post("/api/createFile",{
        url: `${fileName}`,
        name: file?.name
      })

      // setDisableUpload(false)
      notify()

    } catch (error) {
      console.error('Error uploading file', error);
      setError('Error uploading file');
    }
  };



  return (
    <div>
      <input type="file" ref= {fileRef} id="file" onChange={handleFileChange} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button style={{color: disableUpload?"gray":"green"}} onClick={handleUpload} disabled={disableUpload}>Upload</button>
    </div>
  );
};

export default FileUpload;
