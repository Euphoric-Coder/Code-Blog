"use client";

import Link from "next/link";
import Image from "next/image";

export default function FeaturedBlogsSection({ featuredPosts }) {
  return (
    <section className="w-full py-16">
      {" "}
      {/* Reduced padding from py-24 to py-16 */}
      <div className="container mx-auto text-center">
        <h2 className="text-5xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-400 dark:to-pink-400">
          {" "}
          {/* Reduced margin-bottom */}
          Featured Blogs
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {" "}
          {/* Reduced gap */}
          {featuredPosts.map((post) => (
            <div
              key={post.slug}
              className="relative overflow-hidden rounded-3xl shadow-2xl transform transition-all duration-500 hover:scale-105 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            >
              <div className="h-64 overflow-hidden rounded-t-3xl relative">
                <Image
                  src={post.image || "/placeholder.png"}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  alt={post.title}
                  height={10}
                  width={10}
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
  );
}
