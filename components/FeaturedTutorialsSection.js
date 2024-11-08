"use client";

import Link from "next/link";
import Image from "next/image";

export default function FeaturedTutorialSection({ featuredPosts }) {
  return (
    <section className="w-full py-8">
      {/* Container for featured blogs */}
      <div className="container mx-auto text-center">
        {/* Gradient heading */}
        <h2 className="p-2 text-3xl xs:text-4xl md:text-5xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-teal-500 to-green-500 dark:from-purple-400 dark:via-pink-500 dark:to-yellow-500">
          Featured Blogs
        </h2>

        {/* Responsive blog grid */}
        <div className="p-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {featuredPosts.map((post) => (
            <Link href={`/blogpost/${post.slug}`} key={post.slug} passHref>
              <div className="relative overflow-hidden max-w-sm mx-auto lg:max-w-md rounded-3xl shadow-2xl transform transition-all duration-500 hover:scale-105 bg-gradient-to-br from-blue-400 via-white to-blue-200 dark:from-gray-800 dark:via-gray-900 dark:to-black text-gray-900 dark:text-gray-100 cursor-pointer">
                {/* Image section */}
                <div className="relative overflow-hidden rounded-t-3xl">
                  <Image
                    src={post.image || "/placeholder.png"}
                    alt={post.title}
                    width={700} // Set a responsive width
                    height={400} // Set a responsive height
                    className="object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>

                {/* Blog content */}
                <div className="p-4 xs:p-5 md:p-6 lg:p-8">
                  <h3 className="text-xl xs:text-2xl md:text-3xl lg:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500 dark:from-pink-400 dark:to-yellow-400 mb-2 transition-all duration-300">
                    {post.title}
                  </h3>
                  <p className="text-sm xs:text-base md:text-lg lg:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                    {post.description}
                  </p>

                  {/* Categories section */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {post.category.map((cat, index) => (
                      <span
                        key={index}
                        className="inline-block bg-gradient-to-r from-blue-600 to-teal-500 dark:from-pink-400 dark:to-yellow-500 text-white px-2 py-1 xs:px-3 xs:py-1.5 rounded-full text-xs xs:text-sm md:text-base font-semibold shadow-md transition-transform transform hover:scale-110"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>

                  {/* Read more link */}
                  <p className="mt-4 md:mt-6 text-blue-600 dark:text-pink-500 font-semibold underline transition-all hover:text-blue-800 dark:hover:text-pink-600 text-sm xs:text-base md:text-lg">
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
