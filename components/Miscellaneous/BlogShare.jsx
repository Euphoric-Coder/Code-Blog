"use client";

import React, { useEffect, useState } from "react";
import {
  X,
  MessageCircle,
  Twitter,
  Linkedin,
  Mail,
  Link,
  Copy,
  Check,
  Send,
  ExternalLink,
} from "lucide-react";

const BlogShare = ({ isOpen, onClose, title, description, url }) => {
  const [copied, setCopied] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setShowToast(true);
      setTimeout(() => {
        setCopied(false);
        setShowToast(false);
      }, 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  const shareOptions = [
    {
      name: "WhatsApp",
      icon: MessageCircle,
      color: "bg-green-500 hover:bg-green-600",
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(
        `${title} - ${url}`
      )}`,
    },
    {
      name: "Twitter",
      icon: Twitter,
      color: "bg-blue-500 hover:bg-blue-600",
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        title
      )}&url=${encodeURIComponent(url)}`,
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      color: "bg-blue-700 hover:bg-blue-800",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        url
      )}`,
    },
    {
      name: "Email",
      icon: Mail,
      color: "bg-gray-600 hover:bg-gray-700",
      url: `mailto:?subject=${encodeURIComponent(
        title
      )}&body=${encodeURIComponent(`${description}\n\n${url}`)}`,
    },
  ];

  const bonusOptions = [
    {
      name: "Reddit",
      icon: ExternalLink,
      color: "bg-orange-500 hover:bg-orange-600",
      url: `https://reddit.com/submit?url=${encodeURIComponent(
        url
      )}&title=${encodeURIComponent(title)}`,
    },
    {
      name: "Telegram",
      icon: Send,
      color: "bg-sky-500 hover:bg-sky-600",
      url: `https://t.me/share/url?url=${encodeURIComponent(
        url
      )}&text=${encodeURIComponent(title)}`,
    },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
            Share this article
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700"
          >
            <X className="w-5 h-5 text-slate-600 dark:text-slate-300" />
          </button>
        </div>

        <div className="mb-4">
          <h3 className="text-base font-medium mb-1 dark:text-white">
            {title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          {shareOptions.map((option) => (
            <a
              key={option.name}
              href={option.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-2 p-3 rounded-lg text-white ${option.color}`}
            >
              <option.icon className="w-4 h-4" />
              <span>{option.name}</span>
            </a>
          ))}
        </div>

        <button
          onClick={copyToClipboard}
          className="w-full flex items-center justify-center gap-2 p-3 bg-slate-100 dark:bg-slate-700 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600"
        >
          {copied ? (
            <>
              <Check className="text-green-500 w-4 h-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="text-slate-600 dark:text-slate-300 w-4 h-4" />
              Copy Link
            </>
          )}
        </button>

        <div className="hidden sm:grid grid-cols-2 gap-3 mt-6 pt-4 border-t dark:border-slate-600">
          {bonusOptions.map((option) => (
            <a
              key={option.name}
              href={option.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-2 p-2.5 text-white text-sm rounded-lg ${option.color}`}
            >
              <option.icon className="w-4 h-4" />
              {option.name}
            </a>
          ))}
        </div>

        {showToast && (
          <div className="fixed bottom-6 right-6 bg-green-500 text-white px-4 py-2 rounded-lg shadow-md flex items-center gap-2">
            <Check className="w-4 h-4" />
            Link copied!
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogShare;
