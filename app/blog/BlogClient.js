"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { IoClose } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";

// Hardcoded initial categories and popular tags
const initialCategories = [
  "Web Technology",
  "JavaScript",
  "React",
  "Node.js",
  "Python",
  "CSS",
  "Data Science",
  "Machine Learning",
];

const popularTags = [
  "JavaScript",
  "React",
  "Machine Learning",
  "Blockchain",
  "DevOps",
  "Cybersecurity",
  "Cloud Computing",
];

// Function to format date consistently using Intl.DateTimeFormat with error handling
const formatDate = (dateString) => {
  const date = new Date(dateString);
  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return "Invalid Date"; // Handle invalid dates
  }
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
};

export default function BlogClient({ blogs }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const { theme } = useTheme(); // Theme detection for dark/light mode

  // Handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategories((prev) => {
      const updatedCategories = new Set(prev);
      if (updatedCategories.has(category)) {
        updatedCategories.delete(category); // Deselect category
      } else {
        updatedCategories.add(category); // Select category
      }
      return updatedCategories;
    });
  };

  // Clear all selected categories
  const clearCategories = () => {
    setSelectedCategories(new Set());
  };

  // Filter blogs based on search term and selected categories
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      (blog.title &&
        blog.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (blog.description &&
        blog.description.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory =
      selectedCategories.size === 0 ||
      (Array.isArray(blog.category) &&
        blog.category.some((cat) => selectedCategories.has(cat)));

    return matchesSearch && matchesCategory;
  });

  // Handle pagination
  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBlogs = filteredBlogs.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Pagination buttons
  const getPaginationItems = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`px-4 py-2 mx-1 rounded-lg transition-transform ${
            currentPage === i
              ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md"
              : theme === "dark"
              ? "bg-gray-700 text-white"
              : "bg-gray-300 text-gray-900"
          }`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  // Extract unique categories from the blogs
  const otherCategories = [
    ...new Set(
      blogs
        .flatMap((blog) => blog.category)
        .filter((category) => !initialCategories.includes(category))
    ),
  ];

  // Find related posts (based on the first category of each post)
  const getRelatedPosts = (currentPost) => {
    return blogs.filter(
      (blog) =>
        Array.isArray(blog.category) &&
        blog.category.length > 0 &&
        Array.isArray(currentPost.category) &&
        currentPost.category.length > 0 &&
        blog.category[0] === currentPost.category[0] &&
        blog.slug !== currentPost.slug
    );
  };

  // Theme-based gradients and background
  const containerGradient =
    theme === "dark"
      ? "bg-gradient-to-b from-gray-900 via-gray-800 to-blue-950 text-gray-100"
      : "bg-gradient-to-b from-blue-50 via-white to-blue-100 text-gray-900";

  const buttonGradient =
    theme === "dark"
      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
      : "bg-gradient-to-r from-blue-400 to-teal-500 text-white";

  return (
    <main
      className={`relative w-full min-h-screen ${containerGradient} transition-all duration-700`}
    >
      {/* Gradient Heading */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center py-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 dark:from-purple-400 dark:via-pink-500 dark:to-yellow-400">
        Blog
      </h1>

      {/* Popular Tags Section */}
      <section className="mb-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Popular Tags</h2>
        <div className="flex justify-center gap-3 flex-wrap">
          {popularTags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleCategorySelect(tag)}
              className={`px-4 py-2 rounded-full transition shadow-md ${
                selectedCategories.has(tag)
                  ? "bg-purple-600 text-white"
                  : "bg-gray-300 text-gray-900 hover:bg-purple-100"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </section>

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search blogs by title, description, or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`w-full max-w-lg px-6 py-3 rounded-full shadow-lg border transition-all duration-300 ${
            theme === "dark"
              ? "bg-gray-800 text-white border-gray-600"
              : "bg-white border-gray-300"
          }`}
        />
        <button
          onClick={() => setSearchTerm("")}
          className="ml-4 px-5 py-3 rounded-full bg-red-500 text-white transition hover:bg-red-600 shadow-md"
        >
          Clear
        </button>
      </div>

      {/* Category Filter Section */}
      <div className="mb-4 flex justify-center gap-4">
        <button
          onClick={clearCategories}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg shadow-md transition hover:bg-purple-700"
        >
          All
        </button>
        {initialCategories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategorySelect(category)}
            className={`px-4 py-2 rounded-full transition shadow-md ${
              selectedCategories.has(category)
                ? "bg-purple-600 text-white"
                : "bg-gray-300 text-gray-900 hover:bg-purple-100"
            }`}
          >
            {category}
          </button>
        ))}

        {/* More Categories Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center px-4 py-2 bg-gray-300 text-black rounded-lg transition hover:bg-gray-400 shadow-md">
            More Categories
            <FaChevronDown className="ml-2" />
          </DropdownMenuTrigger>
          <DropdownMenuPortal>
            <DropdownMenuContent className="w-56 max-h-64 overflow-y-auto shadow-lg border border-gray-200 rounded-md bg-white dark:bg-gray-800 dark:border-gray-700">
              <DropdownMenuLabel className="text-gray-700 dark:text-gray-300 font-semibold">
                Other Categories
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                {otherCategories.map((category) => (
                  <DropdownMenuItem
                    key={category}
                    onClick={() => handleCategorySelect(category)}
                    className={`block w-full text-left px-4 py-2 transition ${
                      selectedCategories.has(category)
                        ? "bg-purple-600 text-white"
                        : "hover:bg-purple-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    {category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenuPortal>
        </DropdownMenu>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 py-8">
        {paginatedBlogs.map((blog, index) => (
          <div
            key={index}
            className={`rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 ${
              theme === "dark"
                ? "bg-gradient-to-br from-purple-800 to-blue-800 text-white"
                : "bg-gradient-to-br from-blue-100 to-teal-100 text-gray-900"
            }`}
          >
            <Image
              src={blog.image}
              alt={blog.title}
              className="w-full h-48 object-cover"
              height={200}
              width={300}
            />
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">{blog.title}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                By {blog.author} on {formatDate(blog.date)}
              </p>
              <p className="mb-4">{blog.description}</p>

              {/* Category Pills */}
              <div className="flex flex-wrap gap-2 mb-4">
                {blog.category.map((cat, i) => (
                  <span
                    key={i}
                    className={`inline-block bg-gradient-to-r from-blue-500 to-teal-500 dark:from-pink-400 dark:to-yellow-400 text-white px-2 py-1 rounded-full text-xs xs:text-sm shadow-md transition-transform transform hover:scale-110`}
                  >
                    {cat}
                  </span>
                ))}
              </div>

              {/* Read More Link */}
              <Link href={`/blogpost/${blog.slug}`}>
                <span
                  className={`text-lg font-bold underline ${buttonGradient}`}
                >
                  Read More →
                </span>
              </Link>

              {/* Related Posts */}
              <div className="mt-6">
                <h3 className="text-xl font-bold mb-2">Related Posts</h3>
                {getRelatedPosts(blog)
                  .slice(0, 2)
                  .map((related) => (
                    <Link href={`/blogpost/${related.slug}`} key={related.slug}>
                      <p className="text-blue-600 dark:text-teal-400 hover:underline">
                        {related.title}
                      </p>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6">
        <button
          className={`px-4 py-2 mx-2 rounded-lg transition-transform ${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-purple-600 text-white"
          }`}
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        {getPaginationItems()}
        <button
          className={`px-4 py-2 mx-2 rounded-lg transition-transform ${
            currentPage === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-purple-600 text-white"
          }`}
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>
    </main>
  );
}
