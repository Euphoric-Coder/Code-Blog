"use client"; // Mark this component as a Client Component

import React, { useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

// Hardcoded initial 8 categories
const initialCategories = [
  "Web Development",
  "JavaScript",
  "React",
  "Node.js",
  "Python",
  "CSS",
  "Data Science",
  "Machine Learning",
];

// Client-side blog component that includes search, filter, and display
export default function BlogClient({ blogs }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showMoreCategories, setShowMoreCategories] = useState(false);

  // Filter blogs based on search term and selected category
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.category.some((cat) =>
        cat.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesCategory =
      selectedCategory === "" || blog.category.includes(selectedCategory);

    return matchesSearch && matchesCategory;
  });

  // Extract unique categories for filter buttons
  const otherCategories = [
    ...new Set(
      blogs
        .flatMap((blog) => blog.category)
        .filter((category) => !initialCategories.includes(category))
    ),
  ];

  // Function to toggle "Show More" state
  const toggleShowMoreCategories = () => {
    setShowMoreCategories((prevState) => !prevState);
  };

  return (
    <div className="container mx-auto p-4">
      {/* Main heading for the blog section */}
      <h1 className="text-4xl font-bold mb-8 text-center">Blog</h1>

      {/* Search bar */}
      <div className="flex items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by title, description, or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-lg w-full p-2"
        />
        <button
          onClick={() => setSearchTerm("")}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg"
        >
          Clear
        </button>
      </div>

      {/* Filter buttons */}
      <div className="mb-6 flex gap-4 flex-wrap">
        <button
          onClick={() => setSelectedCategory("")}
          className={`px-4 py-2 rounded-lg ${
            selectedCategory === ""
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-black"
          }`}
        >
          All
        </button>

        {/* Render only hardcoded initial categories */}
        {initialCategories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg ${
              selectedCategory === category
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-black"
            }`}
          >
            {category}
          </button>
        ))}

        {/* Show More button */}
        {otherCategories.length > 0 && (
          <>
            {!showMoreCategories && (
              <button
                onClick={toggleShowMoreCategories}
                className="px-4 py-2 bg-gray-300 text-black rounded-lg"
              >
                Show More
              </button>
            )}

            {showMoreCategories && (
              <div className="relative">
                <button
                  onClick={toggleShowMoreCategories}
                  className="px-4 py-2 bg-gray-300 text-black rounded-lg"
                >
                  Show Less
                </button>
                {/* Dropdown container */}
                <div className="absolute z-10 bg-white border border-gray-300 mt-2 rounded-lg shadow-lg p-4">
                  {otherCategories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        setShowMoreCategories(false); // Close dropdown on selection
                      }}
                      className={`block w-full text-left px-4 py-2 rounded-lg ${
                        selectedCategory === category
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 text-black"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Show empty state if no blogs are available */}
      {filteredBlogs.length === 0 ? (
        <div className="flex flex-col items-center justify-center">
          <img
            src="/empty.png"
            alt="No blogs available"
            className="mb-4 rounded-xl"
          />
          <p className="text-xl font-semibold">No blogs available</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((blog, index) => (
            <div
              key={index}
              className="rounded-lg shadow-md overflow-hidden dark:border-2"
            >
              {/* Blog post image */}
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-64 object-cover"
              />

              {/* Blog post content */}
              <div className="p-4">
                {/* Blog post title */}
                <h2 className="text-2xl font-bold mb-2">{blog.title}</h2>

                {/* Blog post description */}
                <p className="mb-4">{blog.description}</p>

                {/* Blog post category pills (for array of categories) */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {blog.category.map((cat, i) => (
                    <span
                      key={i}
                      className="inline-block px-3 py-1 bg-blue-200 text-blue-800 rounded-full text-sm"
                    >
                      {cat}
                    </span>
                  ))}
                </div>

                {/* Blog post author and date */}
                <div className="text-sm mb-4">
                  <span>By {blog.author}</span> |{" "}
                  <span>
                    {new Date(blog.date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>

                {/* Link to the full blog post */}
                <Link
                  href={`/blogpost/${blog.slug}`}
                  className={buttonVariants({ variant: "outline" })}
                >
                  Click here
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
