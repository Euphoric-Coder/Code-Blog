"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaFilter } from "react-icons/fa"; // Using react-icons for the filter icon
import { useTheme } from "next-themes";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

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
  const [tempSelectedCategories, setTempSelectedCategories] = useState(
    new Set()
  ); // Temporary selection
  const [appliedCategories, setAppliedCategories] = useState(new Set()); // Applied filters
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState(""); // Sorting state (empty by default)
  const [filtersApplied, setFiltersApplied] = useState(false); // To track if filters are applied

  const itemsPerPage = 6;

  const { theme } = useTheme(); // Theme detection for dark/light mode
  const isSearchActive = searchTerm !== ""; // Check if there is text in the search bar

  // Handle category selection
  const handleCategorySelect = (category) => {
    setTempSelectedCategories((prev) => {
      const updatedCategories = new Set(prev);
      if (updatedCategories.has(category)) {
        updatedCategories.delete(category); // Deselect category
      } else {
        updatedCategories.add(category); // Select category
      }
      return updatedCategories;
    });
  };

  // Clear all selected categories and search term
  const clearAllFilters = () => {
    setTempSelectedCategories(new Set());
    setAppliedCategories(new Set());
    setSearchTerm("");
    setSortOption("");
    setFiltersApplied(false);
  };

  // Apply filters only when Apply Filters button is clicked
  const applyFilters = () => {
    setAppliedCategories(new Set(tempSelectedCategories)); // Only apply the selected categories
    setFiltersApplied(true); // Track that filters have been applied
  };

  // Close the dialog without applying filters
  const handleDialogClose = () => {
    setTempSelectedCategories(new Set()); // Clear temporary selected categories when dialog is closed
  };

  // Handle sorting of blogs
  const sortBlogs = (blogs) => {
    const sortedBlogs = [...blogs];
    switch (sortOption) {
      case "name-asc":
        return sortedBlogs.sort((a, b) => a.title.localeCompare(b.title));
      case "name-desc":
        return sortedBlogs.sort((a, b) => b.title.localeCompare(a.title));
      case "date-newest":
        return sortedBlogs.sort((a, b) => new Date(b.date) - new Date(a.date));
      case "date-oldest":
        return sortedBlogs.sort((a, b) => new Date(a.date) - new Date(b.date));
      case "author-asc":
        return sortedBlogs.sort((a, b) => a.author.localeCompare(b.author));
      case "author-desc":
        return sortedBlogs.sort((a, b) => b.author.localeCompare(a.author));
      default:
        return blogs;
    }
  };

  // Filter blogs based on search term and applied categories
  const filteredBlogs = sortBlogs(
    blogs.filter((blog) => {
      const matchesSearch =
        (blog.title &&
          blog.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (blog.description &&
          blog.description.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory =
        appliedCategories.size === 0 ||
        (Array.isArray(blog.category) &&
          blog.category.some((cat) => appliedCategories.has(cat)));

      return matchesSearch && matchesCategory;
    })
  );

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

  // Extract unique categories from the blogs, ensuring no empty categories
  const otherCategories = [
    ...new Set(
      blogs
        .flatMap((blog) => blog.category)
        .filter((category) => category && !initialCategories.includes(category))
    ),
  ];

  // Calculate the filter counter (number of applied filters)
  const filterCounter = appliedCategories.size + (sortOption ? 1 : 0); // Count applied categories and sorting option

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

      {/* Search and Filter Section */}
      <div className="flex justify-center mb-6 gap-4 items-center">
        {/* Search Bar */}
        <div className="relative max-w-lg w-full">
          <input
            type="text"
            placeholder="Search blogs by title, description, or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-6 py-4 rounded-full shadow-lg border transition-all duration-300 bg-white dark:bg-gray-900 dark:text-white text-gray-800 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-4 focus:ring-blue-500 dark:focus:ring-purple-600"
          />

          {/* Clear Button Inside Search Bar */}
          {isSearchActive && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white px-3 py-1 rounded-full shadow-md text-sm xs:text-base transition-transform duration-300
                bg-gradient-to-r from-blue-500 to-teal-500 dark:from-pink-400 dark:to-yellow-400 hover:scale-110 active:scale-95"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filter Button with Icon and Badge */}
        <Dialog onOpenChange={handleDialogClose}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full shadow-md hover:bg-purple-700 relative">
              <FaFilter />
              Filter
              {filtersApplied && (
                <span className="absolute top-0 right-0 mt-1 mr-1 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center text-xs">
                  {filterCounter}
                </span>
              )}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] sm:max-h-[400px] overflow-y-auto rounded-xl shadow-lg">
            <DialogHeader>
              <DialogTitle>Filter Blogs</DialogTitle>
              <DialogDescription>
                Customize the filters for your blog search.
              </DialogDescription>
            </DialogHeader>

            {/* Filter Options */}
            <div className="grid gap-4 py-4">
              {/* Sort by Name */}
              <div className="grid grid-cols-1 gap-4">
                <h3 className="font-bold">Sort By Name</h3>
                <div className="flex gap-2">
                  <Button
                    variant={sortOption === "name-asc" ? "default" : "outline"}
                    onClick={() => setSortOption("name-asc")}
                    className="rounded-full px-4 py-1 bg-gradient-to-r from-blue-600 to-teal-500 dark:from-pink-400 dark:to-yellow-400 text-white hover:bg-blue-700"
                  >
                    Name (Asc)
                  </Button>
                  <Button
                    variant={sortOption === "name-desc" ? "default" : "outline"}
                    onClick={() => setSortOption("name-desc")}
                    className="rounded-full px-4 py-1 bg-gradient-to-r from-blue-600 to-teal-500 dark:from-pink-400 dark:to-yellow-400 text-white hover:bg-blue-700"
                  >
                    Name (Desc)
                  </Button>
                </div>
              </div>

              {/* Sort by Date */}
              <div className="grid grid-cols-1 gap-4">
                <h3 className="font-bold">Sort By Date</h3>
                <div className="flex gap-2">
                  <Button
                    variant={
                      sortOption === "date-newest" ? "default" : "outline"
                    }
                    onClick={() => setSortOption("date-newest")}
                    className="rounded-full px-4 py-1 bg-gradient-to-r from-blue-600 to-teal-500 dark:from-pink-400 dark:to-yellow-400 text-white hover:bg-blue-700"
                  >
                    Newest
                  </Button>
                  <Button
                    variant={
                      sortOption === "date-oldest" ? "default" : "outline"
                    }
                    onClick={() => setSortOption("date-oldest")}
                    className="rounded-full px-4 py-1 bg-gradient-to-r from-blue-600 to-teal-500 dark:from-pink-400 dark:to-yellow-400 text-white hover:bg-blue-700"
                  >
                    Oldest
                  </Button>
                </div>
              </div>

              {/* Sort by Author */}
              <div className="grid grid-cols-1 gap-4">
                <h3 className="font-bold">Sort By Author</h3>
                <div className="flex gap-2">
                  <Button
                    variant={
                      sortOption === "author-asc" ? "default" : "outline"
                    }
                    onClick={() => setSortOption("author-asc")}
                    className="rounded-full px-4 py-1 bg-gradient-to-r from-blue-600 to-teal-500 dark:from-pink-400 dark:to-yellow-400 text-white hover:bg-blue-700"
                  >
                    Author (Asc)
                  </Button>
                  <Button
                    variant={
                      sortOption === "author-desc" ? "default" : "outline"
                    }
                    onClick={() => setSortOption("author-desc")}
                    className="rounded-full px-4 py-1 bg-gradient-to-r from-blue-600 to-teal-500 dark:from-pink-400 dark:to-yellow-400 text-white hover:bg-blue-700"
                  >
                    Author (Desc)
                  </Button>
                </div>
              </div>

              {/* Category Filter */}
              <div className="grid grid-cols-1 gap-4">
                <h3 className="font-bold">Filter By Categories</h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {initialCategories.map((category) => (
                    <Button
                      key={category}
                      variant={
                        tempSelectedCategories.has(category)
                          ? "default"
                          : "outline"
                      }
                      onClick={() => handleCategorySelect(category)}
                      className={`rounded-full px-4 py-1 ${
                        tempSelectedCategories.has(category)
                          ? "bg-gradient-to-r from-blue-600 to-teal-500 dark:from-pink-400 dark:to-yellow-400 text-white"
                          : "bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white"
                      } hover:scale-105 hover:bg-blue-700`}
                    >
                      {category}
                    </Button>
                  ))}

                  {/* Other Categories */}
                  {otherCategories.length > 0 && (
                    <div className="flex flex-wrap gap-2 justify-center">
                      {otherCategories.map((category) => (
                        <Button
                          key={category}
                          variant={
                            tempSelectedCategories.has(category)
                              ? "default"
                              : "outline"
                          }
                          onClick={() => handleCategorySelect(category)}
                          className={`rounded-full px-4 py-1 ${
                            tempSelectedCategories.has(category)
                              ? "bg-gradient-to-r from-blue-600 to-teal-500 dark:from-pink-400 dark:to-yellow-400 text-white"
                              : "bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white"
                          } hover:scale-105 hover:bg-blue-700`}
                        >
                          {category}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Buttons for clearing/applying filters */}
            <div className="flex justify-end gap-4 pt-4 pb-2">
              <Button
                onClick={clearAllFilters}
                className="rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white hover:scale-105"
              >
                Clear Filters
              </Button>
              <Button
                variant="default"
                onClick={applyFilters}
                className="rounded-full bg-gradient-to-r from-blue-600 to-teal-500 dark:from-pink-400 dark:to-yellow-400 text-white hover:scale-105"
              >
                Apply Filters
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

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

                {/* Author and Date */}
                <div className="mt-2 text-sm xs:text-base text-gray-600 dark:text-gray-400">
                  <p>By {blog.author}</p>
                  <p>{formatDate(blog.date)}</p>
                </div>

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
