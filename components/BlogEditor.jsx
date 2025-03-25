"use client";

import { useEditor, EditorContent, ReactNodeViewRenderer } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import TurndownService from "turndown";

// Highlight + Lowlight
import { all, common, createLowlight } from "lowlight";
const lowlight = createLowlight(common);

import { useState } from "react";
import CodeBlockComponent from "./CodeBlogComponent";
import { Button } from "./ui/button";
import Placeholder from "@tiptap/extension-placeholder";

const MenuBar = ({ editor }) => {
  if (!editor) return null;

  const buttonStyle = (isActive) =>
    `text-sm px-3 py-1 rounded transition ${
      isActive
        ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white dark:from-blue-600 dark:to-purple-700"
        : "bg-muted text-foreground hover:bg-muted/80 dark:bg-slate-800 dark:hover:bg-slate-700"
    }`;

  return (
    <div className="flex flex-wrap gap-2 border p-2 rounded-t bg-slate-100 dark:bg-slate-800">
      {[1, 2, 3, 4, 5, 6].map((level) => (
        <Button
          key={level}
          className={buttonStyle(editor.isActive("heading", { level }))}
          onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
        >
          H{level}
        </Button>
      ))}
      <Button
        className={buttonStyle(editor.isActive("bulletList"))}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        • Bullet
      </Button>
      <Button
        className={buttonStyle(editor.isActive("orderedList"))}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        1. Numbered
      </Button>
      <Button
        className={buttonStyle(editor.isActive("bold"))}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        Bold
      </Button>
      <Button
        className={buttonStyle(editor.isActive("italic"))}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        Italic
      </Button>
      <Button
        className={buttonStyle(editor.isActive("blockquote"))}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      >
        Quote
      </Button>
      <Button
        className={buttonStyle(editor.isActive("codeBlock"))}
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
      >
        Code Block
      </Button>
      <Button
        className={buttonStyle(editor.isActive("table"))}
        onClick={() =>
          editor
            .chain()
            .focus()
            .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
            .run()
        }
      >
        Table
      </Button>
      <Button
        className={buttonStyle(editor.isActive("link"))}
        onClick={() => {
          const url = prompt("Enter URL");
          if (url) {
            editor.chain().focus().setLink({ href: url }).run();
          }
        }}
      >
        Link
      </Button>
    </div>
  );
};

export default function BlogEditor() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      Placeholder.configure({ placeholder: "Start writing your blog here..." }),
      Document,
      Paragraph,
      Text,
      Link,
      Image,
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      CodeBlockLowlight.extend({
        addNodeView() {
          return ReactNodeViewRenderer(CodeBlockComponent);
        },
      }).configure({ lowlight }),
    ],
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert max-w-none p-4 min-h-[300px] rounded-b border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  const handleSubmit = async () => {
    const slug = title.toLowerCase().replace(/ /g, "-");

    const turndownService = new TurndownService({ headingStyle: "atx" });

    // ✅ Add custom rule for code blocks with language
    turndownService.addRule("fencedCodeBlockWithLang", {
      filter: (node) =>
        node.nodeName === "PRE" &&
        node.firstChild &&
        node.firstChild.nodeName === "CODE",
      replacement: (content, node) => {
        const codeNode = node.firstChild;
        const language = (codeNode.getAttribute("class") || "")
          .replace("language-", "")
          .trim();

        return `\n\n\`\`\`${language || ""}\n${
          codeNode.textContent
        }\n\`\`\`\n\n`;
      },
    });

    const markdown = turndownService.turndown(content);

    console.log({ title, markdown, slug });
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

      <div className="border rounded-lg overflow-hidden">
        <MenuBar editor={editor} />
        <EditorContent editor={editor} />
      </div>

      <h2 className="mt-6 text-xl font-semibold text-gray-700 dark:text-gray-300">
        👀 Live HTML Preview
      </h2>
      <div
        className="prose dark:prose-invert mt-4 p-4 rounded border dark:border-slate-700 border-gray-300 bg-white dark:bg-slate-900"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      <button
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        onClick={handleSubmit}
      >
        Save Blog
      </button>
    </div>
  );
}
