"use client";

import React, { useRef, useState } from "react";
import { PenBox, User } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FiUploadCloud } from "react-icons/fi";
import { toast } from "sonner";
import FormBackgroundEffect from "../Effect/FormBackgroundEffect";

const BasicInfoSection = ({ fullName, email, profileImage, user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(fullName || "");
  const [preview, setPreview] = useState(profileImage);
  const [newFile, setNewFile] = useState(null);
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setNewFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setNewFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    try {
      toast.loading("Updating profile...");
      const [firstName, ...rest] = name.split(" ");
      const lastName = rest.join(" ");

      await user.update({ firstName, lastName });

      if (newFile) {
        await user.setProfileImage({ file: newFile });
      }
      toast.dismiss();
      toast.success("Profile updated!");
      setIsEditing(false);
    } catch (err) {
      console.error("Update failed", err);
      toast.error("Failed to update profile");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setName(fullName);
    setPreview(profileImage);
    setNewFile(null);
    setIsDragging(false);
  };

  return (
    <div className="form-layout">
      {/* Background Effects */}
      <FormBackgroundEffect />

      <div className="flex justify-between items-start mb-4">
        <h2 className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-500 dark:from-blue-500 dark:via-indigo-500 dark:to-cyan-400 animate-gradient-text">
          Basic Information
        </h2>

        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)} className="btn9"><PenBox /> Update Profile</Button>
        ) : (
          <div className="flex gap-2">
            <Button onClick={handleSave}>Save</Button>
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        )}
      </div>

      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-4">
        {profileImage ? (
          <img
            src={profileImage}
            alt={fullName}
            width={64}
            height={64}
            className="w-16 h-16 rounded-full object-cover border-2 border-indigo-100 dark:border-indigo-900"
            draggable="false"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-500 dark:text-indigo-300">
            <User size={24} />
          </div>
        )}

        <div className="flex-1">
          <h3 className="text">{fullName}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{email}</p>
        </div>
      </div>

      {isEditing && (
        <div
          className={`relative mt-5 flex flex-col items-center justify-center p-8 border-2 rounded-xl cursor-pointer transition-all ${
            isDragging
              ? "border-blue-600 bg-gradient-to-br from-cyan-100 to-indigo-200"
              : "border-blue-300 bg-gradient-to-br from-cyan-50 to-indigo-100"
          } shadow-md hover:shadow-lg`}
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleFileDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
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
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileSelect}
          />
        </div>
      )}
    </div>
  );
};

export default BasicInfoSection;
