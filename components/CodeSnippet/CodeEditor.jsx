"use client";

import React, { useMemo, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { FileText, Loader } from "lucide-react";

/**
 * Props:
 * - languageId?: string        // e.g., "javascript"
 * - languageName?: string      // e.g., "JavaScript" (case-insensitive)
 * - value: string              // code string (controlled)
 * - onChange: (v: string) => void
 * - theme?: "vs-dark" | "light" | "hc-black"
 * - height?: string            // e.g., "420px"
 * - className?: string
 *
 * This component is independent of your Playground languages list.
 * It maps common ids -> monaco language + extension internally.
 */
const LANGUAGE_META = {
  javascript: { monaco: "javascript", ext: "js" },
  python: { monaco: "python", ext: "py" },
  java: { monaco: "java", ext: "java" },
  cpp: { monaco: "cpp", ext: "cpp" },
  c: { monaco: "c", ext: "c" },
  go: { monaco: "go", ext: "go" },
  rust: { monaco: "rust", ext: "rs" },
  php: { monaco: "php", ext: "php" },
  ruby: { monaco: "ruby", ext: "rb" },
  csharp: { monaco: "csharp", ext: "cs" },
};

const NAME_TO_ID = {
  javascript: "javascript",
  python: "python",
  java: "java",
  "c++": "cpp",
  c: "c",
  go: "go",
  rust: "rust",
  php: "php",
  ruby: "ruby",
  "c#": "csharp",
};

const CodeEditor = ({
  languageId,
  languageName,
  value = "",
  onChange,
  theme = "vs-dark",
  height = "420px",
  className = "",
}) => {
  const [ready, setReady] = useState(false);
  const editorRef = useRef(null);

  const resolvedId = useMemo(() => {
    if (languageId) return languageId;
    if (languageName && typeof languageName === "string") {
      const key = languageName.trim().toLowerCase();
      return NAME_TO_ID[key] || key; // fallback to key if it already matches an id
    }
    return "javascript";
  }, [languageId, languageName]);

  const meta = LANGUAGE_META[resolvedId] || { monaco: "plaintext", ext: "txt" };

  const handleMount = (editor /*, monaco */) => {
    editorRef.current = editor;
    setReady(true);
  };

  return (
    <div className={`h-full flex flex-col ${className}`}>
      {/* Header */}
      <div className="bg-gray-50 dark:bg-gray-700 px-4 py-2 border-b border-gray-200 dark:border-gray-600 rounded-t-xl">
        <div className="flex items-center space-x-2">
          <FileText className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            main.{meta.ext}
          </span>
        </div>
      </div>

      {/* Editor */}
      <div className="relative">
        {!ready && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 z-10 rounded-b-xl">
            <div className="text-center">
              <Loader className="h-8 w-8 animate-spin text-indigo-600 mx-auto mb-2" />
              <p className="text-gray-600 dark:text-gray-400">
                Loading editor...
              </p>
            </div>
          </div>
        )}
        <Editor
          height={height}
          language={meta.monaco}
          theme={theme}
          value={value}
          onChange={(v) => onChange?.(v ?? "")}
          onMount={handleMount}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: "on",
            roundedSelection: false,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            wordWrap: "on",
            suggestOnTriggerCharacters: true,
            quickSuggestions: true,
            parameterHints: { enabled: true },
            autoIndent: "full",
            formatOnPaste: true,
            formatOnType: true,
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
