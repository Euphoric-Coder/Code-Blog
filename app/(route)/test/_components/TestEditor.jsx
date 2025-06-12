import React, { useState, useEffect } from "react";
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
import { Menu, MenuButton, MenuItem, MenuItems, MenuList } from "@headlessui/react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { blogCategories, blogSubCategoriesList } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { db } from "@/lib/dbConfig";
import { Blogs } from "@/lib/schema";
import { getISTDate } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import ImageUpload from "@/components/ImageUpload";
import NextImage from "next/image";
import CodeBlockComponent from "@/components/Blog/EditorCodeBlock";

const TestEditor = ({
  section,
  activeSubsection,
  onUpdateSectionTitle,
  onUpdateSubsectionTitle,
  onUpdateSubsectionContent,
}) => {
  const [previewMode, setPreviewMode] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleSectionTitleChange = (e) => {
    onUpdateSectionTitle(e.target.value);
  };

  const handleSubsectionTitleChange = (e) => {
    onUpdateSubsectionTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    onUpdateSubsectionContent(e.target.value);
  };

  const handleMarkdownUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onUpdateSubsectionContent(event.target.result);
          setIsUploading(false);
        }
      };
      reader.readAsText(file);
    }
  };

  const insertImagePlaceholder = () => {
    onUpdateSubsectionContent(
      activeSubsection.content +
        '\n<img src="https://via.placeholder.com/800x400" alt="Image description" />'
    );
  };

  const insertCodeBlock = () => {
    onUpdateSubsectionContent(
      activeSubsection.content +
        '\n<pre><code class="language-javascript">\n// Your code here\nconsole.log("Hello World");\n</code></pre>'
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1 space-y-3">
            <div>
              <label
                htmlFor="sectionTitle"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Section Title
              </label>
              <input
                type="text"
                id="sectionTitle"
                value={section.title}
                onChange={handleSectionTitleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="subsectionTitle"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Subsection Title
              </label>
              <input
                type="text"
                id="subsectionTitle"
                value={activeSubsection.title}
                onChange={handleSubsectionTitleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setPreviewMode(!previewMode)}
              className={`px-4 py-2 rounded-md transition-colors flex items-center ${
                previewMode
                  ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              <PanelRight className="h-5 w-5 mr-2" />
              {previewMode ? "Edit Mode" : "Preview"}
            </button>

            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors flex items-center">
              <Save className="h-5 w-5 mr-2" />
              Save
            </button>
          </div>
        </div>
      </div>

      {!previewMode ? (
        <div className="p-4">
          <div className="mb-4 flex flex-wrap gap-2">
            <label className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md transition-colors cursor-pointer flex items-center">
              <Upload className="h-4 w-4 mr-2" />
              {isUploading ? "Uploading..." : "Upload Markdown"}
              <input
                type="file"
                accept=".md,.markdown,.txt"
                className="hidden"
                onChange={handleMarkdownUpload}
                disabled={isUploading}
              />
            </label>

            <button
              onClick={insertImagePlaceholder}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1.5 rounded-md transition-colors flex items-center"
            >
              <ImageIcon className="h-4 w-4 mr-2" />
              Insert Image
            </button>

            <button
              onClick={insertCodeBlock}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1.5 rounded-md transition-colors flex items-center"
            >
              <Code className="h-4 w-4 mr-2" />
              Insert Code Block
            </button>
          </div>

          <textarea
            value={activeSubsection.content}
            onChange={handleContentChange}
            className="w-full h-96 px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors font-mono text-sm"
            placeholder="Enter your content in HTML format or upload a markdown file..."
          ></textarea>

          <p className="mt-2 text-sm text-gray-500">
            You can write HTML directly or upload a Markdown file. Use the
            buttons above to insert common elements.
          </p>
        </div>
      ) : (
        <div className="p-6 border-t border-gray-200 prose max-w-none">
          <div
            dangerouslySetInnerHTML={{ __html: activeSubsection.content }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default TestEditor;
