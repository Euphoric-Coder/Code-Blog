"use client";

import React, { useEffect, useRef, useState } from "react";
import ImageKit from "imagekit-javascript";
import { FiUploadCloud } from "react-icons/fi";
import { Button } from "./ui/button";
import Image from "next/image";
import { Label } from "./ui/label";

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

export default function ImageUpload({
  uploadData,
  setUploadData,
  fileId,
  setFileId,
  handleInputChange,
  tutorial = false,
}) {
  const inputRef = useRef(null);
  const [progress, setProgress] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    // Whenever uploadData or fileId changes, we call handleInputChange
    // Only call if both are defined, or tweak the logic as needed
    if (uploadData && fileId && !tutorial) {
      handleInputChange("coverImage", {
        data: uploadData,
        fileId: fileId,
      });
    }
  }, [uploadData, fileId, handleInputChange]);

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

  // const handleDrop = (e) => {
  //   e.preventDefault();
  //   setIsDragging(false);
  //   const file = e.dataTransfer.files?.[0];
  //   if (file) handleUpload(file);
  // };

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleUpload(file);
    } else {
      // Handle browser drag (e.g. from Chrome)
      const htmlData = e.dataTransfer.getData("text/html");
      const urlMatch = htmlData.match(/src\s*=\s*"([^"]+)"/);
      const imageUrl = urlMatch?.[1];

      if (imageUrl) {
        try {
          const res = await fetch(imageUrl);
          const blob = await res.blob();
          const fileName =
            imageUrl.split("/").pop()?.split("?")[0] || "image.jpg";
          const fileFromUrl = new File([blob], fileName, { type: blob.type });
          handleUpload(fileFromUrl);
        } catch (err) {
          console.error("Failed to fetch image from URL:", err);
          alert("Could not upload image from browser source");
        }
      }
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) handleUpload(file);
  };

  const handleReUpload = async () => {
    if (fileId) await deleteFile(fileId);
    setUploadData(null);
    setProgress(null);
    setFileId(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="mt-2 mb-5">
      {!uploadData ? (
        <>
          <label
            htmlFor="cover-upload"
            className="text-lg font-semibold text-blue-100 bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-500 px-3 py-1 rounded-full shadow-md transform -translate-y-12 -translate-x-1/5 transition-all duration-300 ease-in-out z-20 cursor-pointer hover:scale-105"
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
            className={`relative mt-5 flex flex-col items-center justify-center p-8 border-[3px] rounded-xl cursor-pointer transition-all shadow-md hover:shadow-lg
              ${
                isDragging
                  ? "border-blue-600 bg-gradient-to-br from-cyan-100 to-indigo-200 dark:from-[#0f172a] dark:to-[#1e3a8a]"
                  : "border-blue-300 bg-gradient-to-br from-cyan-50 to-indigo-100 dark:from-[#1c1c1c] dark:to-[#0f172a]"
              }`}
          >
            <FiUploadCloud className="text-blue-600 dark:text-blue-400 text-6xl mb-4" />
            <div className="text-center">
              <p className="text-blue-800 dark:text-blue-300 text-lg font-semibold">
                Drag & Drop your image here
              </p>
              <p className="text-md text-indigo-500 dark:text-indigo-300 mt-1">
                or click to browse files
              </p>
              <p className="text-sm text-red-500 dark:text-red-400 mt-1 font-medium">
                Only image files (.jpg, .jpeg, .png, .gif, .webp) are allowed
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
          <div className="mb-6">
            <Label
              htmlFor="blog-cover-image"
              className="text-lg font-semibold text-blue-100 bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-500 px-3 py-1 rounded-full shadow-md transform -translate-y-12 -translate-x-1/5 transition-all duration-300 ease-in-out z-20 cursor-pointer hover:scale-105"
            >
              Blog Cover Image
            </Label>
            <div className="relative flex flex-col items-center gap-6 mt-4 p-6 border-2 border-dashed border-blue-300 rounded-2xl bg-gradient-to-br from-cyan-50 to-indigo-100 shadow-lg hover:shadow-xl transition-all duration-300">
              {/* Image Block */}
              <div className="flex-1 max-w-md overflow-hidden rounded-xl shadow-md transition-transform duration-300 hover:scale-105">
                <Image
                  src={uploadData.url}
                  alt="Blog Cover"
                  width={500}
                  height={500}
                  className="w-full h-[300px] object-cover rounded-xl"
                  draggable={false}
                />
              </div>

              {/* Info and Actions - stacked below image for better alignment */}
              <div className="flex flex-col gap-3 justify-center items-center w-full md:w-auto md:items-start text-center md:text-left">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                  Cover Image Uploaded
                </h3>
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    handleReUpload();
                  }}
                  className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-white font-medium px-5 py-2 rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300"
                >
                  Reupload Image
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
