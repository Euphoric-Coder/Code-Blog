"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { IoClose } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa";
import { useTheme } from "next-themes";
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

  // Handle removing a selected category
  const handleCategoryRemove = (category) => {
    setSelectedCategories((prev) => {
      const updatedCategories = new Set(prev);
      updatedCategories.delete(category); // Remove category
      return updatedCategories;
    });
  };

  // Clear all selected categories and search term
  const clearAllFilters = () => {
    setSelectedCategories(new Set());
    setSearchTerm("");
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

  const buttonGradient =
    theme === "dark"
      ? "bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 hover:from-purple-700 hover:via-pink-600 hover:to-red-600"
      : "bg-gradient-to-r from-blue-400 via-teal-400 to-green-400 hover:from-blue-500 hover:via-teal-500 hover:to-green-500";

  return (
    <main className="relative w-full min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-blue-950 text-gray-900 dark:text-gray-100 transition-all duration-700">
      {/* Hero Section Heading */}
      <section className="py-10">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 dark:from-purple-400 dark:via-pink-500 dark:to-yellow-400 mb-6">
            Blog
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-700 dark:text-gray-300 leading-relaxed">
            Stay updated on the latest trends in Full Stack Development, Machine
            Learning, Tech Innovations, and more!
          </p>
        </div>
      </section>

      {/* Search Section */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search blogs by title, description, or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-lg px-6 py-3 rounded-full shadow-lg border transition-all duration-300 bg-white dark:bg-gray-900 dark:text-white text-gray-800 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-4 focus:ring-blue-500 dark:focus:ring-purple-600"
        />
        <button
          onClick={() => setSearchTerm("")}
          className="ml-4 px-5 py-3 rounded-full bg-red-500 text-white hover:bg-red-600 transition shadow-md"
        >
          Clear
        </button>
      </div>

      {/* Selected Categories as Pills */}
      <div className="mb-4 flex gap-2 justify-center flex-wrap">
        {Array.from(selectedCategories).map((category) => (
          <span
            key={category}
            className="inline-flex items-center px-3 py-1 rounded-full text-sm cursor-pointer bg-blue-200 text-blue-800 shadow-md hover:bg-blue-300 transition-all"
          >
            {category}
            <IoClose
              className="ml-2 cursor-pointer hover:text-red-600"
              onClick={() => handleCategoryRemove(category)}
            />
          </span>
        ))}
      </div>

      {/* Clear All Filters Button */}
      {(selectedCategories.size > 0 || searchTerm) && (
        <div className="flex justify-center mb-4">
          <button
            onClick={clearAllFilters}
            className="px-6 py-3 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition"
          >
            Clear All Filters
          </button>
        </div>
      )}

      {/* Blog Posts Grid */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 px-4 py-8">
        {paginatedBlogs.map((blog, index) => (
          <Link href={`/blogpost/${blog.slug}`} key={index}>
            <div className="relative overflow-hidden max-w-sm mx-auto lg:max-w-md rounded-3xl shadow-2xl transform transition-all duration-500 hover:scale-105 bg-gradient-to-br from-blue-400 via-white to-blue-200 dark:from-gray-800 dark:via-gray-900 dark:to-black text-gray-900 dark:text-gray-100 cursor-pointer">
              {/* Image section */}
              <div className="relative overflow-hidden rounded-t-3xl">
                <Image
                  src={blog.image || "/placeholder.png"}
                  alt={blog.title}
                  layout="responsive"
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

                {/* Category Pills */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {blog.category.map((cat, index) => (
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
