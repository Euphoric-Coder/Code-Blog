// lib/markdownProcessor.js

import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import { transformerCopyButton } from "@rehype-pretty/transformers";
import rehypeFormat from "rehype-format";
import remarkGfm from "remark-gfm";

// Optional: only if you want a full HTML <html> document
// import rehypeDocument from "rehype-document";

export async function markdownToHtml(markdown, theme = "github-dark-dimmed") {
  const processor = unified()
    .use(remarkParse) // Parse markdown
    .use(remarkGfm) // Support for GFM (GitHub Flavored Markdown) like Tables, Strikethrough, etc.
    .use(remarkRehype) // Convert to HTML AST
    .use(rehypeSlug) // Add id="" to headings
    .use(rehypeAutolinkHeadings, {
      behavior: "wrap",
    })
    .use(rehypePrettyCode, {
      theme,
      transformers: [
        transformerCopyButton({
          visibility: "always",
          feedbackDuration: 3000,
        }),
      ],
    })
    .use(rehypeFormat) // Optional: prettify output
    // .use(rehypeDocument, { title: "Blog Post" }) // Optional full HTML doc
    .use(rehypeStringify); // Serialize HTML

  const file = await processor.process(markdown);
  return file.toString(); // Returns HTML string
}
