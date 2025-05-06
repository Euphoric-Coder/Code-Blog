"use client";

import { useParams, useRouter } from "next/navigation";
import { markdownToHtml } from "@/components/MarkdownProcessor";
import OnThisPage from "@/components/onthispage";
import Comment from "@/components/Comments";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PenBox } from "lucide-react";
import { useUser } from "@clerk/nextjs";

export default function Page() {
  const blogId = useParams().id;
  const router = useRouter();
  const { user } = useUser();
  const [blogData, setBlogData] = useState(null);

  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    const loadBlog = async () => {
      const response = await fetch(`/api/fetch-blogs/${blogId}`);
      const data = await response.json();
      setBlogData(data);
    };

    const convertMarkdownToHtml = async () => {
      if (blogData) {
        setHtmlContent(await markdownToHtml(blogData?.mdFormat));
      }
    };

    loadBlog();
    convertMarkdownToHtml();
    console.log(htmlContent);
    console.log(blogData?.htmlFormat);
  }, [blogId, blogData, htmlContent]);

  const redirectBlogEditor = () => {
    router.push(`/blog/edit-blog/${blogId}`);
  };

  if (!blogData) {
    return (
      <div className="max-w-[95%] mx-auto p-4">
        <h1 className="flex justify-center text-6xl font-bold mb-4">
          Loading...
        </h1>
      </div>
    );
  }

  return (
    <div className="max-w-[95%] mx-auto p-4">
      {/* Main container for flex layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar - takes up the left part of the screen on large screens */}
        <div className="lg:w-1/4 hidden lg:block">
          <OnThisPage htmlContent={htmlContent} />
        </div>

        {/* Main content + comment side-by-side */}
        <div className="flex flex-col gap-2 w-full">
          {/* Blog Main Content */}
          <div className="w-full">
            {blogData.createdBy ===
              `${user?.primaryEmailAddress.emailAddress}` && (
              <div className="flex justify-end mb-2">
                <Button onClick={redirectBlogEditor}>
                  <PenBox className="mr-2" /> Edit Blog
                </Button>
              </div>
            )}
            <div className="flex justify-center items-center">
              <Image
                src={blogData?.blogImage || "/placeholder.png"}
                alt={blogData?.title || "Blog Cover Image"}
                width={800}
                height={400}
                className="object-contain w-full h-[400px] rounded-lg mb-4"
                draggable="false"
              />
            </div>
            <h1 className="flex justify-center text-6xl font-bold mb-4">
              {blogData?.title}
            </h1>
            <p className="text-base mb-2 border-l-4 border-gray-500 pl-4 italic">
              &quot;{blogData?.description}&quot;
            </p>
            <div className="flex justify-between items-center gap-2 mb-10">
              <p className="text-sm text-gray-500 mb-4 italic">
                By {blogData?.author}
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Updated: {blogData?.date.split("T")[0]}
              </p>
            </div>
            <div
              dangerouslySetInnerHTML={{ __html: htmlContent }}
              className="prose prose-lg dark:prose-invert max-w-none mb-10"
            ></div>
            {/* <div
              dangerouslySetInnerHTML={{ __html: blogData.htmlFormat }}
              className="prose prose-lg dark:prose-invert max-w-none mb-10"
            ></div> */}
          </div>

          {/* Comment Component - sticky on large screens */}
          <div className="w-full">
            <div className="w-full">
              <Comment blogId="this-is-just-a-test-for-the-following--cb6c5e7a-bab2-459a-a94c-556bbd59184c" />
              {/* <Comment blogId={blogId}/> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
