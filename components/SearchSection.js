"use client";

import Link from "next/link";

export default function SearchSection({
  searchTerm,
  setSearchTerm,
  filteredPosts,
}) {
  return (
    <section className="w-full py-12">
      <div className="container mx-auto text-center">
        {/* Enhanced Heading with Gradient */}
        <h2 className="p-2 text-5xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 dark:from-purple-400 dark:via-pink-500 dark:to-yellow-400">
          Search for a Blog
        </h2>

        {/* Subheading */}
        <p className="text-xl mb-6 text-gray-700 dark:text-gray-300">
          Find exactly what you&apos;re looking for in seconds.
        </p>

        {/* Enhanced Search Input Box with Clear Button */}
        <div className="relative max-w-lg mx-auto mb-10">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-6 py-4 rounded-full shadow-lg bg-white dark:bg-gray-900 dark:text-white text-gray-800 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-4 focus:ring-blue-500 dark:focus:ring-purple-600 transition-all duration-300"
            placeholder="Search by title, category, or keyword..."
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full shadow-lg hover:shadow-xl hover:from-red-600 hover:to-pink-600 active:scale-95 transition-all duration-300"
              type="button"
            >
              Clear
            </button>
          )}
        </div>

        {/* Search Results */}
        {searchTerm && filteredPosts.length > 0 && (
          <div className="container mx-auto mt-10">
            <h3 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 dark:from-purple-400 dark:via-pink-500 dark:to-yellow-400">
              Results for &quot;{searchTerm}&quot;
            </h3>
            <ul className="grid gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => (
                <Link href={`/blogpost/${post.slug}`} passHref key={post.slug}>
                  <li
                    className={`relative p-6 min-h-[200px] bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-500 transform hover:scale-105 hover:shadow-xl cursor-pointer hover:border-blue-500 dark:hover:border-purple-500 flex flex-col justify-between`}
                  >
                    <div>
                      {/* Title with fixed gradient styling */}
                      <p
                        className={`text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-500 dark:from-pink-400 dark:to-yellow-400 mb-4`}
                      >
                        {post.title}
                      </p>

                      {/* Improved description with better readability */}
                      <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                        {post.description}
                      </p>
                    </div>

                    {/* Refined category tags */}
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {post.category.map((cat, index) => (
                        <span
                          key={index}
                          className="inline-block bg-gradient-to-r from-blue-500 to-teal-500 dark:from-pink-400 dark:to-yellow-400 text-white px-2 py-1 rounded-full text-xs shadow-md transition-transform transform hover:scale-110"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>

                    {/* Subtle box shadow effect */}
                    <div className="absolute inset-0 rounded-xl opacity-0 hover:opacity-100 hover:shadow-lg hover:shadow-blue-500/50 dark:hover:shadow-purple-500/50 transition-all duration-500"></div>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        )}

        {/* No Results */}
        {searchTerm && filteredPosts.length === 0 && (
          <div className="container mx-auto mt-10 text-center">
            <p className="text-xl text-gray-600 dark:text-gray-300">
              No blogs found for &quot;{searchTerm}&quot;
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
