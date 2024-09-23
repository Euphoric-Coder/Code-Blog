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
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategories.size === 0 ||
      blog.category.some((cat) => selectedCategories.has(cat));

    return matchesSearch && matchesCategory;
  });

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
          className="border border-gray-300 rounded-lg w-full p-2 transition focus:border-blue-500 focus:outline-none"
        />
        <button
          onClick={() => setSearchTerm("")}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg transition hover:bg-blue-600"
        >
          Clear
        </button>
      </div>

      {/* Selected categories pills */}
      <div className="mb-4 flex gap-2 flex-wrap">
        {Array.from(selectedCategories).map((category) => (
          <span
            key={category}
            className="inline-flex items-center px-3 py-1 bg-blue-200 text-blue-800 rounded-full text-sm cursor-pointer"
          >
            {category}
            <IoClose
              className="ml-2 cursor-pointer hover:text-blue-900"
              onClick={() => handleCategoryRemove(category)}
            />
          </span>
        ))}

        {/* Clear Filter button */}
        {selectedCategories.size > 0 && (
          <button
            onClick={clearCategories}
            className="px-4 py-2 bg-red-500 text-white rounded-lg transition hover:bg-red-600"
          >
            Clear Filter
          </button>
        )}
      </div>

      {/* Filter buttons */}
      <div className="mb-6 flex gap-4 flex-wrap">
        {/* All button to clear category selection */}
        <button
          onClick={clearCategories}
          className={`px-4 py-2 rounded-lg transition ${
            selectedCategories.size === 0
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-black hover:bg-blue-200"
          }`}
        >
          All
        </button>

        {initialCategories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategorySelect(category)}
            className={`px-4 py-2 rounded-lg transition ${
              selectedCategories.has(category)
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-black hover:bg-blue-200"
            }`}
          >
            {category}
          </button>
        ))}

        {/* Show More button with shadcn DropdownMenu */}
        {otherCategories.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center px-4 py-2 bg-gray-300 text-black rounded-lg transition hover:bg-gray-400 shadow-sm">
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
                          ? "bg-blue-500 text-white"
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
      </div>

      {/* Show empty state if no blogs are available */}
      {filteredBlogs.length === 0 ? (
        <div className="flex flex-col items-center justify-center">
          <img
            src="/empty.png"
            alt="No blogs available"
            className="mb-4 rounded-xl shadow-lg"
          />
          <p className="text-xl font-semibold">No blogs available</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((blog, index) => (
            <div
              key={index}
              className="rounded-lg shadow-md overflow-hidden dark:border-2 transition hover:shadow-xl"
            >
              {/* Blog post image */}
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-64 object-cover transition hover:scale-105"
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
                      className="inline-flex items-center px-3 py-1 bg-blue-200 text-blue-800 rounded-full text-sm cursor-pointer"
                      onClick={() => handleCategorySelect(cat)} // Clicking pill filters by category
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
