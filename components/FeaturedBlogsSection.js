"use client";

import Link from "next/link";
import Image from "next/image";

export default function FeaturedBlogsSection({ featuredPosts }) {
  return (
    <section className="w-full py-12">
      <div className="container mx-auto text-center">
        {/* Heading with a more prominent gradient */}
        <h2 className="p-2 text-5xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-teal-500 to-green-500 dark:from-purple-400 dark:via-pink-500 dark:to-yellow-500">
          Featured Blogs
        </h2>

        {/* Featured Blogs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPosts.map((post) => (
            <Link href={`/blogpost/${post.slug}`} key={post.slug} passHref>
              <div className="relative overflow-hidden rounded-3xl shadow-2xl transform transition-all duration-500 hover:scale-110 bg-gradient-to-br from-blue-400 via-white to-blue-200 dark:from-gray-800 dark:via-gray-900 dark:to-black text-gray-900 dark:text-gray-100 cursor-pointer">
                {/* Image section */}
                <div className="h-64 overflow-hidden rounded-t-3xl relative">
                  <Image
                    src={post.image || "/placeholder.png"}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-125"
                    alt={post.title}
                    height={10}
                    width={10}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-70 z-10"></div>
                </div>

                {/* Blog Content */}
                <div className="p-6">
                  <h3 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500 dark:from-pink-400 dark:to-yellow-400 mb-2 transition-all duration-300">
                    {post.title}
                  </h3>
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    {post.description}
                  </p>

                  {/* Categories Section */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {post.category.map((cat, index) => (
                      <span
                        key={index}
                        className="inline-block bg-gradient-to-r from-blue-600 to-teal-500 dark:from-pink-400 dark:to-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md transition-transform transform hover:scale-110"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>

                  {/* Read More Link */}
                  <p className="mt-6 text-lg text-blue-600 dark:text-pink-500 font-semibold underline transition-all hover:text-blue-800 dark:hover:text-pink-600">
                    Read More →
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
