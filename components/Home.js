"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Dynamically import Typewriter so it's only rendered on the client-side
const Typewriter = dynamic(() => import("typewriter-effect"), { ssr: false });

export default function HomeClient({ initialPosts }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [featuredPosts, setFeaturedPosts] = useState([]);

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
      setFilteredPosts([]); // Show nothing when no search term is entered
    }
  }, [searchTerm, initialPosts]);

  // Filter posts with the feature tag set to true
  useEffect(() => {
    const featured = initialPosts.filter((post) => post.feature === true);
    setFeaturedPosts(featured);
  }, [initialPosts]);

  return (
    <main className="w-full mx-auto min-h-screen">
      {/* Hero Section */}
      <section className="container px-4 py-10 mx-auto lg:h-128 lg:space-x-8 lg:flex lg:items-center">
        <div className="w-full mt-4 lg:mt-0 lg:w-1/2">
          <img
            src="https://www.creative-tim.com/twcomponents/svg/website-designer-bro-purple.svg"
            alt="hero"
            className="w-full h-full max-w-md mx-auto animate-pulse"
          />
        </div>
        <div className="w-full text-center lg:text-left lg:w-1/2 lg:-mt-8">
          <h1 className="text-4xl leading-snug text-gray-800 dark:text-gray-200 md:text-5xl font-bold">
            Welcome to{" "}
            <span className="font-semibold text-purple-600 dark:text-purple-400">
              Code Blog
            </span>
            !
            <br className="hidden lg:block" />
            <span className="font-semibold underline decoration-primary inline-block">
              <Typewriter
                options={{
                  strings: [
                    "Latest in Tech",
                    "Web Development",
                    "Machine Learning",
                  ],
                  autoStart: true,
                  loop: true,
                }}
                className=""
              />
            </span>
          </h1>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-300">
            Explore top articles, tutorials, and insights from the world of
            development.
          </p>

          {/* Call to Action Button */}
          <div className="mt-6">
            <Link href="/blog" passHref>
              <Button variant="default">Explore Blogs</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
              Search for a Blog
            </h2>
            <p className="mt-2 text-lg text-gray-500 dark:text-gray-300">
              Looking for something specific? Search through our collection of
              blog posts.
            </p>
          </div>
          <div className="max-w-lg mx-auto">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 rounded-lg shadow-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring focus:ring-purple-500"
              placeholder="Search by title, category, or keyword..."
            />
          </div>
        </div>

        {/* Display filtered search results */}
        {searchTerm && filteredPosts.length > 0 && (
          <div className="container mx-auto mt-6">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              Search Results
            </h3>
            <ul className="space-y-4 mt-4">
              {filteredPosts.map((post) => (
                <li key={post.slug} className="border-b border-gray-200 py-2">
                  <Link href={`/blogpost/${post.slug}`}>
                    <p className="text-lg font-bold text-purple-600 dark:text-purple-400">
                      {post.title}
                    </p>
                  </Link>
                  <p className="text-gray-600 dark:text-gray-400">
                    {post.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* No Results */}
        {searchTerm && filteredPosts.length === 0 && (
          <div className="container mx-auto mt-6 text-center">
            <p className="text-lg text-gray-600 dark:text-gray-400">
              No blogs found for "{searchTerm}"
            </p>
          </div>
        )}
      </section>

      {/* Featured Blogs Section */}
      <section className="py-12 bg-gray-100 dark:bg-gray-900">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-200">
              Featured Blogs
            </h2>
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-300">
              Curated selection of our best posts.
            </p>
          </div>

          <div className="flex flex-wrap justify-center">
            {featuredPosts.map((post) => (
              <div key={post.slug} className="w-full sm:w-1/2 lg:w-1/3 p-4">
                <div
                  className={`p-6 rounded-lg shadow-lg transform transition duration-500 hover:scale-105 ${
                    post.feature
                      ? "bg-gradient-to-r from-purple-800 to-blue-800 text-white"
                      : "bg-gradient-to-r from-blue-100 to-purple-200 text-gray-800"
                  }`}
                >
                  <img
                    src={post.image || "/placeholder.png"}
                    className="w-full h-64 object-cover rounded-t-lg"
                    alt={post.title}
                  />
                  <div className="mt-4">
                    <h3 className="text-xl font-semibold">{post.title}</h3>
                    <p className="mt-2">{post.description}</p>
                    <Link href={`/blogpost/${post.slug}`}>
                      <p className="block mt-4 text-purple-500 hover:text-purple-600">
                        Read More →
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
