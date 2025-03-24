"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import "react-markdown-editor-lite/lib/index.css";
import { markdownToHtml } from "./markdownProcessor";

// Load the editor dynamically on client side
const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false,
});

export default function EditorPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [html, setHtml] = useState("");

  const handleEditorChange = async ({ text }) => {
    setContent(text);
    const rendered = await markdownToHtml(text);
    setHtml(rendered);
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
        className="w-full p-2 mb-4 border rounded dark:bg-slate-800 dark:text-white dark:border-slate-600"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className="mb-8">
        <MdEditor
          value={content}
          style={{ height: "500px" }}
          renderHTML={() => html}
          onChange={handleEditorChange}
        />
      </div>
      <div
        className="prose prose-lg dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        onClick={handleSubmit}
      >
        Save Blog
      </button>
    </div>
  );
}
