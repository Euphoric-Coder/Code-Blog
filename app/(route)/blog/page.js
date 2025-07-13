"use client";

import BlogFetch from "@/components/Blog/BlogFetch";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { formatDate } from "date-fns";
import { BookOpen, PenBox, PlusCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Page = () => {
  const [blogData, setblogData] = useState([]);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    const response = await fetch("/api/fetch-blogs/");
    const data = await response.json();

    console.log(data);
    setblogData(data);
  };

  const refreshData = () => {
    loadBlogs();
  };

  return (
    <main className="relative w-full min-h-screen bg-gradient-to-b from-blue-50 via-white to-white dark:from-gray-800 dark:via-gray-800 dark:to-blue-950 text-gray-900 dark:text-gray-100 transition-all duration-700">
      {/* Hero Section Heading */}
      <section className="py-20 bg-gradient-to-b from-blue-100 via-blue-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800">
        <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between">
          {/* Main Text Section */}
          <div className="lg:w-3/5 text-center lg:text-left mb-12 lg:mb-0">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-500 to-teal-400 dark:from-teal-300 dark:via-blue-400 dark:to-indigo-500 mb-6 drop-shadow-md">
              Stay Ahead in Tech & Innovation
            </h1>
            <p className="text-lg sm:text-xl lg:text-lg xl:text-xl font-serif leading-relaxed mb-8 text-gray-800 dark:text-gray-300 max-w-2xl lg:max-w-full">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 dark:from-gray-200 dark:to-gray-400">
                Explore expert-led blogs on{" "}
              </span>
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-300 dark:to-blue-400">
                Full Stack Development
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 dark:from-gray-200 dark:to-gray-400">
                , advancements in{" "}
              </span>
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-300 dark:to-pink-400">
                AI/ML
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 dark:from-gray-200 dark:to-gray-400">
                , and insights into{" "}
              </span>
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600 dark:from-blue-300 dark:to-teal-400">
                Cloud Computing
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 dark:from-gray-200 dark:to-gray-400">
                . Stay informed with the latest in{" "}
              </span>
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-teal-600 dark:from-indigo-300 dark:to-teal-400">
                Blockchain
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 dark:from-gray-200 dark:to-gray-400">
                ,{" "}
              </span>
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600 dark:from-yellow-300 dark:to-orange-400">
                DevOps
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 dark:from-gray-200 dark:to-gray-400">
                , and more to elevate your tech journey.
              </span>
            </p>
            <div className="mt-10 flex justify-center lg:justify-start gap-4">
              {/* Call to Action Buttons */}
              <Link href={"/blog/add-blog/"}>
                <button className="flex gap-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-medium rounded-full shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-300 ease-out dark:from-teal-400 dark:to-blue-500">
                  <PlusCircle />
                  Create Blogs
                </button>
              </Link>
              {/* Edit Blog Button with Dialog */}
              <Dialog
                open={isEditDialogOpen}
                onOpenChange={setIsEditDialogOpen}
              >
                <DialogTrigger asChild>
                  <button
                    className="flex gap-1 px-6 py-3 bg-gray-200 text-gray-800 font-medium rounded-full shadow-lg hover:scale-105 hover:bg-gray-300 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-700 transition-transform duration-300 ease-out"
                    onClick={() => setIsEditDialogOpen(true)}
                  >
                    <PenBox />
                    Edit Blogs
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">
                      My Blogs
                    </DialogTitle>
                    <DialogDescription>
                      Manage and edit your published blogs. You have{" "}
                      {blogData.length} blog(s).
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-4 mt-6">
                    {blogData.length > 0 ? (
                      blogData.map((blog) => (
                        <div
                          key={blog.id}
                          className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                              {blog.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                              {blog.description}
                            </p>
                            <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
                              <span>
                                Published: {formatDate(blog.date, "PPP")}
                              </span>
                              <span>{blog.views.toLocaleString()} views</span>
                              <span>{blog.likes} likes</span>
                            </div>
                          </div>
                          <Link href={`/blog/edit-blog/${blog.id}`}>
                            <Button size="sm" className="btn7">
                              <PenBox className="h-4 w-4" />
                              Edit
                            </Button>
                          </Link>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                          No blogs yet
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                          You haven't created any blogs yet. Start writing your
                          first blog!
                        </p>
                        <Link href="/blog/add-blog/">
                          <Button className="btn4">
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Create Your First Blog
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Illustration Section */}
          <div className="lg:w-2/5 flex justify-center items-center">
            <Image
              src="/blog-Page.png"
              alt="Blog Illustration"
              width={400}
              height={400}
              className="w-full h-auto max-w-sm drop-shadow-lg rounded-lg transform hover:scale-105 transition-transform duration-500 ease-in-out"
            />
          </div>
        </div>
      </section>

      <section className="pb-10">
        <div className="container mx-auto text-center">
          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 dark:from-purple-400 dark:via-pink-500 dark:to-yellow-400 mb-4 p-2">
            Stay Ahead in Tech & Innovation
          </h1>

          {/* Subheading with tagline */}
          <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500 dark:from-yellow-500 dark:to-purple-400 mb-6">
            Your Daily Dose of Technology Insights
          </p>

          {/* Additional description */}
          <p className="text-md sm:text-lg md:text-xl font-mono font-extrabold leading-relaxed max-w-3xl mx-auto text-transparent bg-clip-text bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 dark:from-gray-200 dark:to-gray-400">
            Dive into expert-led blogs covering{" "}
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-300 dark:to-blue-400">
              Full Stack Development
            </span>
            ,{" "}
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-300 dark:to-pink-400">
              AI/ML advancements
            </span>
            , and{" "}
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600 dark:from-blue-300 dark:to-teal-400">
              Cloud Computing
            </span>{" "}
            insights. Stay informed with the latest in{" "}
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-teal-600 dark:from-indigo-300 dark:to-teal-400">
              Blockchain
            </span>
            ,{" "}
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600 dark:from-yellow-300 dark:to-orange-400">
              DevOps practices
            </span>
            , and more to elevate your tech journey.
          </p>
        </div>
      </section>

      <section>
        <BlogFetch blogs={blogData} refreshData={refreshData} />
      </section>
    </main>
  );
};

export default Page;
