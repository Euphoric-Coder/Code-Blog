"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import "react-markdown-editor-lite/lib/index.css";
import { markdownToHtml } from "./markdownProcessor";

// Dynamically load the Markdown editor
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
      <div className="mb-8 flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <MdEditor
            value={content}
            style={{ height: "750px", width: "100%" }}
            renderHTML={() => html}
            config={{
              view: {
                menu: true,
                md: true,
                html: false,
              },
              canView: {
                menu: true,
                md: false,
                html: false,
                both: false,
                fullScreen: true,
              },
            }}
            onChange={handleEditorChange}
            placeholder="Write your blog content here..."
          />
        </div>
        <div className="md:w-1/2">
          <div className="rounded-xl border dark:border-slate-700 border-gray-300 p-6 bg-white dark:bg-slate-900 shadow-sm overflow-y-auto min-h-[750px]">
            <div
              className="prose prose-lg dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        </div>
      </div>
      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        onClick={handleSubmit}
      >
        Save Blog
      </button>
    </div>
  );
}
