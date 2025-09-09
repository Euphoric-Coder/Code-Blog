"use client";

import React, { useMemo, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { Code2, Loader } from "lucide-react";
import FormBackgroundEffect from "../Effect/FormBackgroundEffect";

const LANGUAGE_META = {
  javascript: { monaco: "javascript", ext: "js" },
  typescript: { monaco: "typescript", ext: "ts" },
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
  typescript: "typescript",
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

  // Resolve monaco language from props
  const resolvedId = useMemo(() => {
    if (languageId) return languageId;
    if (languageName && typeof languageName === "string") {
      const key = languageName.trim().toLowerCase();
      return NAME_TO_ID[key] || key; // fallback to key
    }
    return "javascript";
  }, [languageId, languageName]);

  const meta = LANGUAGE_META[resolvedId] || { monaco: "plaintext", ext: "txt" };

  const handleMount = (editor /*, monaco */) => {
    editorRef.current = editor;
    setReady(true);
  };

  return (
    <div className={"form-layout-code"}>
      <FormBackgroundEffect />
      {/* Header */}
      <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 border-b border-gray-200 dark:border-gray-600 flex justify-between items-center">
        <h1 className="text-lg md:text-3xl font-extrabold text-blue-900 dark:text-blue-200">
          Code Snippet
        </h1>
        <span className="px-3 py-1 rounded-full text-md font-semibold bg-gradient-to-r from-blue-600 to-teal-500 text-white shadow-md">
          {languageName}
        </span>
      </div>

      {/* Editor */}
      <div className="relative" style={{ height }}>
        {!ready && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 z-10">
            <div className="text-center">
              <Loader className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-2" />
              <p className="text-gray-600 dark:text-gray-400">
                Loading editor...
              </p>
            </div>
          </div>
        )}
        <Editor
          height="100%"
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
