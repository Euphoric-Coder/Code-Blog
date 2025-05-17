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
import Placeholder from "@tiptap/extension-placeholder";
import TurndownService from "turndown";

// Highlight + Lowlight
import { common, createLowlight } from "lowlight";
const lowlight = createLowlight(common);

import { useState } from "react";
import CodeBlockComponent from "./Blog/CodeBlock";
import { Button } from "./ui/button";
import {
  MdFormatBold,
  MdFormatItalic,
  MdFormatQuote,
  MdCode,
  MdFormatListBulleted,
  MdFormatListNumbered,
  MdTitle,
  MdLink,
  MdTableChart,
} from "react-icons/md";
import { toast } from "sonner";

const MenuBar = ({ editor }) => {
  if (!editor) return null;

  const buttonStyle = (isActive) =>
    `text-sm px-3 py-1 rounded transition ${
      isActive
        ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white dark:from-blue-600 dark:to-purple-700"
        : "bg-muted text-foreground hover:bg-muted/80 dark:bg-slate-800 dark:hover:bg-slate-700"
    }`;

  return (
    <div className="sticky top-0 z-50 flex flex-wrap rounded-2xl gap-2 border-2 p-4 backdrop-blur-md bg-white/60 dark:bg-slate-900/60">
      {[1, 2, 3].map((level) => (
        <Button
          key={level}
          className={buttonStyle(editor.isActive("heading", { level }))}
          onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
        >
          <MdTitle className="mr-1" /> H{level}
        </Button>
      ))}

      <Button
        className={buttonStyle(editor.isActive("bulletList"))}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <MdFormatListBulleted className="mr-1" /> Bullet
      </Button>
      <Button
        className={buttonStyle(editor.isActive("orderedList"))}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <MdFormatListNumbered className="mr-1" /> Numbered
      </Button>
      <Button
        className={buttonStyle(editor.isActive("bold"))}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <MdFormatBold className="mr-1" /> Bold
      </Button>
      <Button
        className={buttonStyle(editor.isActive("italic"))}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <MdFormatItalic className="mr-1" /> Italic
      </Button>
      <Button
        className={buttonStyle(editor.isActive("blockquote"))}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      >
        <MdFormatQuote className="mr-1" /> Quote
      </Button>
      <Button
        className={buttonStyle(editor.isActive("codeBlock"))}
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
      >
        <MdCode className="mr-1" /> Code Block
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
        <MdTableChart className="mr-1" /> Table
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
        <MdLink className="mr-1" /> Link
      </Button>
    </div>
  );
};

export default function TutorialEditor() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      Placeholder.configure({
        placeholder: "Start writing your tutorial here...",
      }),
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
          "prose dark:prose-invert max-w-none p-4 min-h-[750px] rounded-3xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  const handleSubmit = async () => {
    if (!title) {
      toast.error("Please enter a title");
      return;
    }

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

      <div className="flex flex-col space-y-5">
        <MenuBar editor={editor} />
        <EditorContent
          editor={editor}
          className="overflow-y-auto max-h-[1000px]"
        />
      </div>

      <button
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        onClick={handleSubmit}
      >
        Save Tutorial
      </button>
    </div>
  );
}
