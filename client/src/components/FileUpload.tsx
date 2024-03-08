import React, { useState } from 'react'
import axios from 'axios'

const SERVER_URL = "http://localhost:8081";

function FileUpload() {
    const [file, setFile] = useState<File | undefined>();
    const [upload, setUpload] = useState(false);
    const [message, setMessage] = useState<string | undefined>();

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
            setMessage(undefined);
        }
    }

    const handleUpload = async () => {
      setUpload(true);
      const formdata = new FormData();
      formdata.append('file', file as Blob);
      axios.post(SERVER_URL + '/upload', formdata)
      .then(res => {
        setUpload(false);
        if (res.status === 201) {
          setMessage('File uploaded successfully');
          setFile(undefined);
        } else {
          setMessage('File upload failed');
        }
      })
      .catch(err => {
        setUpload(false);
        setMessage('File upload failed');
        console.error(err);
      });
    }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
        <div className="p-6 m-4 bg-white rounded shadow-md">
            <h2 className="text-lg font-semibold text-center text-gray-700 mb-4">Upload File</h2>
            <input className="w-full px-3 py-2 mb-3 text-gray-700 border rounded-lg focus:outline-none" type="file" onChange={handleFile} />
            <button className="w-full px-3 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md" onClick={handleUpload}>{upload ? "Upload..." : "Upload"}</button>
            {message && <p className="mt-3 text-center">{message}</p>}
        </div>
    </div>
  )
}

export default FileUpload