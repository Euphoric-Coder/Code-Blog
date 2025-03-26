// components/SlashCommand.jsx
"use client";

import { useEffect, useState } from "react";
import { BubbleMenu } from "@tiptap/react";

const COMMANDS = [
  {
    title: "Heading 1",
    description: "Large section heading",
    command: (editor) =>
      editor.chain().focus().toggleHeading({ level: 1 }).run(),
  },
  {
    title: "Heading 2",
    description: "Medium section heading",
    command: (editor) =>
      editor.chain().focus().toggleHeading({ level: 2 }).run(),
  },
  {
    title: "Bullet List",
    description: "Create a bullet list",
    command: (editor) => editor.chain().focus().toggleBulletList().run(),
  },
  {
    title: "Ordered List",
    description: "Create a numbered list",
    command: (editor) => editor.chain().focus().toggleOrderedList().run(),
  },
  {
    title: "Quote",
    description: "Blockquote style",
    command: (editor) => editor.chain().focus().toggleBlockquote().run(),
  },
  {
    title: "Code Block",
    description: "Insert code block",
    command: (editor) => editor.chain().focus().toggleCodeBlock().run(),
  },
];

export default function SlashCommand({ editor }) {
  const [isSlash, setIsSlash] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "/") {
        setIsSlash(true);
        setQuery("");
      } else if (isSlash && e.key.length === 1) {
        setQuery((prev) => prev + e.key);
      } else if (e.key === "Escape") {
        setIsSlash(false);
        setQuery("");
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isSlash]);

  if (!isSlash) return null;

  const filtered = COMMANDS.filter((cmd) =>
    cmd.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <BubbleMenu
      editor={editor}
      tippyOptions={{ duration: 100 }}
      className="z-50"
    >
      <div className="w-72 rounded-md border bg-white dark:bg-slate-900 shadow-md p-2 space-y-1">
        {filtered.map((item, idx) => (
          <button
            key={idx}
            onClick={() => {
              item.command(editor);
              setIsSlash(false);
            }}
            className="w-full text-left px-3 py-2 rounded-md hover:bg-blue-100 dark:hover:bg-blue-800"
          >
            <div className="font-medium text-sm">{item.title}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {item.description}
            </div>
          </button>
        ))}
        {filtered.length === 0 && (
          <div className="text-sm text-gray-500 px-3 py-2">
            No commands found
          </div>
        )}
      </div>
    </BubbleMenu>
  );
}
