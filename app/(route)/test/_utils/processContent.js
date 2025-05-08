import React from "react";
import parse, { domToReact } from "html-react-parser";
import CodeBlock from "../_components/CodeBlock";

// Decode entities
const decodeHTMLEntities = (str) =>
  str
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

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
          domToReact(codeNode.children).toString()
        );

        return <CodeBlock language={language}>{rawCode}</CodeBlock>;
      }
    },
  });
};
