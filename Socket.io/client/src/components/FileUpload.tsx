import React, { useState } from 'react'
import { io } from 'socket.io-client'

const SERVER_URL = "http://localhost:8081";
const socket = io(SERVER_URL);

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
      const reader = new FileReader();
      reader.onload = (event) => {
        const fileData = event.target?.result;
        if (file) {
          socket.emit('upload', { name: file.name, file: fileData });
        }
      };
      reader.readAsArrayBuffer(file as Blob);
    }

    socket.on('done', (msg: string) => {
      setUpload(false);
      setMessage(msg);
      setFile(undefined);
    });

    socket.on('error', (msg: string) => {
        setUpload(false);
        setMessage(msg);
    });

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