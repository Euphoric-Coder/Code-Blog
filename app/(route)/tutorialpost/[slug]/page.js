import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
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
import OnThisPage from "@/components/onthispage";

// Generate static params for dynamic routes
export async function generateStaticParams() {
  const contentDir = path.join(process.cwd(), "content");

  // Read all markdown files from the 'content' directory
  const filenames = fs.readdirSync(contentDir);

  // Map each filename to the corresponding slug (without the .md extension)
  const slugs = filenames.map((filename) => ({
    slug: filename.replace(".md", ""),
  }));

  return slugs; // Return an array of params for each slug
}

export default async function Page({ params }) {
  const filepath = `content/${params.slug}.md`;

  // Check if the file exists, if not return a 404 page
  if (!fs.existsSync(filepath)) {
    notFound();
    return;
  }

  // Read the content of the markdown file
  const fileContent = fs.readFileSync(filepath, "utf-8");
  const { content, data } = matter(fileContent); // Parse the frontmatter and content

  // Initialize the unified processor to convert markdown to HTML
  const processor = unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeDocument, { title: data.title || "Blog Post" })
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

  // Convert markdown content to HTML
  const htmlContent = (await processor.process(content)).toString();

  return (
    <div className="max-w-[95%] mx-auto p-4">
      {/* Main container for flex layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar - takes up the left part of the screen on large screens */}
        <div className="lg:w-1/5 hidden lg:block">
          <OnThisPage htmlContent={htmlContent} />
        </div>

        {/* Main content - takes up the remaining space */}
        <div className="lg:w-4/5 w-full">
          <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
          <p className="text-base mb-2 border-l-4 border-gray-500 pl-4 italic">
            &quot;{data.description}&quot;
          </p>
          <div className="flex gap-2 mb-10">
            <p className="text-sm text-gray-500 mb-4 italic">
              By {data.author}
            </p>
            <p className="text-sm text-gray-500 mb-4">{data.date}</p>
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: htmlContent }}
            className="prose prose-lg dark:prose-invert max-w-none"
          ></div>
        </div>
      </div>
    </div>
  );
}
