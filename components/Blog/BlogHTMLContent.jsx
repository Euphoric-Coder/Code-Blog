"use client";

import React, { useEffect, useState } from "react";
import { markdownToHtml } from "../MarkdownProcessor";

const BlogHTMLContent = ({ mdContent }) => {
  const [htmlContent, sethtmlContent] = useState("");

  useEffect(() => {
    const convertMarkdownToHtml = async () => {
      const html = await markdownToHtml(mdContent);
      sethtmlContent(html);
    };
    convertMarkdownToHtml();
  });

  return (
    <div
      dangerouslySetInnerHTML={{ __html: htmlContent }}
      className="prose prose-lg dark:prose-invert max-w-none mb-10"
    ></div>
  );
};

export default BlogHTMLContent;
