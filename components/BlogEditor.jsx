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
import CodeBlockComponent from "./CodeComponent";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  MdFormatBold,
  MdFormatItalic,
  MdFormatQuote,
  MdCode,
  MdFormatListBulleted,
  MdFormatListNumbered,
  MdLink,
  MdTableChart,
} from "react-icons/md";
import {
  Dialog,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import { v4 as uuid } from "uuid";
import { Trash } from "lucide-react";
import ImageUpload from "./ImageUpload";

const MenuBar = ({ editor }) => {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");

  if (!editor) return null;

  const insertLink = () => {
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
      setOpen(false);
      setUrl("");
    }
  };

  const buttonStyle = (isActive) =>
    `text-md px-3 py-1 rounded-xl transition ${
      isActive
        ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white dark:from-blue-600 dark:to-purple-700"
        : "text-foreground hover:bg-muted/80 dark:hover:bg-slate-700"
    }`;

  return (
    <div className="sticky top-0 flex flex-wrap items-center justify-between rounded-tr-2xl rounded-tl-2xl gap-2 border-r border-l border-2 p-4 backdrop-blur-md bg-white/60 dark:bg-slate-900/60">
      <div className="flex gap-2 items-center">
        {[1, 2, 3].map((level) => (
          <TooltipProvider key={level}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  key={level}
                  className={buttonStyle(editor.isActive("heading", { level }))}
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level }).run()
                  }
                >
                  H{level}
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Heading {level}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className={buttonStyle(editor.isActive("bulletList"))}
                onClick={() => editor.chain().focus().toggleBulletList().run()}
              >
                <MdFormatListBulleted size={30} className="mr-1" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Bullet List</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className={buttonStyle(editor.isActive("orderedList"))}
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
              >
                <MdFormatListNumbered size={30} className="mr-1" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Numbered List</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className={buttonStyle(editor.isActive("bold"))}
                onClick={() => editor.chain().focus().toggleBold().run()}
              >
                <MdFormatBold size={30} className="mr-1" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Bold</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className={buttonStyle(editor.isActive("italic"))}
                onClick={() => editor.chain().focus().toggleItalic().run()}
              >
                <MdFormatItalic size={30} className="mr-1" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Italics</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className={buttonStyle(editor.isActive("blockquote"))}
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
              >
                <MdFormatQuote size={30} className="mr-1" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Quote</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className={buttonStyle(editor.isActive("codeBlock"))}
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              >
                <MdCode size={30} className="mr-1" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Code Block</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
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
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Table</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className={buttonStyle(editor.isActive("link"))}
                onClick={() => setOpen(true)}
              >
                <MdLink className="mr-1" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Link</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <button onClick={() => editor.commands.clearContent(true)}>
        <Trash />
      </button>

      <Dialog
        open={open}
        onOpenChange={() => {
          setOpen(false);
          setUrl("");
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Insert Link</DialogTitle>
          </DialogHeader>
          <Input
            type="url"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button>Cancel</Button>
            </DialogClose>
            <Button onClick={insertLink}>Insert</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default function BlogEditor({ initialContent = "", editing = false }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imgURL, setImgURL] = useState("");
  const [ImgId, setImgId] = useState("");
  const [uploadData, setUploadData] = useState(null);
  const [fileId, setFileId] = useState(null);
  const { user } = useUser();

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
    content: initialContent,
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

  const AddBlog = async () => {
    if (!title || content === "") {
      toast.error("Please enter both a title & content");
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

    console.log({
      id: `${slug}--${uuid()}`,
      title: title,
      mdFormat: markdown,
      htmlFormat: content,
      author: user?.fullName,
      categories: "Programming",
      subCategories: "React, Javascript",
      date: new Date().toISOString(),
      createdBy: user?.primaryEmailAddress.emailAddress,
    });
  };

  const EditBlog = async () => {
    if (!title && content) {
      toast.error("Please enter a title and content");
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

    console.log({
      id: `${slug}--${uuid()}`,
      title: title,
      mdFormat: markdown,
      htmlFormat: content,
      author: user?.fullName,
      categories: "Programming",
      subCategories: "React, Javascript",
      date: new Date().toISOString(),
    });
  };

  return (
    <div className="p-8">
      <div className="w-full bg-gradient-to-br from-white via-blue-50 to-purple-50 dark:from-[#111827] dark:via-[#0f172a] dark:to-[#1e1b4b] rounded-2xl p-6 shadow-md mb-8 transition-all duration-300">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Title & subtitle */}
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 via-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Blog Editor
            </h1>
            <p className="mt-1 text-sm text-gray-700 dark:text-gray-300 max-w-lg">
              Start writing your thoughts, stories, or tutorials. This is your
              creative space.
            </p>
            <p className="text-xs mt-1 italic text-blue-500 dark:text-cyan-400">
              "Writing is the painting of the voice."
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3">
            <button
              // onClick={handleClear}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-[#1b1b1b] border border-gray-300 dark:border-gray-700 rounded-xl shadow-sm hover:bg-gray-200 dark:hover:bg-[#2a2a2a] transition-all"
            >
              Clear
            </button>
            <button
              // onClick={handleSubmit}
              className="px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-600 dark:from-blue-600 dark:via-purple-700 dark:to-pink-600 rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition-transform"
            >
              Submit Post
            </button>
          </div>
        </div>
      </div>

      <label
        htmlFor="blog-title"
        className="text-lg font-semibold text-blue-100 bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-500 px-3 py-1 rounded-full shadow-md transform -translate-y-12 -translate-x-1/5 transition-all duration-300 ease-in-out z-20 cursor-pointer hover:scale-105"
      >
        Blog Title
      </label>
      <input
        type="text"
        id="blog-title"
        placeholder="Blog Title"
        className="w-full mt-3 p-2 mb-4 border rounded dark:bg-slate-800 dark:text-white dark:border-slate-600"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <ImageUpload uploadData={uploadData} setUploadData={setUploadData} fileId={fileId} setFileId={setFileId} />

      <div>
        <MenuBar editor={editor} />
        <EditorContent
          editor={editor}
          className="overflow-y-auto max-h-[1000px]"
        />
      </div>

      {editing ? (
        <button
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          onClick={EditBlog}
        >
          Edit Blog
        </button>
      ) : (
        <button
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          onClick={AddBlog}
        >
          Save Blog
        </button>
      )}
    </div>
  );
}
