"use client";

import React, { useState, useRef } from "react";
import { Upload, X, FileText } from "lucide-react";

const FileUpload = ({
  id,
  label,
  onChange,
  accept = ".pdf,.doc,.docx",
  error,
  disabled = false,
  required = false,
  className = "",
  selectedFile,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    if (!disabled) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    if (disabled) return;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      onChange(file);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      onChange(file);
    }
  };

  const handleRemoveFile = () => {
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className={`mb-4 ${className}`}>
      <label
        htmlFor={id}
        className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {!selectedFile ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            border-2 border-dashed rounded-lg p-4 text-center transition-colors
            ${
              isDragging
                ? "border-indigo-400 bg-indigo-50 dark:border-indigo-400 dark:bg-indigo-900/20"
                : "border-gray-300 dark:border-gray-600"
            }
            ${
              disabled
                ? "bg-gray-100 cursor-not-allowed dark:bg-gray-800"
                : "cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
            }
          `}
          onClick={() => !disabled && fileInputRef.current?.click()}
        >
          <div className="flex flex-col items-center justify-center py-4">
            <Upload
              className="mb-2 text-gray-500 dark:text-gray-400"
              size={24}
            />
            <p className="mb-1 text-sm text-gray-700 dark:text-gray-300">
              <span className="font-medium text-indigo-600 dark:text-indigo-400">
                Click to upload
              </span>{" "}
              or drag and drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              PDF, DOC, DOCX (MAX. 10MB)
            </p>
          </div>
          <input
            ref={fileInputRef}
            id={id}
            type="file"
            accept={accept}
            onChange={handleFileChange}
            disabled={disabled}
            className="hidden"
          />
        </div>
      ) : (
        <div className="border rounded-lg p-3 flex items-center justify-between bg-white dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <FileText
              className="text-indigo-500 dark:text-indigo-400"
              size={20}
            />
            <span className="text-sm text-gray-700 dark:text-gray-300 truncate max-w-xs">
              {selectedFile.name}
            </span>
          </div>
          {!disabled && (
            <button
              type="button"
              onClick={handleRemoveFile}
              className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
              aria-label="Remove file"
            >
              <X size={18} />
            </button>
          )}
        </div>
      )}

      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};

export default FileUpload;
