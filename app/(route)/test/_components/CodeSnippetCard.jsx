import React, { useState, useRef } from "react";
import { Check, Copy, Code2 } from "lucide-react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { githubLight, githubDark } from "@uiw/codemirror-theme-github";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

const CodeSnippetCard = ({ snippet }) => {
  const [copied, setCopied] = useState(false);
  const { theme, resolvedTheme } = useTheme();
  const textareaRef = useRef(null);

  const isDarkMode = theme === "dark" || resolvedTheme === "dark";

  const copyToClipboard = async () => {
    try {
      // Primary method using Clipboard API
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(snippet.code);
      } else {
        // Fallback for insecure contexts (e.g., localhost or older browsers)
        if (textareaRef.current) {
          textareaRef.current.value = snippet.code;
          textareaRef.current.select();
          document.execCommand("copy");
        }
      }

      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Code2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {snippet.title}
            </h3>
          </div>
          <Button
            onClick={copyToClipboard}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Copy code"
          >
            {copied ? (
              <Check className="w-5 h-5 text-green-500" />
            ) : (
              <Copy className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            )}
          </Button>
        </div>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {snippet.description}
        </p>

        {/* Code Editor */}
        <div className="mb-4">
          <CodeMirror
            value={snippet.code}
            height="auto"
            theme={isDarkMode ? githubDark : githubLight}
            extensions={[javascript()]}
            editable={false}
            basicSetup={{
              lineNumbers: true,
              highlightActiveLineGutter: false,
              highlightActiveLine: false,
            }}
          />
        </div>

        {/* Hidden textarea for fallback copy */}
        <textarea
          ref={textareaRef}
          style={{ position: "absolute", top: "-9999px", left: "-9999px" }}
          readOnly
          aria-hidden="true"
        />

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {snippet.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-sm bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CodeSnippetCard;
