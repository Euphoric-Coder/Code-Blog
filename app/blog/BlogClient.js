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
import { FaChevronDown, FaHeart, FaShareAlt } from "react-icons/fa"; // Icons for dropdown, like, share
import { IoClose } from "react-icons/io5"; // Close icon for pills
import { BsMoon, BsSun } from "react-icons/bs"; // Icons for dark mode

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
  const [selectedCategories, setSelectedCategories] = useState(new Set()); // Allow multiple categories
  const [currentPage, setCurrentPage] = useState(1);
  const [darkMode, setDarkMode] = useState(false); // For dark mode
  const blogsPerPage = 6; // Limit the number of blogs shown per page

  // Pagination logic
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  // Extract unique categories from blogs
  const allCategories = Array.from(
    new Set(blogs.flatMap((blog) => blog.category || []))
  );

  // Filter out the initial 8 categories from all categories to get the other categories
  const otherCategories = allCategories.filter(
    (category) => !initialCategories.includes(category)
  );

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

  // Pagination next and previous buttons
  const nextPage = () => {
    setCurrentPage((prev) =>
      prev < Math.ceil(blogs.length / blogsPerPage) ? prev + 1 : prev
    );
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  // Filter featured blogs where blog.feature is true
  const featuredBlogs = blogs.filter((blog) => blog.feature);

  // Filter recent posts based on the latest dates (sort by date)
  const recentPosts = [...blogs]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 4); // Get the 4 most recent posts

  // Filter blogs based on search term and selected categories
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.description?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategories.size === 0 ||
      blog.category?.some((cat) => selectedCategories.has(cat));

    return matchesSearch && matchesCategory;
  });

  const paginatedFilteredBlogs = filteredBlogs.slice(
    indexOfFirstBlog,
    indexOfLastBlog
  ); // Apply pagination after filtering

  return (
    <div
      className={`container mx-auto p-6 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      {/* Toggle Dark Mode */}
      <div className="flex justify-end mb-4">
        <button
          onClick={toggleDarkMode}
          className="flex items-center px-4 py-2 bg-violet-600 text-white rounded-lg shadow-md transition hover:bg-violet-700"
        >
          {darkMode ? <BsSun className="mr-2" /> : <BsMoon className="mr-2" />}
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      {/* Main heading for the blog section */}
      <h1 className="text-4xl font-bold mb-8 text-center text-violet-800">
        Blog
      </h1>

      {/* Main section with featured blogs and recent posts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Featured Blogs Section */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold text-violet-700 mb-4">
            Featured Blogs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredBlogs.length > 0 ? (
              featuredBlogs.slice(0, 2).map((blog) => (
                <div
                  key={blog.slug}
                  className="p-4 bg-white rounded-lg shadow-lg"
                >
                  <img
                    src={blog.image || "/default-image.png"} // Fallback to a default image if blog.image is undefined
                    alt={blog.title || "Blog image"}
                    className="h-48 w-full object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-xl font-bold mb-2">{blog.title || ""}</h3>
                  {blog.description && (
                    <p className="text-gray-600 mb-4">
                      {blog.description.slice(0, 120)}...
                    </p>
                  )}
                  <Link
                    href={`/blogpost/${blog.slug}`}
                    className="text-violet-600 hover:text-violet-800"
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

        {/* Recent Posts Sidebar */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-violet-700 mb-4">
            Recent Posts
          </h2>
          <ul className="space-y-4">
            {recentPosts.map((post) => (
              <li key={post.slug} className="flex items-center space-x-4">
                <img
                  src={post.image || "/default-image.png"} // Fallback to a default image if blog.image is undefined
                  alt={post.title || "Blog image"}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <Link
                    href={`/blogpost/${post.slug}`}
                    className="text-violet-600 hover:text-violet-800"
                  >
                    {post.title || ""}
                  </Link>
                  <p className="text-gray-500 text-sm">
                    Published on {new Date(post.date).toLocaleDateString()}
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
          placeholder="Search by title or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-lg w-full p-3 shadow-md focus:border-violet-600 focus:outline-none"
        />
        <button
          onClick={() => setSearchTerm("")}
          className="px-4 py-2 bg-violet-600 text-white rounded-lg transition hover:bg-violet-700 shadow-md"
        >
          Clear
        </button>
      </div>

      {/* Selected categories pills */}
      <div className="mb-4 flex gap-2 flex-wrap">
        {Array.from(selectedCategories).map((category) => (
          <span
            key={category}
            className="inline-flex items-center px-3 py-1 bg-violet-200 text-violet-800 rounded-full text-sm cursor-pointer shadow-md"
          >
            {category}
            <IoClose
              className="ml-2 cursor-pointer hover:text-violet-900"
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
              ? "bg-violet-600 text-white shadow-md"
              : "bg-gray-300 text-black hover:bg-violet-100 shadow-md"
          }`}
        >
          All
        </button>

        {initialCategories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategorySelect(category)}
            className={`px-4 py-2 rounded-lg transition bg-gray-300 text-black hover:bg-violet-100 shadow-md ${
              selectedCategories.has(category) && "bg-violet-500 text-white"
            }`}
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
                          ? "bg-violet-600 text-white"
                          : "hover:bg-violet-100"
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

      {/* Paginated blog posts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {paginatedFilteredBlogs.map((blog) => (
          <div
            key={blog.slug}
            className="rounded-lg shadow-md overflow-hidden dark:border-2 transition hover:shadow-lg hover:scale-105 transform"
          >
            {/* Blog post image */}
            <img
              src={blog.image || "/default-image.png"} // Fallback to a default image if blog.image is undefined
              alt={blog.title || "Blog image"}
              className="w-full h-64 object-cover transition hover:scale-110"
            />

            {/* Blog post content */}
            <div className="p-4">
              {/* Blog post title */}
              {blog.title && (
                <h2 className="text-2xl font-bold mb-2 text-violet-800">
                  {blog.title}
                </h2>
              )}

              {/* Blog post description */}
              {blog.description && (
                <p className="mb-4 text-gray-700">
                  {blog.description.slice(0, 100)}...
                </p>
              )}

              {/* Blog post category pills */}
              <div className="flex flex-wrap gap-2 mb-4">
                {blog.category?.map((cat, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center px-3 py-1 bg-violet-200 text-violet-800 rounded-full text-sm cursor-pointer shadow-md"
                    onClick={() => handleCategorySelect(cat)} // Clicking pill filters by category
                  >
                    {cat}
                  </span>
                ))}
              </div>

              {/* Blog post author and date */}
              <div className="text-sm mb-4 text-gray-600">
                <span>By {blog.author || "Unknown"}</span> |{" "}
                <span>
                  {blog.date
                    ? new Date(blog.date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })
                    : "Unknown date"}
                </span>
              </div>

              {/* Like and Share Buttons */}
              <div className="flex gap-4 mb-4">
                <button className="flex items-center text-violet-600 hover:text-violet-800">
                  <FaHeart className="mr-2" /> Like
                </button>
                <button className="flex items-center text-violet-600 hover:text-violet-800">
                  <FaShareAlt className="mr-2" /> Share
                </button>
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

      {/* Pagination controls */}
      <div className="flex justify-center mt-8 gap-4">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-violet-600 text-white rounded-lg shadow-md disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          onClick={nextPage}
          disabled={
            currentPage === Math.ceil(filteredBlogs.length / blogsPerPage)
          }
          className="px-4 py-2 bg-violet-600 text-white rounded-lg shadow-md disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
}
