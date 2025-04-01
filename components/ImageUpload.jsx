"use client";

import React, { useRef, useState } from "react";
import ImageKit from "imagekit-javascript";
import { FiUploadCloud } from "react-icons/fi";
import { Button } from "./ui/button";

const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;
const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

const uploadToImageKit = async (file, setProgress, setData, setFileId) => {
  const auth = await fetch("/api/upload-auth").then((res) => res.json());

  const imagekit = new ImageKit({
    publicKey,
    urlEndpoint,
    authenticationEndpoint: "",
  });

  imagekit.upload(
    {
      file,
      fileName: file.name,
      useUniqueFileName: true,
      folder: "/cover-image",
      token: auth.token,
      signature: auth.signature,
      expire: auth.expire,
    },
    (err, result) => {
      if (err) {
        console.error("Upload failed", err);
        alert("Upload failed!");
      } else {
        console.log("Upload success", result);
        setData(result);
        setFileId(result.fileId);
        setProgress(null);
      }
    },
    (progress) => {
      setProgress(progress.progress.toFixed(0));
    }
  );
};

const deleteFile = async (fileId) => {
  if (!fileId) return;
  try {
    await fetch("/api/delete-image", {
      method: "POST",
      body: JSON.stringify({ fileId }),
    });
    console.log("Deleted previous file:", fileId);
  } catch (err) {
    console.error("Delete failed", err);
  }
};

export default function ImageUpload() {
  const inputRef = useRef(null);
  const [progress, setProgress] = useState(null);
  const [uploadData, setUploadData] = useState(null);
  const [fileId, setFileId] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleUpload = async (file) => {
    if (!file?.type.startsWith("image/")) {
      alert("Invalid image type");
      return;
    }

    // Delete previous uploaded file before uploading new
    if (fileId) await deleteFile(fileId);

    setUploadData(null);
    setFileId(null);
    setProgress(0);
    await uploadToImageKit(file, setProgress, setUploadData, setFileId);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleUpload(file);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) handleUpload(file);
  };

  const handleReset = async () => {
    if (fileId) await deleteFile(fileId);
    setUploadData(null);
    setProgress(null);
    setFileId(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleReUpload = async () => {
    if (fileId) await deleteFile(fileId);
    setUploadData(null);
    setProgress(null);
    setFileId(null);
    if (inputRef.current) inputRef.current.value = "";
    inputRef.current.click();
  };

  return (
    <div className="mt-6">
      {!uploadData ? (
        <>
          <label
            htmlFor="cover-upload"
            className="absolute left-6 text-lg font-semibold text-blue-100 bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-500 px-3 py-1 rounded-full shadow-md transform -translate-y-12 -translate-x-1/5 transition-all duration-300 ease-in-out z-20 cursor-pointer hover:scale-105"
          >
            Upload Cover Image
          </label>

          <div
            onDrop={handleDrop}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            className={`relative flex flex-col items-center justify-center p-8 border-2 rounded-xl cursor-pointer transition-all ${
              isDragging
                ? "border-blue-600 bg-gradient-to-br from-cyan-100 to-indigo-200"
                : "border-blue-300 bg-gradient-to-br from-cyan-50 to-indigo-100"
            } shadow-md hover:shadow-lg`}
          >
            <FiUploadCloud className="text-blue-600 text-6xl mb-4" />
            <div className="text-center">
              <p className="text-blue-800 text-lg font-semibold">
                Drag & Drop your image here
              </p>
              <p className="text-md text-indigo-500 mt-1">
                or click to browse files
              </p>
            </div>
            <input
              ref={inputRef}
              type="file"
              id="cover-upload"
              className="absolute inset-0 opacity-0 cursor-pointer"
              accept="image/*"
              onChange={handleFileSelect}
            />
          </div>
        </>
      ) : (
        <>
          <div className="p-4 border rounded-md mt-4 bg-gradient-to-br from-gray-50 to-gray-100 shadow-sm flex flex-col items-center gap-3">
            <p className="text-green-600 font-medium">Upload Successful</p>
            <img
              src={uploadData.url}
              alt="Uploaded"
              className="rounded-lg shadow-md max-w-full max-h-[300px]"
            />
            <p className="text-blue-600 text-sm break-words text-center">
              <a
                href={uploadData.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {uploadData.url}
              </a>
            </p>
            <div className="flex gap-4 mt-3">
              <Button onClick={handleReUpload}>Reupload</Button>
              {/* <Button onClick={() => inputRef.current.click()}>Reupload</Button> */}
              <Button variant="destructive" onClick={handleReset}>
                Reset
              </Button>
            </div>
          </div>
        </>
      )}

      {progress !== null && (
        <div className="mt-4 text-blue-600 font-semibold">
          Upload Progress: {progress}%
        </div>
      )}
    </div>
  );
}
