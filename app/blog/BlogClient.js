"use client"; // Mark this component as a Client Component

import React, { useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
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
import { FaChevronDown } from "react-icons/fa"; // Icons for dropdown
import { IoClose } from "react-icons/io5"; // Close icon for pills

// Hardcoded initial 8 categories
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

// Client-side blog component that includes search, filter, and display
export default function BlogClient({ blogs }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState(new Set()); // Allow multiple categories
  const [currentPage, setCurrentPage] = useState(1); // Track current page for pagination
  const itemsPerPage = 6; // Define how many items you want to display per page

  // Function to handle selecting a category
  const handleCategorySelect = (category) => {
    setSelectedCategories((prevCategories) => {
      const updatedCategories = new Set(prevCategories);
      if (updatedCategories.has(category)) {
        updatedCategories.delete(category); // Deselect category if already selected
      } else {
        updatedCategories.add(category); // Add category if not selected
      }
      return updatedCategories;
    });
  };

  // Function to handle removing a category
  const handleCategoryRemove = (category) => {
    setSelectedCategories((prevCategories) => {
      const updatedCategories = new Set(prevCategories);
      updatedCategories.delete(category); // Remove the category
      return updatedCategories;
    });
  };

  // Function to clear all categories (All button)
  const clearCategories = () => {
    setSelectedCategories(new Set()); // Clear all selected categories
  };

  // Extract unique categories for the dropdown
  const otherCategories = [
    ...new Set(
      blogs
        .flatMap((blog) => blog.category)
        .filter((category) => !initialCategories.includes(category))
    ),
  ];

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

  // Handle pagination: calculate total pages and slice the filtered blogs array
  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedBlogs = filteredBlogs.slice(startIndex, endIndex);

  // Function to handle changing pages
  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Generate pagination items
  const getPaginationItems = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <button
            key={i}
            onClick={() => goToPage(i)}
            className={`px-4 py-2 mx-1 rounded-lg ${
              currentPage === i
                ? "bg-blue-600 text-white"
                : "bg-gray-300 hover:bg-blue-100"
            }`}
          >
            {i}
          </button>
        );
      }
    } else {
      pages.push(
        <button
          key={1}
          onClick={() => goToPage(1)}
          className={`px-4 py-2 mx-1 rounded-lg ${
            currentPage === 1
              ? "bg-blue-600 text-white"
              : "bg-gray-300 hover:bg-blue-100"
          }`}
        >
          1
        </button>
      );

      if (currentPage > 3) {
        pages.push(
          <span key="ellipsis1" className="px-2">
            ...
          </span>
        );
      }

      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        pages.push(
          <button
            key={i}
            onClick={() => goToPage(i)}
            className={`px-4 py-2 mx-1 rounded-lg ${
              currentPage === i
                ? "bg-blue-600 text-white"
                : "bg-gray-300 hover:bg-blue-100"
            }`}
          >
            {i}
          </button>
        );
      }

      if (currentPage < totalPages - 2) {
        pages.push(
          <span key="ellipsis2" className="px-2">
            ...
          </span>
        );
      }

      pages.push(
        <button
          key={totalPages}
          onClick={() => goToPage(totalPages)}
          className={`px-4 py-2 mx-1 rounded-lg ${
            currentPage === totalPages
              ? "bg-blue-600 text-white"
              : "bg-gray-300 hover:bg-blue-100"
          }`}
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  // Filter featured blogs where blog.feature is true
  const featuredBlogs = blogs.filter((blog) => blog.feature);

  // Filter recent posts where date and image exist
  const recentPosts = blogs
    .filter((post) => post.date && post.image) // Only include posts with date and image
    .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by date
    .slice(0, 4); // Get the 4 most recent posts

  return (
    <div className="container mx-auto p-6">
      {/* Main heading for the blog section */}
      <h1 className="text-6xl font-bold mb-4 text-center text-blue-800">
        Blog
      </h1>

      {/* Main section with featured blogs and recent posts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Featured Blogs Section */}
        <div className="lg:col-span-2">
          <h2 className="text-3xl font-semibold text-blue-700 mb-4">
            Featured Blogs
          </h2>
          {/* Featured Blogs Container with better UI and always visible scrollbar */}
          <div className="relative bg-white p-6 rounded-lg shadow-lg border border-gray-300 overflow-x-auto scrollbar-thin scrollbar-thumb-blue-600 scrollbar-track-gray-300 scrollbar-visible">
            <div className="flex space-x-4">
              {featuredBlogs.length > 0 ? (
                featuredBlogs.map((blog) => (
                  <div
                    key={blog.slug}
                    className="flex-shrink-0 w-80 p-6 bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 text-blue-900 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
                  >
                    <img
                      src={blog.image || "/default-image.png"} // Fallback to a default image if blog.image is undefined
                      alt={blog.title || "Blog image"}
                      className="h-48 w-full object-cover rounded-lg mb-4"
                    />
                    {blog.title && (
                      <h3 className="text-2xl font-semibold mb-2 text-blue-600 hover:text-violet-600">
                        {blog.title}
                      </h3>
                    )}
                    {blog.description && (
                      <p className="text-gray-800 mb-4">
                        {blog.description.slice(0, 120)}...
                      </p>
                    )}
                    <Link
                      href={`/blogpost/${blog.slug}`}
                      className="text-blue-600 hover:text-violet-600 font-semibold"
                    >
                      Read More →
                    </Link>
                  </div>
                ))
              ) : (
                <p>No featured blogs available.</p>
              )}
            </div>
          </div>
        </div>

        {/* Recent Posts Sidebar */}
        <div className="bg-gradient-to-b from-white to-blue-50 p-6 rounded-lg shadow-lg border border-gray-200">
          <h2 className="text-3xl font-semibold text-blue-700 mb-4">
            Recent Posts
          </h2>
          <ul className="space-y-4">
            {recentPosts.map((post) => (
              <li key={post.slug} className="flex items-center space-x-4">
                <img
                  src={post.image} // Only display posts with an image
                  alt={post.title || "Blog image"}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  {post.title && (
                    <Link
                      href={`/blogpost/${post.slug}`}
                      className="text-blue-600 hover:text-violet-600 font-semibold"
                    >
                      {post.title}
                    </Link>
                  )}
                  <p className="text-gray-500 text-sm">
                    {post.date
                      ? `Published on ${new Date(post.date).toLocaleDateString(
                          "en-GB",
                          {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          }
                        )}`
                      : ""}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Search bar */}
      <div className="flex items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by title, description, or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border-2 border-gray-300 rounded-full w-full p-3 px-5 shadow-md focus:border-blue-600 focus:outline-none"
        />
        <button
          onClick={() => setSearchTerm("")}
          className="px-5 py-2 bg-blue-600 text-white rounded-full transition hover:bg-violet-700 shadow-md active:bg-violet-900"
        >
          Clear
        </button>
      </div>

      {/* Selected categories pills */}
      <div className="mb-4 flex gap-2 flex-wrap">
        {Array.from(selectedCategories).map((category) => (
          <span
            key={category}
            className="inline-flex items-center px-3 py-1 bg-blue-200 text-blue-800 rounded-full text-sm cursor-pointer shadow-md hover:bg-violet-200 hover:text-violet-800"
          >
            {category}
            <IoClose
              className="ml-2 cursor-pointer hover:text-red-600"
              onClick={() => handleCategoryRemove(category)}
            />
          </span>
        ))}
      </div>

      {/* Filter buttons and Clear Filter */}
      <div className="mb-6 flex gap-4 flex-wrap items-center">
        {/* All button to clear category selection */}
        <button
          onClick={clearCategories}
          className={`px-4 py-2 rounded-lg transition ${
            selectedCategories.size === 0
              ? "bg-blue-600 text-white shadow-md"
              : "bg-gray-300 text-black hover:bg-blue-100 shadow-md"
          }`}
        >
          All
        </button>

        {initialCategories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategorySelect(category)}
            className={`px-4 py-2 rounded-full transition bg-gray-300 text-black hover:bg-blue-100 shadow-md`}
          >
            {category}
          </button>
        ))}

        {/* Show More button with shadcn DropdownMenu */}
        {otherCategories.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center px-4 py-2 bg-gray-300 text-black rounded-lg transition hover:bg-gray-400 shadow-md">
              More Categories
              <FaChevronDown className="ml-2" />
            </DropdownMenuTrigger>
            <DropdownMenuPortal>
              <DropdownMenuContent className="w-56 shadow-lg border border-gray-200 rounded-md bg-white">
                <DropdownMenuLabel className="text-gray-700 font-semibold">
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
                          ? "bg-blue-600 text-white"
                          : "hover:bg-blue-100"
                      }`}
                    >
                      {category}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenuPortal>
          </DropdownMenu>
        )}

        {/* Clear Filter button */}
        {selectedCategories.size > 0 && (
          <button
            onClick={clearCategories}
            className="px-4 py-2 bg-red-500 text-white rounded-lg transition hover:bg-red-600 shadow-md"
          >
            Clear Filter
          </button>
        )}
      </div>

      {/* Show empty state if no blogs are available */}
      {paginatedBlogs.length === 0 ? (
        <div className="flex flex-col items-center justify-center">
          <img
            src="/empty.png"
            alt="No blogs available"
            className="mb-4 rounded-xl shadow-lg"
          />
          <p className="text-xl font-semibold text-blue-700">
            No blogs available
          </p>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedBlogs.map((blog, index) => (
              <div
                key={index}
                className="rounded-lg shadow-md overflow-hidden dark:border-2 transition hover:shadow-lg hover:scale-105 transform bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 text-blue-900"
              >
                {/* Blog post image */}
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-64 object-cover transition hover:scale-110 rounded-t-lg"
                />

                {/* Blog post content */}
                <div className="p-4">
                  {/* Blog post title */}
                  <h2 className="text-2xl font-bold mb-2 text-blue-600 hover:text-violet-600">
                    {blog.title}
                  </h2>

                  {/* Blog post description */}
                  <p className="mb-4 text-gray-800">{blog.description}</p>

                  {/* Blog post category pills (for array of categories) */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {blog.category.map((cat, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center px-3 py-1 bg-blue-200 text-blue-800 rounded-full text-sm cursor-pointer shadow-md hover:bg-violet-200 hover:text-violet-800"
                        onClick={() => handleCategorySelect(cat)} // Clicking pill filters by category
                      >
                        {cat}
                      </span>
                    ))}
                  </div>

                  {/* Blog post author and date */}
                  <div className="text-sm mb-4 text-gray-600">
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
                    Read More →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-6">
            <button
              className={`px-4 py-2 mx-2 rounded-lg ${
                currentPage === 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              &lt;
            </button>
            {getPaginationItems()}
            <button
              className={`px-4 py-2 mx-2 rounded-lg ${
                currentPage === totalPages
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              &gt;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
