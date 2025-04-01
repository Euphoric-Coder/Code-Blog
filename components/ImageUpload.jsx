"use client";

import React, { useRef, useState } from "react";
import ImageKit from "imagekit-javascript";
import { FiUploadCloud } from "react-icons/fi";
import { Button } from "./ui/button";
import Image from "next/image";

const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;
const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

const uploadToImageKit = async (
  file,
  setProgress,
  setData,
  setFileId,
  setId,
  setURL
) => {
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
        setId(result.fileId);
        setURL(result.url);
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

export default function ImageUpload({ setImgURL, setImgId }) {
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
    await uploadToImageKit(file, setProgress, setUploadData, setFileId, setImgId, setImgURL);
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
    setImgId(null);
    setImgURL(null);
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
          <div className="p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-800 dark:via-gray-900 dark:to-gray-950 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-800 dark:text-gray-200 font-medium">
                  <strong>Uploaded File:</strong> {uploadData.name}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  File size: {(uploadData.size / 1024).toFixed(2)} KB
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleReset}
                  className="px-4 py-2 font-semibold text-white bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 dark:from-blue-500 dark:via-purple-600 dark:to-pink-500 rounded-xl shadow-xl hover:from-blue-500 hover:to-purple-700 dark:hover:from-purple-600 dark:hover:to-pink-600 transition-transform transform hover:scale-110 hover:backdrop-brightness-125 dark:hover:backdrop-brightness-110"
                >
                  Reupload
                </Button>
              </div>
            </div>
            <div>
              <p className="text-gray-800 dark:text-gray-200 font-medium">
                <strong>Cover Image Preview</strong>
              </p>
              <Image src={uploadData.url} alt="Uploaded" width={300} height={300}/>
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
