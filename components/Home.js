"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

// Dynamically import Typewriter for the hero section
const Typewriter = dynamic(() => import("typewriter-effect"), { ssr: false });

export default function HomeClient({ initialPosts }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const { theme } = useTheme();

  // Filter posts based on search term
  useEffect(() => {
    if (searchTerm) {
      const filtered = initialPosts.filter((post) => {
        const title = post.title?.toLowerCase() || "";
        const description = post.description?.toLowerCase() || "";
        const category = post.category || [];

        return (
          title.includes(searchTerm.toLowerCase()) ||
          description.includes(searchTerm.toLowerCase()) ||
          category.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          )
        );
      });
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts([]);
    }
  }, [searchTerm, initialPosts]);

  // Filter posts with the 'feature' tag set to true
  useEffect(() => {
    const featured = initialPosts.filter((post) => post.feature === true);
    setFeaturedPosts(featured);
  }, [initialPosts]);

  return (
    <main className="w-full min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100">
      {/* Hero Section */}
      <section className="w-full min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-700 via-pink-600 to-red-500 dark:from-indigo-900 dark:via-blue-800 dark:to-purple-800 shadow-2xl flex flex-col items-center justify-center text-center">
        {/* Full-width translucent background image */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/heroimage.jpg" // Use your uploaded image here
            alt="hero background"
            className="object-cover w-full h-full opacity-30 scale-105"
          />
        </div>
        {/* Animated Overlay */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent to-black opacity-60" />

        <div className="z-10 container mx-auto flex flex-col items-center justify-center space-y-10 px-6">
          <h1 className="text-6xl font-extrabold leading-tight text-white z-10 md:text-7xl lg:text-8xl">
            Master <span className="text-yellow-400">Your Coding Skills</span>
          </h1>
          <div className="text-4xl font-semibold text-yellow-300 z-10 md:text-5xl">
            <Typewriter
              options={{
                strings: [
                  "Web Development",
                  "Machine Learning",
                  "Tech Insights",
                ],
                autoStart: true,
                loop: true,
              }}
            />
          </div>
          <p className="text-2xl text-white mt-4 z-10">
            Explore expert tutorials, blogs, and tips to elevate your skills.
          </p>
          <div className="z-10">
            <Link href="/blog" passHref>
              <Button
                variant="default"
                className="px-12 py-4 bg-yellow-400 hover:bg-yellow-500 text-white font-bold rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 text-xl"
              >
                Explore Blogs
              </Button>
            </Link>
          </div>

          {/* Floating Interactive Elements */}
          <div className="absolute z-0 top-10 left-10 w-64 h-64 bg-yellow-400 rounded-full opacity-20 animate-pulse blur-2xl"></div>
          <div className="absolute z-0 bottom-16 right-16 w-72 h-72 bg-pink-600 rounded-full opacity-25 animate-pulse blur-3xl"></div>
        </div>
      </section>

      {/* Search Section */}
      <section className="w-full py-24 bg-gradient-to-b from-purple-50 via-yellow-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 text-gray-800 dark:text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-extrabold mb-12">Search for a Blog</h2>
          <p className="text-xl mb-8">
            Find exactly what you're looking for in seconds.
          </p>
          <div className="max-w-lg mx-auto">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-4 rounded-full shadow-2xl border-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-4 focus:ring-yellow-500 transition-all duration-300"
              placeholder="Search by title, category, or keyword..."
            />
          </div>

          {searchTerm && filteredPosts.length > 0 && (
            <div className="container mx-auto mt-12">
              <h3 className="text-4xl font-semibold">
                Results for "{searchTerm}"
              </h3>
              <ul className="space-y-6 mt-8">
                {filteredPosts.map((post) => (
                  <li
                    key={post.slug}
                    className="border-b border-gray-200 dark:border-gray-600 py-6"
                  >
                    <Link href={`/blogpost/${post.slug}`}>
                      <p className="text-2xl font-bold text-yellow-400 hover:underline transition">
                        {post.title}
                      </p>
                    </Link>
                    <p className="mt-2">{post.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {searchTerm && filteredPosts.length === 0 && (
            <div className="container mx-auto mt-12 text-center">
              <p className="text-xl">No blogs found for "{searchTerm}"</p>
            </div>
          )}
        </div>
      </section>

      {/* Featured Blogs Section */}
      <section className="w-full py-24 bg-gradient-to-b from-yellow-200 via-pink-100 to-red-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 text-gray-800 dark:text-white shadow-xl">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-extrabold mb-12">Featured Blogs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {featuredPosts.map((post) => (
              <div
                key={post.slug}
                className="relative overflow-hidden rounded-3xl shadow-2xl transform transition-all duration-500 hover:scale-105 bg-gradient-to-r from-yellow-200 via-pink-200 to-red-200 dark:from-purple-800 dark:via-blue-700 dark:to-pink-600 text-gray-900 dark:text-white"
              >
                <div className="h-64 overflow-hidden rounded-t-3xl relative">
                  <img
                    src={post.image || "/placeholder.png"}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    alt={post.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70 z-10"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-3xl font-bold">{post.title}</h3>
                  <p className="mt-2">{post.description}</p>
                  <Link href={`/blogpost/${post.slug}`}>
                    <p className="block mt-6 text-lg text-purple-700 dark:text-purple-400 font-semibold underline transition-all hover:text-purple-500">
                      Read More →
                    </p>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
