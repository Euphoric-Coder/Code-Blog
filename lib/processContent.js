import React from "react";
import parse from "html-react-parser";
import CodeBlock from "@/components/Blog/CodeBlock";

// Decode any HTML entities for the code block
const decodeHTMLEntities = (str) =>
  str
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

// Recurse to extract raw text content from all children
const extractTextFromChildren = (nodes) => {
  let result = "";

  for (const node of nodes) {
    if (node.type === "text") {
      result += node.data;
    } else if (node.children) {
      result += extractTextFromChildren(node.children);
    }
  }

  return result;
};

export const processContent = (html) => {
  return parse(html, {
    replace: (domNode) => {
      if (
        domNode.name === "pre" &&
        domNode.children &&
        domNode.children[0]?.name === "code"
      ) {
        const codeNode = domNode.children[0];
        const languageClass = codeNode.attribs?.class || "language-js";
        const language = languageClass.replace("language-", "") || "javascript";

        const rawCode = decodeHTMLEntities(
          extractTextFromChildren(codeNode.children)
        );

        return <CodeBlock language={language}>{rawCode}</CodeBlock>;
      }
    },
  });
};
