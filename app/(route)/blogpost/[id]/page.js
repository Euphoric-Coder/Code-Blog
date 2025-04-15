"use client";

import { useParams } from "next/navigation";
import { markdownToHtml } from "@/components/MarkdownProcessor";
import { useEffect, useState } from "react";
import OnThisPage from "@/components/onthispage";
import Comment from "@/components/Comments";
import BlogHTMLContent from "@/components/Blog/BlogHTMLContent";

export default function Page() {
  const blogId = useParams().id;
  const [blogData, setBlogData] = useState(null);

  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    const loadBlog = async () => {
      const response = await fetch(`/api/fetch-blogs/${blogId}`);
      const data = await response.json();
      console.log(data)
      setBlogData(data);
    };

    const convertMarkdownToHtml = async () => {
      if (blogData) {
        setHtmlContent(await markdownToHtml(blogData?.mdFormat));
      }
    };

    loadBlog();
    convertMarkdownToHtml()
    
  }, [blogId, blogData, htmlContent]);

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
            <h1 className="text-4xl font-bold mb-4">{blogData?.title}</h1>
            <p className="text-base mb-2 border-l-4 border-gray-500 pl-4 italic">
              &quot;{blogData?.description}&quot;
            </p>
            <div className="flex gap-2 mb-10">
              <p className="text-sm text-gray-500 mb-4 italic">
                By {blogData?.author}
              </p>
              <p className="text-sm text-gray-500 mb-4">{blogData?.date}</p>
            </div>
            <BlogHTMLContent mdContent={blogData?.mdFormat}/>
            {blogData?.mdFormat}
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
