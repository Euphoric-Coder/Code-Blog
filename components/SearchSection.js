"use client";

export default function SearchSection({
  searchTerm,
  setSearchTerm,
  filteredPosts,
}) {
  return (
    <section className="w-full py-12">
      {" "}
      {/* Reduced top and bottom padding */}
      <div className="container mx-auto text-center">
        <h2 className="text-5xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-400 dark:to-pink-400">
          Search for a Blog
        </h2>
        <p className="text-xl mb-6">
          Find exactly what you&apos;re looking for in seconds.
        </p>
        <div className="max-w-lg mx-auto">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-6 py-4 rounded-full shadow-2xl border-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-4 focus:ring-blue-500 transition-all duration-300"
            placeholder="Search by title, category, or keyword..."
          />
        </div>

        {searchTerm && filteredPosts.length > 0 && (
          <div className="container mx-auto mt-8">
            <h3 className="text-4xl font-semibold">
              Results for &quot;{searchTerm}&quot;
            </h3>
            <ul className="space-y-4 mt-6">
              {filteredPosts.map((post) => (
                <li
                  key={post.slug}
                  className="border-b border-gray-200 dark:border-gray-600 py-4"
                >
                  <a href={`/blogpost/${post.slug}`}>
                    <p className="text-2xl font-bold text-blue-600 hover:underline transition">
                      {post.title}
                    </p>
                  </a>
                  <p className="mt-2">{post.description}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {searchTerm && filteredPosts.length === 0 && (
          <div className="container mx-auto mt-8 text-center">
            <p className="text-xl">
              No blogs found for &quot;{searchTerm}&quot;
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
