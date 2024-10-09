"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

// Dynamically import Typewriter so it's only rendered on the client-side
const Typewriter = dynamic(() => import("typewriter-effect"), { ssr: false });

export default function Home() {
  const { theme } = useTheme(); // Use theme from next-themes for light/dark mode detection

  return (
    <main className="w-full mx-auto min-h-screen">
      <section className="container px-4 py-10 mx-auto lg:h-128 lg:space-x-8 lg:flex lg:items-center">
        <div className="w-full mt-4 lg:mt-0 lg:w-1/2">
          <img
            src="https://www.creative-tim.com/twcomponents/svg/website-designer-bro-purple.svg"
            alt="tailwind css components"
            className="w-full h-full max-w-md mx-auto animate-pulse"
          />
        </div>
        <div className="w-full text-center lg:text-left lg:w-1/2 lg:-mt-8">
          <h1 className="text-3xl leading-snug text-gray-800 dark:text-gray-200 md:text-4xl">
            Explore <span className="font-semibold">every detail</span> about
            <br className="hidden lg:block" />{" "}
            <span className="font-semibold underline decoration-primary inline-block">
              <Typewriter
                options={{
                  strings: ["Machine Learning"],
                  autoStart: true,
                  loop: true,
                }}
                className=""
              />
            </span>
          </h1>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-300">
            Open source Tailwind UI components and templates to{" "}
            <br className="hidden lg:block" /> bootstrap your new apps, projects
            or landing sites!
          </p>
        </div>
      </section>

      {/* Top Blogs Section */}
      <section className="py-12 bg-gray-100 dark:bg-gray-900">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-200">
              Top Blogs
            </h2>
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-300">
              Check out our most popular blog posts
            </p>
          </div>
          <div className="flex flex-wrap justify-center">
            {/* Blog 1 */}
            <div className="w-full sm:w-1/2 lg:w-1/3 p-4">
              <div
                className={`p-6 rounded-lg shadow-lg transform transition duration-500 hover:scale-105 ${
                  theme === "dark"
                    ? "bg-gradient-to-r from-purple-800 to-blue-800 text-white"
                    : "bg-gradient-to-r from-blue-100 to-purple-200 text-gray-800"
                }`}
              >
                <img
                  src="/typescript.webp"
                  className="w-full h-64 object-cover rounded-t-lg"
                  alt="Blog 1"
                />
                <div className="mt-4">
                  <h3 className="text-xl font-semibold">Blog Post Title 1</h3>
                  <p className="mt-2">
                    A brief description of the blog post goes here. It should be
                    engaging and informative.
                  </p>
                  <Link
                    href="/blogpost/cpp-programming-tutorial"
                    className={`${buttonVariants({ variant: "default" })} 
             rounded-lg bg-purple-500 text-white border-purple-500 
             hover:bg-purple-600 hover:border-purple-600 
             transition-colors duration-200 mt-4 block`}
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>

            {/* Blog 2 */}
            <div className="w-full sm:w-1/2 lg:w-1/3 p-4">
              <div
                className={`p-6 rounded-lg shadow-lg transform transition duration-500 hover:scale-105 ${
                  theme === "dark"
                    ? "bg-gradient-to-r from-purple-800 to-blue-800 text-white"
                    : "bg-gradient-to-r from-blue-100 to-purple-200 text-gray-800"
                }`}
              >
                <img
                  src="https://images.pexels.com/photos/1181472/pexels-photo-1181472.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Blog 2"
                  className="w-full h-64 object-cover rounded-t-lg"
                />
                <div className="mt-4">
                  <h3 className="text-xl font-semibold">Blog Post Title 2</h3>
                  <p className="mt-2">
                    A brief description of the blog post goes here. It should be
                    engaging and informative.
                  </p>
                  <Link
                    href="/blogpost/blog-post-2"
                    className={`${buttonVariants({ variant: "default" })} 
             rounded-lg bg-purple-500 text-white border-purple-500 
             hover:bg-purple-600 hover:border-purple-600 
             transition-colors duration-200 mt-4 block`}
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>

            {/* Blog 3 */}
            <div className="w-full sm:w-1/2 lg:w-1/3 p-4">
              <div
                className={`p-6 rounded-lg shadow-lg transform transition duration-500 hover:scale-105 ${
                  theme === "dark"
                    ? "bg-gradient-to-r from-purple-800 to-blue-800 text-white"
                    : "bg-gradient-to-r from-blue-100 to-purple-200 text-gray-800"
                }`}
              >
                <img
                  src="https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg"
                  alt="Blog 3"
                  className="w-full h-64 object-cover rounded-t-lg"
                />
                <div className="mt-4">
                  <h3 className="text-xl font-semibold">Blog Post Title 3</h3>
                  <p className="mt-2">
                    A brief description of the blog post goes here. It should be
                    engaging and informative.
                  </p>
                  <Link
                    href="/blogpost/blog-post-3"
                    className={`${buttonVariants({ variant: "default" })} 
             rounded-lg bg-purple-500 text-white border-purple-500 
             hover:bg-purple-600 hover:border-purple-600 
             transition-colors duration-200 mt-4 block`}
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
