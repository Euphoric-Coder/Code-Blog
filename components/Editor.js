"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { marked } from "marked";
import "react-markdown-editor-lite/lib/index.css";

// Dynamically load MdEditor only on the client
const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false,
});

export default function EditorPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleEditorChange = ({ text }) => {
    setContent(text);
  };

  const handleSubmit = async () => {
    const slug = title.toLowerCase().replace(/ /g, "-");

    console.log({ title, content, slug });
  };

  return (
    <div className="p-8">
      <input
        type="text"
        placeholder="Blog Title"
        className="w-full p-2 mb-4 border rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <MdEditor
        value={content}
        style={{ height: "500px" }}
        renderHTML={(text) => marked(text)}
        onChange={handleEditorChange}
      />
      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        onClick={handleSubmit}
      >
        Save Blog
      </button>
    </div>
  );
}
