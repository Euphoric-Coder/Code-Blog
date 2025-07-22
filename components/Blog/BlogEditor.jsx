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

import { useEffect, useRef, useState } from "react";
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
  ImageIcon,
  PenBox,
  PencilIcon,
  PlusCircle,
  Send,
  Trash,
  Trash2,
  TrashIcon,
  X,
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { blogCategories, blogSubCategoriesList } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { db } from "@/lib/dbConfig";
import { Blogs } from "@/lib/schema";
import { getISTDate } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import ImageUpload from "../ImageUpload";
import NextImage from "next/image";
import CodeBlockComponent from "./EditorCodeBlock";
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
    <div className="sticky top-0 flex flex-wrap items-center justify-between rounded-tr-2xl rounded-tl-2xl gap-2 border-r border-l border-2 p-4 backdrop-blur-md bg-white/60 dark:bg-slate-900/60">
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

export default function BlogEditor({
  initialTitle = "",
  initialDescription = "",
  initialCategory = "",
  initialSubCategories = [],
  initialTags = [],
  initialContent = "",
  initialCoverImageURL = null,
  initialfileId = null,
  editing = false,
}) {
  const [title, setTitle] = useState(editing ? initialTitle : "");
  const [description, setDescription] = useState(
    editing ? initialDescription : ""
  );
  const [content, setContent] = useState("");
  const [uploadData, setUploadData] = useState(null);
  const [fileId, setFileId] = useState(null);
  const [unfinishedBlog, setUnfinishedBlog] = useState(false);
  const [editBlogCoverImageURL, setEditBlogCoverImageURL] = useState(
    editing ? initialCoverImageURL : null
  );
  const [editBlogCoverImageId, setEditBlogCoverImageId] = useState(
    editing ? initialfileId : null
  );
  const [editCoverImage, setEditCoverImage] = useState(editing ? true : false);
  const [category, setCategory] = useState(
    editing ? initialCategory.toLowerCase() : blogCategories[0]
  );
  const [selectedSubCategories, setSelectedSubCategories] = useState(
    editing ? initialSubCategories : []
  );
  const selectedCount = selectedSubCategories
    ? selectedSubCategories.length
    : 0;

  const [tags, setTags] = useState(editing ? initialTags : []);
  const [tag, setTag] = useState("");
  const { user } = useUser();
  const previousImagesRef = useRef([]);

  // Generate a unique key for current blog's pending content
  const storageKey = `pendingBlogData-${user?.id}`;

  useEffect(() => {
    const storedBlogData = JSON.parse(localStorage.getItem(storageKey) || "{}");
    if (
      (storedBlogData.title ||
        storedBlogData.content ||
        storedBlogData.fileId ||
        storedBlogData.uploadData ||
        storedBlogData.category ||
        storedBlogData.subcategories ||
        storedBlogData.description) &&
      !editing
    ) {
      setTitle(storedBlogData.title || "");
      setDescription(storedBlogData.description || "");
      setUploadData(storedBlogData.uploadData || "");
      setFileId(storedBlogData.fileId || "");
      setContent(
        storedBlogData.content === "<p></p>" ? "" : storedBlogData.content || ""
      );
      setCategory(storedBlogData.category || blogCategories[0]);
      setSelectedSubCategories(storedBlogData.subcategories || []);
      setTags(storedBlogData.tags || []);
      setUnfinishedBlog(true);
    }
  }, [storageKey]);

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
    onCreate({ editor }) {
      // The editor is ready.
      if (content && unfinishedBlog) {
        editor.commands.setContent(content, false); // false = no history entry
        previousImagesRef.current = getImageUrlsFromHTML(content);
      }
    },
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert max-w-none p-4 min-h-[300px] rounded-b-3xl border-top-none border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 outline-none",
      },
    },
    onUpdate: async ({ editor }) => {
      const html = editor.getHTML();
      setContent(html);
      handleInputChange("content", html);

      const currentImages = getImageUrlsFromHTML(html);
      const previousImages = previousImagesRef.current;

      const deletedImages = previousImages.filter(
        (url) => !currentImages.includes(url)
      );

      for (const url of deletedImages) {
        console.log("Deleting image from DB:", url);
        try {
          toast.info("Deleting image from DB... Please wait.");
          const res = await fetch("/api/editor-image/fetch", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url }),
          });

          const { fileId } = await res.json();

          // Try deleting from ImageKit
          const imageKitDeleteSuccess = await deleteEditorImage(fileId, url);

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

  const getImageUrlsFromHTML = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    const imgs = tempDiv.querySelectorAll("img");
    return Array.from(imgs).map((img) => img.src);
  };

  const deleteEditorImage = async (fileId, url) => {
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

  const AddBlog = async () => {
    if (!title || content === "") {
      toast.error("Please enter both a title & content");
      return;
    }

    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "") // remove all non-alphanumeric characters except space/hyphen
      .replace(/\s+/g, "-") // replace spaces with hyphens
      .replace(/-+/g, "-"); // collapse multiple hyphens

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

    // ✅ Add rule for converting HTML tables to Markdown
    turndownService.addRule("table", {
      filter: "table",
      replacement: function (content, node) {
        const rows = Array.from(node.querySelectorAll("tr"));
        const tableData = rows.map((row) =>
          Array.from(row.children).map((cell) => cell.textContent.trim())
        );

        if (tableData.length === 0) return "";

        const header = tableData[0];
        const separator = header.map(() => "---");
        const body = tableData.slice(1);

        const formatRow = (row) => `| ${row.join(" | ")} |`;

        return [
          "",
          formatRow(header),
          formatRow(separator),
          ...body.map(formatRow),
          "",
        ].join("\n");
      },
    });

    const markdown = turndownService.turndown(content);

    console.log({
      id: `${slug}--${uuid()}`,
      title: title,
      blogImage: uploadData?.url,
      blogImageId: fileId,
      content: content,
      author: user?.fullName,
      categories: category,
      subCategories: selectedSubCategories,
      tags: tags,
      date: new Date().toISOString(),
      createdBy: user?.primaryEmailAddress.emailAddress,
    });

    // const addBlog = await db
    //   .insert(Blogs)
    //   .values({
    //     id: `${slug}--${uuid()}`,
    //     title: title,
    //     blogImage: uploadData?.url,
    //     mdFormat: markdown,
    //     content: content,
    //     author: user?.fullName,
    //     categories: category,
    //     subCategories: selectedSubCategories,
    //     date: getISTDate(),
    //     createdBy: user?.primaryEmailAddress.emailAddress,
    //   })
    //   .returning({
    //     id: Blogs.id,
    //   });
    // console.log("Blog added successfully:", addBlog);
    // if (!addBlog) {
    //   toast.error("Failed to add blog");
    //   return;
    // } else {
    //   clearDataAfterAdding();
    //   toast.success("Blog added successfully!");
    // }
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
      blogImage:
        editing && uploadData ? uploadData?.url : editBlogCoverImageURL,
      blogImageId: editing && fileId ? fileId : editBlogCoverImageId,
      content: content,
      author: user?.fullName,
      categories: category,
      subCategories: selectedSubCategories,
      date: new Date().toISOString(),
      createdBy: user?.primaryEmailAddress.emailAddress,
    });

    if (editing && fileId && uploadData) {
      await deleteFile(editBlogCoverImageId);
    }

    // const editBlog = await db
    //   .update(Blogs)
    //   .set({
    //     id: `${slug}--${uuid()}`,
    //     title: title,
    //     blogImage:
    //       editing && uploadData ? uploadData?.url : editBlogCoverImageURL,
    //     mdFormat: markdown,
    //     content: content,
    //     author: user?.fullName,
    //     categories: category,
    //     subCategories: selectedSubCategories,
    //     date: getISTDate(),
    //     createdBy: user?.primaryEmailAddress.emailAddress,
    //   })
    //   .where(eq(Blogs.id, blogId))
    //   .returning({
    //     id: Blogs.id,
    //   });

    console.log({
      id: `${slug}--${uuid()}`,
      title: title,
      blogImage:
        editing && uploadData ? uploadData?.url : editBlogCoverImageURL,
      mdFormat: markdown,
      content: content,
      author: user?.fullName,
      categories: category,
      subCategories: selectedSubCategories,
      date: getISTDate(),
      createdBy: user?.primaryEmailAddress.emailAddress,
    });
  };

  const deleteFile = async (fileId) => {
    if (!fileId) return;
    console.log("Deleting file with ID:", fileId);
    try {
      await fetch("/api/delete-image", {
        method: "POST",
        body: JSON.stringify({ fileId }),
      });
      console.log("Deleted previous file:", fileId);
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleInputChange = (field, value) => {
    const updatedBlogData = {
      title: field === "title" ? value : title,
      description: field === "description" ? value : description,
      fileId: field === "coverImage" ? value.fileId : fileId,
      uploadData: field === "coverImage" ? value.data : uploadData,
      content: field === "content" ? value : content,
      category: field === "category" ? value : category,
      subcategories: field === "subcategories" ? value : selectedSubCategories,
      tags: field === "tags" ? value : tags,
    };

    console.log("Updated blog data:", updatedBlogData);
    localStorage.setItem(storageKey, JSON.stringify(updatedBlogData));
  };

  const clearDataAfterAdding = () => {
    localStorage.removeItem(storageKey);
    setTitle("");
    setDescription("");
    setContent("");
    setUploadData(null);
    setFileId(null);
    setUnfinishedBlog(false);
    setTags([]);
    setTag("");
    editor.commands.clearContent();
  };

  const clearData = () => {
    localStorage.removeItem(storageKey);
    if (fileId) deleteFile(fileId);
    setTitle("");
    setDescription("");
    setContent("");
    setUploadData(null);
    setFileId(null);
    setUnfinishedBlog(false);
    setTags([]);
    setTag("");
    editor.commands.clearContent();
  };

  const removePendingBlogData = () => {
    localStorage.removeItem(storageKey);
    if (fileId) deleteFile(fileId);
    setTitle("");
    setDescription("");
    setContent("");
    setUploadData(null);
    setFileId(null);
    setUnfinishedBlog(false);
    setTags([]);
    setTag("");
    editor.commands.clearContent();
  };

  const addTag = () => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
      handleInputChange("tags", [...tags, tag]);
      setTag("");
    } else {
      toast.error("Please Avoid Using Duplicate Value!");
    }
  };

  const removeTag = (tagToRemove) => {
    setTags((prev) => prev.filter((t) => t !== tagToRemove));
    handleInputChange("tags", (prev) => prev.filter((t) => t !== tagToRemove));
  };

  return (
    <div className="p-8">
      {/* Pending Expense Alert */}
      {unfinishedBlog && !editing && (
        <Alert
          variant="warning"
          className="max-w-lg mt-6 mb-5 bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-gray-800 dark:to-gray-700 border border-yellow-400 dark:border-gray-600 shadow-lg p-4 rounded-xl flex items-center hover:shadow-xl transition-transform transform hover:scale-[1.02]"
        >
          <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mr-3" />
          <div>
            <AlertTitle className="text-yellow-700 dark:text-yellow-300 font-bold">
              Pending Expense
            </AlertTitle>
            <AlertDescription className="text-yellow-600 dark:text-yellow-400">
              You have an unfinished expense: &quote;
              <b>{title ? title.slice(0, 20) : "Untitled"}</b>&quote;. Would you like to
              continue?
            </AlertDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="ml-auto"
            onClick={removePendingBlogData}
          >
            <XCircle className="h-4 w-4 mr-1" />
            Dismiss
          </Button>
        </Alert>
      )}

      <div className="w-full bg-gradient-to-br from-white via-blue-50 to-purple-50 dark:from-[#111827] dark:via-[#0f172a] dark:to-[#1e1b4b] rounded-2xl p-6 shadow-md mb-8 transition-all duration-300">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Title & subtitle */}
          <div>
            <h1 className="text-4xl p-1 font-extrabold tracking-tight bg-gradient-to-r from-blue-600 via-cyan-400 to-purple-500 bg-clip-text text-transparent">
              {editing ? "Edit Your Blog" : "Create a New Blog"}
            </h1>
            <p className="mt-1 text-sm text-gray-700 dark:text-gray-300 max-w-lg">
              Start writing your thoughts, stories, or tutorials. This is your
              creative space.
            </p>
            <p className="text-xs mt-1 italic text-blue-500 dark:text-cyan-400">
              &quot;Writing is the painting of the voice&quot;
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3">
            <button
              // onClick={handleClear}
              className="px-4 py-2 flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-[#1b1b1b] border border-gray-300 dark:border-gray-700 rounded-xl shadow-sm hover:bg-gray-200 dark:hover:bg-[#2a2a2a] transition-all"
              onClick={() => {
                clearData;
              }}
            >
              <Trash2 />
              Clear
            </button>
            {editing ? (
              <Button
                onClick={EditBlog}
                className="px-5 py-2 flex items-center gap-2 text-sm font-bold text-white bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-600 dark:from-blue-600 dark:via-purple-700 dark:to-pink-600 rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition-transform"
              >
                <PenBox />
                Edit Blog
              </Button>
            ) : (
              <Button
                onClick={AddBlog}
                className="px-5 py-2 flex items-center gap-2 text-sm font-bold text-white bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-600 dark:from-blue-600 dark:via-purple-700 dark:to-pink-600 rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition-transform"
              >
                <Send />
                Submit Blog
              </Button>
            )}
          </div>
        </div>
      </div>
      <div>
        <Label
          htmlFor="blog-title"
          className="text-lg font-semibold text-blue-100 bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-500 px-3 py-1 rounded-full shadow-md transform -translate-y-12 -translate-x-1/5 transition-all duration-300 ease-in-out z-20 cursor-pointer hover:scale-105"
        >
          Blog Title
        </Label>
        <Input
          type="text"
          id="blog-title"
          placeholder="Blog Title"
          className="mt-3 mb-4 input-field focus-visible:ring-blue-500 dark:focus-visible:ring-offset-gray-800 dark:focus-visible:ring-blue-400 focus-visible:ring-[4px]"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            handleInputChange("title", e.target.value);
          }}
        />
      </div>
      <div>
        <Label
          htmlFor="blog-description"
          className="text-lg font-semibold text-blue-100 bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-500 px-3 py-1 rounded-full shadow-md transform -translate-y-12 -translate-x-1/5 transition-all duration-300 ease-in-out z-20 cursor-pointer hover:scale-105"
        >
          Blog Description
        </Label>
        <Textarea
          type="text"
          id="blog-description"
          placeholder="Enter a brief description of your blog..."
          className="mt-3 mb-4 input-field h-[90px] focus-visible:ring-blue-500 dark:focus-visible:ring-offset-gray-800 dark:focus-visible:ring-blue-400 focus-visible:ring-[4px]"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            handleInputChange("description", e.target.value);
          }}
        />
      </div>

      {editCoverImage ? (
        <div className="mb-6">
          <Label
            htmlFor="blog-cover-image"
            className="text-lg font-semibold text-blue-100 bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-500 px-3 py-1 rounded-full shadow-md transform -translate-y-12 -translate-x-1/5 transition-all duration-300 ease-in-out z-20 cursor-pointer hover:scale-105"
          >
            Blog Cover Image
          </Label>
          <div className="relative flex flex-col items-center gap-6 mt-4 p-6 border-2 border-dashed border-blue-300 rounded-2xl bg-gradient-to-br from-cyan-50 to-indigo-100 shadow-lg hover:shadow-xl transition-all duration-300">
            {/* Image Block */}
            <div className="flex-1 max-w-md overflow-hidden rounded-xl shadow-md transition-transform duration-300 hover:scale-105">
              <NextImage
                src={editBlogCoverImageURL}
                alt="Blog Cover"
                width={500}
                height={500}
                className="w-full h-[300px] object-cover rounded-xl"
                draggable={false}
              />
            </div>

            {/* Info and Actions - stacked below image for better alignment */}
            <div className="flex flex-col gap-3 justify-center items-center w-full md:w-auto md:items-start text-center md:text-left">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                Cover Image Uploaded
              </h3>
              <Button
                onClick={() => {
                  setEditCoverImage(false);
                }}
                className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-white font-medium px-5 py-2 rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300"
              >
                Reupload Image
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <ImageUpload
          uploadData={uploadData}
          setUploadData={setUploadData}
          fileId={fileId}
          setFileId={setFileId}
          handleInputChange={handleInputChange}
        />
      )}

      {/* Categories  */}
      <div className="mt-1 space-y-4 mb-10">
        <Label
          htmlFor="blog-category"
          className="text-lg font-semibold text-blue-100 bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-500 px-3 py-1 rounded-full shadow-md transform -translate-y-12 -translate-x-1/5 transition-all duration-300 ease-in-out z-20 cursor-pointer hover:scale-105"
        >
          Blog Category
        </Label>
        <Select
          value={category.toLowerCase()}
          onValueChange={(e) => {
            setCategory(e);
            setSelectedSubCategories([]);
            handleInputChange("category", e); // <- Add this
            handleInputChange("subcategories", []); // Reset subcategories too
          }}
        >
          <SelectTrigger
            id="blog-category"
            className="blog-select-field ring-0 focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="blog-select-content mt-2">
            <ScrollArea className="max-h-60 overflow-auto">
              {blogCategories.map((category, index) => (
                <SelectItem
                  key={index}
                  value={category.toLowerCase()}
                  className="blog-select-item"
                >
                  {category}
                </SelectItem>
              ))}
            </ScrollArea>
          </SelectContent>
        </Select>

        {/* Sub-Categories (Only Show When Category is Selected) */}
        {category && blogSubCategoriesList[category.toLowerCase()] && (
          <div
            className="relative max-h-[200px] mt-2 overflow-y-auto 
        p-3 shadow-sm rounded-xl 
        bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900 border-[2px]
        border-blue-500 dark:border-blue-900 transition-all"
          >
            <div className="flex items-center justify-between">
              {/* Title & Selected Badge */}
              <div className="flex items-center gap-2">
                <label className="blog-text1">
                  Sub-Categories (
                  {
                    new Set(blogSubCategoriesList[category.toLowerCase()] || [])
                      .size
                  }
                  )
                </label>

                {/* Show Selected Count Badge */}
                {selectedCount > 0 && (
                  <Badge className="border-0 bg-gradient-to-r from-green-400 to-green-600 text-white px-2 py-1 rounded-full text-xs dark:from-green-500 dark:to-green-700 ">
                    Selected: {selectedCount}
                  </Badge>
                )}
              </div>
              <div>
                {/* Clear Button */}
                {selectedCount > 0 && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedSubCategories([]);
                      handleInputChange("subcategories", []); // <- Clear in localStorage too
                    }}
                    className="text-sm rounded-full text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-500 dark:border-gray-300"
                    size="sm"
                  >
                    Clear Selection
                  </Button>
                )}
              </div>
            </div>

            {/* Subcategories List */}
            <div className="flex flex-wrap gap-2 mt-3">
              {[
                ...new Set(blogSubCategoriesList[category.toLowerCase()] || []),
              ].map((subCategory) => {
                const isSelected = Array.isArray(selectedSubCategories)
                  ? selectedSubCategories.includes(subCategory)
                  : selectedSubCategories?.split(", ").includes(subCategory);

                return (
                  <Badge
                    key={subCategory}
                    onClick={() => {
                      setSelectedSubCategories((prev) => {
                        let subCategoriesArray = Array.isArray(prev)
                          ? [...prev]
                          : prev
                            ? prev.split(", ")
                            : [];

                        if (isSelected) {
                          subCategoriesArray = subCategoriesArray.filter(
                            (c) => c !== subCategory
                          );
                        } else {
                          subCategoriesArray.push(subCategory);
                        }

                        handleInputChange("subcategories", subCategoriesArray); // pass array directly
                        return subCategoriesArray;
                      });
                    }}
                    className={`border-0 rounded-full text-sm cursor-pointer px-3 py-1 transition-all
                  ${
                    isSelected
                      ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                  }`}
                  >
                    {subCategory}
                  </Badge>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div>
        <label htmlFor="tag-input" className="text">
          Tags
        </label>

        {/* Input container with badges inside */}
        <div
          className="mt-1 w-full relative flex items-start border rounded-3xl min-h-[42px] input-field focus-within:ring-blue-500 dark:focus-within:ring-offset-gray-800 dark:focus-within:ring-blue-400 focus-within:ring-[4px]"
          onClick={() => document.getElementById("tag-input")?.focus()}
        >
          {/* Badges inside input field */}
          <div className="flex flex-wrap gap-2 flex-grow p-2 pr-20">
            {tags.map((t) => (
              <Badge
                key={t}
                className="inline-flex items-center gap-1 bg-indigo-100 hover:bg-indigo-200 text-indigo-800 px-2 py-1 rounded-3xl text-sm dark:bg-indigo-900 hover:dark:bg-indigo-700 dark:text-indigo-100 cursor-pointer"
              >
                {t}
                <button
                  type="button"
                  onClick={() => removeTag(t)}
                  className="text-indigo-500 hover:text-red-600 focus:outline-none dark:text-indigo-300 dark:hover:text-red-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}

            {/* Input field */}
            <input
              id="tag-input"
              type="text"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addTag();
                }
              }}
              placeholder={tags.length === 0 ? "Add a tag" : ""}
              className="flex-grow bg-transparent border-none outline-none p-1 text-gray-700 dark:text-white min-w-[120px]"
            />
          </div>

          {/* Right: Clear Button */}
          {tags.length > 0 && (
            <Button
              onClick={() => setTags([])}
              className="absolute right-3 top-1/2 -translate-y-1/2 del3"
            >
              Clear
            </Button>
          )}
        </div>
      </div>

      <div className="mt-5 space-y-5">
        <Label className="text-lg font-semibold text-blue-100 bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-500 px-3 py-1 rounded-full shadow-md transform -translate-y-12 -translate-x-1/5 transition-all duration-300 ease-in-out z-20 cursor-pointer hover:scale-105">
          Blog Editor
        </Label>
        <div>
          <MenuBar editor={editor} />
          <EditorContent
            editor={editor}
            className="overflow-y-auto max-h-[500px]"
          />
        </div>
      </div>

      {/* {editing ? (
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
      )} */}
    </div>
  );
}
