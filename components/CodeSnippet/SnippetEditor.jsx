"use client";

import { useEffect, useRef, useState } from "react";
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
import { common, createLowlight } from "lowlight";

import { toast } from "sonner";
import { ChevronDownIcon, ImageIcon, Trash } from "lucide-react";
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  MenuList,
} from "@headlessui/react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CodeBlockComponent from "../Blog/EditorCodeBlock";

const lowlight = createLowlight(common);

/* ---------------------- helpers ---------------------- */
const getImageUrlsFromHTML = (html) => {
  const temp = document.createElement("div");
  temp.innerHTML = html || "";
  return Array.from(temp.querySelectorAll("img")).map((img) => img.src);
};

// delete image from ImageKit + DB using your existing endpoints
const deleteEditorImage = async (url) => {
  try {
    // 1) fetch fileId by URL from your DB
    const res = await fetch("/api/editor-image/fetch", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });

    if (!res.ok) {
      console.error("Failed to fetch fileId for image:", await res.text());
      return false;
    }

    const { fileId } = await res.json();
    if (!fileId) {
      console.warn("No fileId found for URL, skipping IK delete:", url);
    } else {
      // 2) delete from ImageKit
      const delIK = await fetch("/api/delete-image", {
        method: "POST",
        body: JSON.stringify({ fileId }),
      });
      if (!delIK.ok) {
        console.error("ImageKit delete failed:", await delIK.text());
        return false;
      }
    }

    // 3) delete DB record
    const delDB = await fetch("/api/editor-image/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });
    if (!delDB.ok) {
      console.error("DB record delete failed:", await delDB.text());
      return false;
    }

    return true;
  } catch (err) {
    console.error("deleteEditorImage error:", err);
    return false;
  }
};

/* ---------------------- toolbar ---------------------- */
const MenuBar = ({ editor }) => {
  const imageInputRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");

  // useEffect(() => {
  //   const handleKeyDown = (e) => {
  //     const mod = isMac ? e.metaKey : e.ctrlKey;

  //     if (!editor) return;

  //     // Headings H1, H2, H3
  //     if (mod && e.altKey && e.key === "1") {
  //       e.preventDefault();
  //       editor.chain().focus().toggleHeading({ level: 1 }).run();
  //     } else if (mod && e.altKey && e.key === "2") {
  //       e.preventDefault();
  //       editor.chain().focus().toggleHeading({ level: 2 }).run();
  //     } else if (mod && e.altKey && e.key === "3") {
  //       e.preventDefault();
  //       editor.chain().focus().toggleHeading({ level: 3 }).run();
  //     }

  //     // Bullet List
  //     else if (mod && e.shiftKey && e.key === "8") {
  //       e.preventDefault();
  //       editor.chain().focus().toggleBulletList().run();
  //     }

  //     // Numbered List
  //     else if (mod && e.shiftKey && e.key === "7") {
  //       e.preventDefault();
  //       editor.chain().focus().toggleOrderedList().run();
  //     }

  //     // Bold
  //     else if (mod && e.key.toLowerCase() === "b") {
  //       e.preventDefault();
  //       editor.chain().focus().toggleBold().run();
  //     }

  //     // Italic
  //     else if (mod && e.key.toLowerCase() === "i") {
  //       e.preventDefault();
  //       editor.chain().focus().toggleItalic().run();
  //     }

  //     // Blockquote
  //     else if (mod && e.shiftKey && e.key.toLowerCase() === "b") {
  //       e.preventDefault();
  //       editor.chain().focus().toggleBlockquote().run();
  //     }
  //   };

  //   window.addEventListener("keydown", handleKeyDown);
  //   return () => window.removeEventListener("keydown", handleKeyDown);
  // }, []);

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
      <div className="hidden xl:flex w-full gap-1 items-center justify-between">
        <div className="flex items-center">
          {[1, 2, 3].map((level) => (
            <TooltipProvider key={level}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    key={level}
                    className={buttonStyle(
                      editor.isActive("heading", { level })
                    )}
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
                  onClick={() =>
                    editor.chain().focus().toggleBulletList().run()
                  }
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
                  onClick={() =>
                    editor.chain().focus().toggleOrderedList().run()
                  }
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
                  onClick={() =>
                    editor.chain().focus().toggleBlockquote().run()
                  }
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

        {/* Clear Button */}
        <button onClick={() => editor.commands.clearContent(true)}>
          <Trash />
        </button>
      </div>

      <input
        type="file"
        ref={imageInputRef}
        accept="image/*"
        className="hidden"
        onChange={handleFileSelect}
      />

      {/* Link Insert Dialog */}
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

      {/* TOOLBAR: Directly Shown Items */}
      <div className="flex xl:hidden items-center justify-between w-full gap-4">
        <div className="flex items-center">
          <div className="flex gap-2 items-center flex-wrap">
            {/* H1, H2 (Mobile+) */}
            {[1, 2].map((level) => (
              <TooltipProvider key={level}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      key={level}
                      className={buttonStyle(
                        editor.isActive("heading", { level })
                      )}
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

            {/* H3, Bullet List, Numbered List (Tablet+) */}
            <div className="hidden md:flex xl:hidden gap-2">
              <button
                className={buttonStyle(
                  editor.isActive("heading", { level: 3 })
                )}
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 3 }).run()
                }
              >
                H3
              </button>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      className={buttonStyle(editor.isActive("bulletList"))}
                      onClick={() =>
                        editor.chain().focus().toggleBulletList().run()
                      }
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
                      onClick={() =>
                        editor.chain().focus().toggleOrderedList().run()
                      }
                    >
                      <MdFormatListNumbered size={30} className="mr-1" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Numbered List</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          {/* MENU: Shown on Mobile & Tablet */}
          <div className="xl:hidden flex">
            <Menu>
              <MenuButton className="inline-flex items-center gap-2 rounded-md bg-white dark:bg-gray-900 px-4 py-2 text-sm font-medium text-gray-800 dark:text-gray-100 shadow-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                Options
                <ChevronDownIcon className="size-4 text-gray-600 dark:text-gray-400" />
              </MenuButton>

              <MenuItems
                transition
                anchor="bottom end"
                className="w-60 mt-2 origin-top-right rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-1 shadow-lg ring-1 ring-black/10 dark:ring-white/10 focus:outline-none"
              >
                {/* Bullet List */}
                <MenuItem className="flex md:hidden">
                  <button
                    className="group flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-muted/80 dark:hover:bg-gray-800 rounded-md"
                    onClick={() =>
                      editor.chain().focus().toggleBulletList().run()
                    }
                  >
                    <MdFormatListBulleted className="text-lg" /> Bullet
                  </button>
                </MenuItem>

                {/* Numbered List */}
                <MenuItem className="flex md:hidden">
                  <button
                    className="group flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-muted/80 dark:hover:bg-gray-800 rounded-md"
                    onClick={() =>
                      editor.chain().focus().toggleOrderedList().run()
                    }
                  >
                    <MdFormatListNumbered className="text-lg" /> Numbered
                  </button>
                </MenuItem>
                {/* Bold */}
                <MenuItem>
                  <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className="group flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-muted/80 dark:hover:bg-gray-800 rounded-md"
                  >
                    <MdFormatBold className="text-lg" /> Bold
                  </button>
                </MenuItem>

                {/* Italic */}
                <MenuItem>
                  <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className="group flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-muted/80 dark:hover:bg-gray-800 rounded-md"
                  >
                    <MdFormatItalic className="text-lg" /> Italic
                  </button>
                </MenuItem>

                {/* Blockquote */}
                <MenuItem>
                  <button
                    onClick={() =>
                      editor.chain().focus().toggleBlockquote().run()
                    }
                    className="group flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-muted/80 dark:hover:bg-gray-800 rounded-md"
                  >
                    <MdFormatQuote className="text-lg" /> Quote
                  </button>
                </MenuItem>

                {/* Code Block */}
                <MenuItem>
                  <button
                    onClick={() =>
                      editor.chain().focus().toggleCodeBlock().run()
                    }
                    className="group flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-muted/80 dark:hover:bg-gray-800 rounded-md"
                  >
                    <MdCode className="text-lg" /> Code Block
                  </button>
                </MenuItem>

                {/* Table */}
                <MenuItem>
                  <button
                    onClick={() =>
                      editor
                        .chain()
                        .focus()
                        .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                        .run()
                    }
                    className="group flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-muted/80 dark:hover:bg-gray-800 rounded-md"
                  >
                    <MdTableChart className="text-lg" /> Table
                  </button>
                </MenuItem>

                {/* Link */}
                <MenuItem>
                  <button
                    onClick={() => setOpen(true)}
                    className="group flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-muted/80 dark:hover:bg-gray-800 rounded-md"
                  >
                    <MdLink className="text-lg" /> Link
                  </button>
                </MenuItem>

                {/* Image */}
                <MenuItem>
                  <button
                    onClick={() => imageInputRef.current?.click()}
                    className="group flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-muted/80 dark:hover:bg-gray-800 rounded-md"
                  >
                    <ImageIcon className="text-lg" /> Image
                  </button>
                </MenuItem>

                <div className="my-1 h-px bg-black/10 dark:bg-white/10 flex md:hidden" />
                <MenuItem className="flex md:hidden">
                  <button
                    onClick={() => console.log("deleting")}
                    className="group flex w-full items-center gap-2 px-4 py-2 text-sm text-red-500 dark:text-red-400 hover:bg-muted/80 dark:hover:bg-gray-800 rounded-md"
                  >
                    <Trash className="text-lg" /> Delete
                  </button>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
        <button onClick={() => editor.commands.clearContent(true)}>
          <Trash />
        </button>
      </div>
    </div>
  );
};

/* ---------------------- main component ---------------------- */
export default function SnippetContentEditor({
  value = "", // HTML (snippet.content)
  onChange, // (html) => void
  placeholder = "Explain your snippet, add notes, examples, etc…",
  maxHeight = "500px",
  className = "",
}) {
  const previousImagesRef = useRef([]);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      Placeholder.configure({ placeholder }),
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
    content: value || "<p></p>",
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert max-w-none min-h-[300px] p-4 rounded-b-2xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 outline-none",
      },
    },
    onCreate: ({ editor }) => {
      // initialize previous images from initial content
      previousImagesRef.current = getImageUrlsFromHTML(editor.getHTML());
    },
    onUpdate: async ({ editor }) => {
      const html = editor.getHTML();
      onChange?.(html);

      // detect removed images and delete from IK + DB
      const currentImages = getImageUrlsFromHTML(html);
      const previousImages = previousImagesRef.current;

      const deleted = previousImages.filter((u) => !currentImages.includes(u));
      if (deleted.length) {
        for (const url of deleted) {
          try {
            toast.info("Removing image…");
            const ok = await deleteEditorImage(url);
            if (!ok) {
              // reinstate the image if deletion failed
              editor.chain().focus().setImage({ src: url }).run();
              toast.error("Couldn’t delete image; restored.");
            } else {
              toast.success("Image deleted");
            }
          } catch (err) {
            console.error("delete flow error:", err);
          }
        }
      }

      previousImagesRef.current = currentImages;
    },
  });

  // keep editor in sync if parent updates value externally
  useEffect(() => {
    if (!editor) return;
    const current = editor.getHTML();
    if (value && value !== current) {
      editor.commands.setContent(value, false);
      previousImagesRef.current = getImageUrlsFromHTML(value);
    }
  }, [value, editor]);

  return (
    <div className={className}>
      <MenuBar editor={editor} />
      <div className="overflow-y-auto" style={{ maxHeight }}>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
