import React, { useState, useEffect, useRef } from "react";
import { Upload, Code, PanelRight, Save, ImageIcon } from "lucide-react";

// TipTap Editor imports
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
import {
  AlertCircle,
  Archive,
  ChevronDownIcon,
  Copy,
  PenBox,
  PencilIcon,
  Send,
  Trash,
  Trash2,
  TrashIcon,
  XCircle,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  MenuList,
} from "@headlessui/react";
import ImageUpload from "@/components/ImageUpload";
import NextImage from "next/image";
import CodeBlockComponent from "@/components/Blog/EditorCodeBlock";
import { markdownToHtml } from "@/components/MarkdownProcessor";
import FormBackgroundEffect from "@/components/Effect/FormBackgroundEffect";
import ImageKit from "imagekit-javascript";

const MenuBar = ({ editor }) => {
  const imageInputRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");

  if (!editor) return null;

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) {
      toast.error("Please select a valid image.");
      return;
    }

    const auth = await fetch("/api/upload-auth").then((res) => res.json());

    const imagekit = new ImageKit({
      publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY,
      urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT,
      authenticationEndpoint: "",
    });

    toast.info("Uploading image... Please wait.");

    imagekit.upload(
      {
        file,
        fileName: file.name,
        useUniqueFileName: true,
        folder: "/editor-images",
        token: auth.token,
        signature: auth.signature,
        expire: auth.expire,
      },
      async (err, result) => {
        if (err) {
          console.error("ImageKit upload error:", err);
          toast.error("Image upload failed");
        } else {
          editor.chain().focus().setImage({ src: result.url }).run();
          try {
            const res = await fetch("/api/save-upload", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                url: result.url,
                fileId: result.fileId,
              }),
            });

            if (!res.ok) throw new Error("Failed to save image in DB");
          } catch (err) {
            console.error("Failed to save to DB:", err);
            toast.warning("Image uploaded, but DB save failed.");
          }
          toast.success("Image added to editor");
        }
      }
    );
  };

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
    <div className="sticky top-0 flex flex-wrap items-center justify-between rounded-tr-2xl rounded-tl-2xl gap-2 border-r border-l border-2 border-blue-600 dark:border-blue-400 p-4 backdrop-blur-md bg-white/60 dark:bg-slate-900/60">
      <div className="hidden lg:flex gap-2 items-center">
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
                <MdTableChart className="mr-1" />
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

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className={buttonStyle(editor.isActive("image"))}
                onClick={() => imageInputRef.current?.click()}
              >
                <ImageIcon className="mr-1" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Image</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <input
        type="file"
        ref={imageInputRef}
        accept="image/*"
        className="hidden"
        onChange={handleFileSelect}
      />
      <div className="lg:hidden flex">
        <Menu>
          <MenuButton className="inline-flex items-center gap-2 rounded-md bg-gray-800 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-700 data-open:bg-gray-700">
            Options
            <ChevronDownIcon className="size-4 fill-white/60" />
          </MenuButton>

          <MenuItems
            transition
            anchor="bottom end"
            className="w-52 origin-top-right rounded-xl border border-white/5 bg-white/5 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0"
          >
            <MenuItem>
              <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10">
                <PencilIcon className="size-4 fill-white/30" />
                Edit
                <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-focus:inline">
                  ⌘E
                </kbd>
              </button>
            </MenuItem>
            <MenuItem>
              <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10">
                <Copy className="size-4 fill-white/30" />
                Duplicate
                <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-focus:inline">
                  ⌘D
                </kbd>
              </button>
            </MenuItem>
            <div className="my-1 h-px bg-white/5" />
            <MenuItem>
              <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10">
                <Archive className="size-4 fill-white/30" />
                Archive
                <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-focus:inline">
                  ⌘A
                </kbd>
              </button>
            </MenuItem>
            <MenuItem>
              <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10">
                <TrashIcon className="size-4 fill-white/30" />
                Delete
                <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-focus:inline">
                  ⌘D
                </kbd>
              </button>
            </MenuItem>
          </MenuItems>
        </Menu>
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

const TutorialEditor = ({
  section,
  activeSubsection,
  onUpdateSectionTitle,
  onUpdateSubsectionTitle,
  onUpdateSubsectionContent,
  onUpdateUsedMarkdown,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const { user } = useUser();
  const previousImagesRef = useRef([]);

  useEffect(() => {
    if (editor && activeSubsection?.content !== editor.getHTML()) {
      editor.commands.setContent(activeSubsection.content || "");
    }
  }, [activeSubsection?.id, activeSubsection?.content]);

  const getImageUrlsFromHTML = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    const imgs = tempDiv.querySelectorAll("img");
    return Array.from(imgs).map((img) => img.src);
  };

  const deleteFile = async (fileId, url) => {
    if (!fileId) return false;

    try {
      const res = await fetch("/api/delete-image", {
        method: "POST",
        body: JSON.stringify({ fileId }),
      });

      const res1 = await fetch("/api/editor-image/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      if (!res.ok || !res1.ok) {
        console.error("One of the delete operations failed", {
          imageKit: await res.text(),
          db: await res1.text(),
        });
        return false;
      }

      console.log("Deleted file:", fileId);
      return true;
    } catch (err) {
      console.error("Delete failed", err);
      return false;
    }
  };
  

  const handleSectionTitleChange = (e) => {
    onUpdateSectionTitle(e.target.value);
  };

  const handleSubsectionTitleChange = (e) => {
    onUpdateSubsectionTitle(e.target.value);
  };

  const handleMarkdownUpload = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);

      const reader = new FileReader();
      reader.onload = async (event) => {
        const markdown = event.target?.result;
        if (markdown) {
          const html = await markdownToHtml(markdown);
          onUpdateSubsectionContent(html);
          editor?.commands.setContent(html, false);
          onUpdateUsedMarkdown(true);
        }
        setIsUploading(false);
      };

      reader.readAsText(file);
    }
  };

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      Placeholder.configure({
        placeholder: "Start writing your content here...",
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
    content: activeSubsection.content || "",
    onCreate({ editor }) {
      // The editor is ready.
      if (activeSubsection.content) {
        editor.commands.setContent(activeSubsection.content, false); // false = no history entry
        previousImagesRef.current = getImageUrlsFromHTML(
          activeSubsection.content
        );
      }
    },
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert max-w-none p-4 min-h-[300px] rounded-b-3xl border-top-none border border-blue-600 dark:border-blue-400 bg-white dark:bg-slate-900 outline-none",
      },
    },
    onUpdate: async ({ editor }) => {
      const html = editor.getHTML();
      onUpdateSubsectionContent(html);

      const currentImages = getImageUrlsFromHTML(html);
      const previousImages = previousImagesRef.current;

      const deletedImages = previousImages.filter(
        (url) => !currentImages.includes(url)
      );

      for (const url of deletedImages) {
        try {
          toast.info("Deleting image from DB... Please wait.");
          const res = await fetch("/api/editor-image/fetch", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url }),
          });

          const { fileId } = await res.json();

          // Try deleting from ImageKit
          const imageKitDeleteSuccess = await deleteFile(fileId, url);

          if (!imageKitDeleteSuccess) {
            // Reinstate in the editor
            editor.chain().focus().setImage({ src: url }).run();
      
            toast.error("Deletion failed — image added back to editor.");
            continue;
          }

          toast.success("Image Deleted from DB");
        } catch (error) {
          console.log("Failed to delete image:", url, error);
        }
      }

      previousImagesRef.current = currentImages;
    },
  });

  return (
    <div className="form-layout overflow-hidden">
      <FormBackgroundEffect />

      <div className="flex justify-end gap-3">
        <div>
          <Input
            id="markdown-file"
            type="file"
            accept=".md,.markdown,.txt"
            onChange={handleMarkdownUpload}
            ref={(ref) => (window.markdownUploadInput = ref)} // Expose for triggering
            className="hidden"
          />

          <Button
            onClick={() => window.markdownUploadInput?.click()}
            disabled={activeSubsection.usedMarkdown}
            className="btn9"
          >
            <Upload className="h-4 w-4 mr-2" />
            {isUploading ? "Uploading..." : "Upload Markdown"}
          </Button>
        </div>
        {activeSubsection.usedMarkdown && (
          <Button
            onClick={() => {
              onUpdateUsedMarkdown(false);
              onUpdateSubsectionContent("");
            }}
            className="del3 hover:bg-red-200 dark:hover:bg-red-700"
          >
            Clear Markdown Content
          </Button>
        )}
      </div>
      <div className="p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1 space-y-3">
            <div>
              <label htmlFor="sectionTitle" className="text">
                Section Title
              </label>
              <Input
                type="text"
                id="sectionTitle"
                value={section.title}
                onChange={handleSectionTitleChange}
                className="mt-1 input-field focus-visible:ring-blue-500 dark:focus-visible:ring-offset-gray-800 dark:focus-visible:ring-blue-400 focus-visible:ring-[4px]"
              />
            </div>

            <div>
              <label htmlFor="subsectionTitle" className="text">
                Subsection Title
              </label>
              <Input
                type="text"
                id="subsectionTitle"
                value={activeSubsection.title}
                onChange={handleSubsectionTitleChange}
                className="mt-1 input-field focus-visible:ring-blue-500 dark:focus-visible:ring-offset-gray-800 dark:focus-visible:ring-blue-400 focus-visible:ring-[4px]"
              />
            </div>
          </div>
        </div>
      </div>

      {activeSubsection.usedMarkdown ? (
        <div className="p-6 prose [&_*]:border-0 max-w-none">
          <div
            dangerouslySetInnerHTML={{ __html: activeSubsection.content }}
          ></div>
        </div>
      ) : (
        <div className="p-4">
          <MenuBar editor={editor} />
          <EditorContent
            editor={editor}
            className="overflow-y-auto max-h-[500px]"
          />

          <p className="mt-2 text-sm text-gray-500">
            You can write HTML directly or upload a Markdown file. Use the
            buttons above to insert common elements.
          </p>
        </div>
      )}
    </div>
  );
};

export default TutorialEditor;
