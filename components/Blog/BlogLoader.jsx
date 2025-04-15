import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogLoader = ({ blogs }) => {
  // Function to format date consistently using Intl.DateTimeFormat with error handling
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Invalid Date"; // Handle invalid dates
    }
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  };

  return (
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 px-4 py-8">
      {blogs.map((blog, index) => (
        <Link href={`/blogpost/${blog.id}`} key={index}>
          <div className="relative overflow-hidden max-w-sm mx-auto lg:max-w-md rounded-3xl shadow-2xl transform transition-all duration-500 hover:scale-105 bg-gradient-to-br from-blue-400 via-white to-blue-200 dark:from-gray-800 dark:via-gray-900 dark:to-black text-gray-900 dark:text-gray-100 cursor-pointer">
            {/* Image section */}
            <div className="relative overflow-hidden rounded-t-3xl">
              <Image
                src={blog.blogImage !== null ? blog.blogImage : "/placeholder.png"}
                alt={blog.title}
                width={700}
                height={400}
                className="object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>

            {/* Blog content */}
            <div className="p-4 xs:p-5 md:p-6 lg:p-8">
              <h3 className="text-xl xs:text-2xl md:text-3xl lg:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500 dark:from-pink-400 dark:to-yellow-400 mb-2 transition-all duration-300">
                {blog.title}
              </h3>
              <p className="text-sm xs:text-base md:text-lg lg:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                {blog.description}
              </p>

              {/* Author and Date */}
              <div className="mt-2 text-sm xs:text-base text-gray-600 dark:text-gray-400">
                <p>By {blog.author}</p>
                <p>{formatDate(blog.date)}</p>
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {blog.subCategories.split(",").map((cat, index) => (
                  <span
                    key={index}
                    className="inline-block bg-gradient-to-r from-blue-600 to-teal-500 dark:from-pink-400 dark:to-yellow-500 text-white px-2 py-1 xs:px-3 xs:py-1.5 rounded-full text-xs xs:text-sm md:text-base font-semibold shadow-md transition-transform transform hover:scale-110"
                  >
                    {cat}
                  </span>
                ))}
              </div>

              {/* Read more link */}
              <p
                id="#blog"
                className="mt-4 md:mt-6 text-blue-600 dark:text-pink-500 font-semibold underline transition-all hover:text-blue-800 dark:hover:text-pink-600 text-sm xs:text-base md:text-lg"
              >
                Read More →
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default BlogLoader;
