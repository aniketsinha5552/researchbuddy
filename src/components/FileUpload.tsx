"use client"
import React, { useRef, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Icon } from '@iconify/react/dist/iconify.js';


const FileUpload = ({ getFiles }: {
  getFiles: () => {}
}) => {
  const fileRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<any>(null);
  const [error, setError] = useState('');
  const [disableUpload, setDisableUpload] = useState(true)
  const [isUploading, setIsUploading] = useState(false)

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
    setIsUploading(true)
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

        let arr = file.name.split('.')
        arr.pop()
        let name = arr.join()
        console.log(name)

        let res3 = await axios.post("/api/createFile", {
          url: `${process.env.NEXT_PUBLIC_S3_URL}/${fileName}`,
          name: name
        })

        console.log('File uploaded successfully:', response.data);
        getFiles()
        notify()
      } catch (e: any) {
        console.log(e)
      }

      setFile(null)
      if (fileRef.current) {
        fileRef.current.value = '';
      }

      // setDisableUpload(false)
      

    } catch (error) {
      console.error('Error uploading file', error);
      setError('Error uploading file');
    } finally {
      setIsUploading(false)
    }
  };

  const removeFile = () => {
    setFile(null)
    setDisableUpload(true)
    if (fileRef.current) {
      fileRef.current.value = '';
    }

  }



  return (
    <div className="p-6 rounded-lg">
      <div className='flex flex-row'>
      <input
        type="file"
        ref={fileRef}
        id="file"
        className="block p-2 rounded-md bg-gray-100 w-full text-sm text-gray-900 border border-gray-300 cursor-pointer focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        onChange={handleFileChange}
      />
        {!disableUpload && <button
        className="cursor-pointer"
        onClick={removeFile}
      >
        <Icon icon="ic:round-cancel" />
      </button>}
      </div>

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      {isUploading ?
        <button
          className={`mt-4 w-full px-4 py-2 text-white flex justify-center bg-green-500 hover:bg-green-600 rounded-lg focus:outline-none`}
        >
          <Icon style={{ fontSize: 30  }} icon="line-md:uploading-loop" />
        </button>
        :
        <button
          className={`mt-4 w-full px-4 py-2 text-white ${disableUpload ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'} rounded-lg focus:outline-none`}
          onClick={handleUpload}
          disabled={disableUpload}
        >
          Upload
        </button>}
    </div>
  );
};

export default FileUpload;
