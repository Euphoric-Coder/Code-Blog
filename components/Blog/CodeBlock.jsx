import React, { useState, useCallback } from "react";
import { Check, Copy } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  solarizedlight,
  solarizedDarkAtom, 
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { useTheme } from "next-themes";
import { toast } from "sonner";

const CodeBlock = ({ language = "javascript", children }) => {
  const [copied, setCopied] = useState(false);
  const { theme, resolvedTheme } = useTheme();

  const isDark = (theme ?? resolvedTheme) === "dark";
  const safeContent = typeof children === "string" ? children.trim() : "";

  const handleCopy = useCallback(async () => {
    if (!safeContent) return;

    try {
      await navigator.clipboard.writeText(safeContent);
      setCopied(true);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy code.");
      console.error("Copy failed:", err);
    }
  }, [safeContent]);

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
    <div className="relative group rounded-xl overflow-hidden">
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
          <Check className="w-5 h-5 text-green-500 animate-scale-up" />
        ) : (
          <Copy className="w-5 h-5" />
        )}
      </button>

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
            backgroundColor: isDark ? "#1a1b26" : "#ffffff",
            borderRight: `1px solid ${isDark ? "#2d2d2d" : "#e5e7eb"}`,
            marginRight: "1em",
          }}
        >
          {safeContent}
        </SyntaxHighlighter>
      </div>

      {/* Animations */}
      <style jsx>{`
        .animate-scale-up {
          animation: scaleUp 0.3s ease-in-out;
        }

        @keyframes scaleUp {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.3);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default CodeBlock;
