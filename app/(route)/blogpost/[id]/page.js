"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Clock, Share2, Heart, Bookmark, Calendar } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { format } from "date-fns";
import { processContent } from "@/lib/processContent";
import BlogLoader from "@/components/Blog/BlogLoader";
import Comment from "@/components/Blog/Comments";

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

    const convertMarkdownToHtml = () => {
      if (blogData) {
        // setHtmlContent(await markdownToHtml(blogData?.mdFormat));
        setHtmlContent(processContent(blogData?.htmlFormat));
        // setHtmlContent(blogData?.htmlFormat);
      }
    };

    loadBlog();
    convertMarkdownToHtml();
  }, [blogId, blogData]);

  const redirectBlogEditor = () => {
    router.push(`/blog/edit-blog/${blogId}`);
  };

  if (!blogData) {
    return <BlogLoader />;
  }

  return (
    <div className="animate-fadeIn">
      {/* Hero Section */}
      <div
        className="relative h-[50vh] md:h-[60vh] w-full bg-[length:100%_100%] bg-no-repeat bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${blogData.blogImage})`,
        }}
      >
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4 sm:p-6 md:p-10 text-white">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 bg-indigo-600 rounded-full text-sm font-medium mb-4">
              {blogData.category}
            </span>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4 leading-tight">
              {blogData.title}
            </h1>

            <p className="text-lg md:text-xl opacity-90 mb-6">
              {blogData.description}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-6">
              <div className="flex items-center">
                <img
                  src={blogData?.author.avatar}
                  alt={blogData?.author.name}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <span>{blogData?.author.name}</span>
              </div>

              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                <span>{blogData?.readingTime} min read</span>
              </div>

              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                <span>{format(new Date(blogData.date), "PPP")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Share and Save Buttons */}
          <div className="flex justify-between items-center mb-8 pb-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex space-x-4">
              <button className="flex items-center text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors">
                <Heart className="w-5 h-5 mr-2" />
                <span>Like</span>
              </button>
              <button className="flex items-center text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors">
                <Share2 className="w-5 h-5 mr-2" />
                <span>Share</span>
              </button>
            </div>
            <button className="flex items-center text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors">
              <Bookmark className="w-5 h-5 mr-2" />
              <span>Save</span>
            </button>
          </div>

          {/* Main Blog Content */}
          <article className="prose prose-lg lg:prose-xl dark:prose-invert prose-indigo max-w-none">
            <div className="blog-content">{htmlContent}</div>
          </article>

          {/* Author Bio */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-start space-x-4">
              <img
                src={blogData.author.avatar}
                alt={blogData.author.name}
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {blogData.author.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Content creator and technology enthusiast. Writing about the
                  future of technology and how it shapes our world.
                </p>
              </div>
            </div>
          </div>

          {/* Comments */}
          {/* <CommentSection
            comments={blogData.comments || []}
            onAddComment={handleAddComment}
          /> */}

          <Comment blogId={blogId} />
        </div>
      </div>
    </div>
  );
}
