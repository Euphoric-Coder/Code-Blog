import React from "react";
import rehypeDocument from "rehype-document";
import rehypeFormat from "rehype-format";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import rehypePrettyCode from "rehype-pretty-code";
import { transformerCopyButton } from "@rehype-pretty/transformers";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

const page = async () => {
  const blog = {
    content:
      'That\'s a boring paragraph followed by a fenced code block:\n\n```javascript\nfor (var i=1; i <= 20; i++)\n{\n  if (i % 15 == 0)\n    console.log("FizzBuzz");\n  else if (i % 3 == 0)\n    console.log("Fizz");\n  else if (i % 5 == 0)\n    console.log("Buzz");\n  else\n    console.log(i);\n}\n```\n\nPress Command/Ctrl + Enter to leave the fenced code block and continue typing in boring paragraphs.',
    slug: "",
    title: "",
  };

  // Initialize the unified processor to convert markdown to HTML
  const processor = unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeDocument, { title: blog.title || "Blog Post" })
    .use(rehypeFormat)
    .use(rehypeStringify)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings)
    .use(rehypePrettyCode, {
      theme: "github-dark-dimmed",
      transformers: [
        transformerCopyButton({
          visibility: "always",
          feedbackDuration: 3_000,
        }),
      ],
    });

  const htmlContent = (await processor.process(blog.content)).toString();

  return (
    <div className="max-w-[95%] mx-auto p-4">
      {/* Main container for flex layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar - takes up the left part of the screen on large screens */}
        <div className="lg:w-1/5 hidden lg:block">
          {/* <OnThisPage htmlContent={htmlContent} /> */}
        </div>

        {/* Main content - takes up the remaining space */}
        <div className="lg:w-4/5 w-full">
          <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
          <p className="text-base mb-2 border-l-4 border-gray-500 pl-4 italic">
            {/* &quot;{data.description}&quot; */}
            This is just a description
          </p>
          <div className="flex gap-2 mb-10">
            <p className="text-sm text-gray-500 mb-4 italic">
              By {blog.author}
            </p>
            {/* <p className="text-sm text-gray-500 mb-4">{data.date}</p> */}
            <p className="text-sm text-gray-500 mb-4">
              {Date.now().toString()}
            </p>
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: htmlContent }}
            className="prose prose-lg dark:prose-invert max-w-none"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default page;
