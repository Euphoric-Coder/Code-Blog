import React, { useState, useCallback } from "react";
import { Check, Copy, Download } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  solarizedDarkAtom,
  solarizedlight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { useTheme } from "next-themes";

const SnippetBlock = ({
  language = "javascript",
  children,
  title,
  onDownload,
  showDownload = false,
}) => {
  const [copied, setCopied] = useState(false);

  const { theme, resolvedTheme } = useTheme();

  const isDark = (theme ?? resolvedTheme) === "dark";
  const safeContent = typeof children === "string" ? children.trim() : "";

  const handleCopy = useCallback(async () => {
    if (!safeContent) return;

    try {
      await navigator.clipboard.writeText(safeContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  }, [safeContent]);

  const handleDownload = useCallback(() => {
    if (onDownload) {
      onDownload();
    }
  }, [onDownload]);

  const customStyle = {
    backgroundColor: isDark ? "#1a1b26" : "#f9f9f9",
    margin: 0,
    padding: "1.5rem",
    borderRadius: "0.75rem",
    fontSize: "0.875rem",
    lineHeight: "1.7",
    fontFamily:
      "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  };

  return (
    <div className="relative group rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
      {/* Header with title and actions */}
      {(title || showDownload) && (
        <div className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          {title && (
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {title}
              </span>
            </div>
          )}
          <div className="flex items-center space-x-2">
            {showDownload && (
              <button
                onClick={handleDownload}
                className={`
                  p-2 rounded-lg transition-all duration-200
                  flex items-center justify-center
                  ${
                    isDark
                      ? "bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white"
                      : "bg-gray-200 hover:bg-gray-300 text-gray-600 hover:text-gray-900"
                  }
                `}
                aria-label="Download code"
              >
                <Download className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={handleCopy}
              className={`
                p-2 rounded-lg transition-all duration-200
                flex items-center justify-center
                ${
                  isDark
                    ? "bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-600 hover:text-gray-900"
                }
              `}
              aria-label="Copy code"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-500 animate-pulse" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      )}

      {/* Floating copy button (when no header) */}
      {!title && !showDownload && (
        <button
          onClick={handleCopy}
          className={`
            absolute right-4 top-4 z-10
            p-2 rounded-lg transition-all duration-200
            flex items-center justify-center
            ${
              isDark
                ? "bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white"
                : "bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900"
            }
            opacity-0 group-hover:opacity-100 focus:opacity-100
            backdrop-blur-sm
          `}
          aria-label="Copy code"
        >
          {copied ? (
            <Check className="w-5 h-5 text-green-500 animate-pulse" />
          ) : (
            <Copy className="w-5 h-5" />
          )}
        </button>
      )}

      <div className="relative">
        <SyntaxHighlighter
          language={language}
          style={isDark ? solarizedDarkAtom : solarizedlight}
          customStyle={customStyle}
          showLineNumbers
          wrapLongLines
          lineNumberStyle={{
            minWidth: "3em",
            paddingRight: "1em",
            textAlign: "right",
            color: isDark ? "#525252" : "#a0a0a0",
            backgroundColor: isDark ? "#1a1b26" : "#f9f9f9",
            borderRight: `1px solid ${isDark ? "#2d2d2d" : "#e5e7eb"}`,
            marginRight: "1em",
          }}
        >
          {safeContent}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default SnippetBlock;
