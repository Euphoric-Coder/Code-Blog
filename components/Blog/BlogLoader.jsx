"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useMemo, useState } from "react";

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

  const [searchTerm, setSearchTerm] = useState("");
  const [tempFilters, setTempFilters] = useState({
    categories: [],
    subCategories: [],
    dateRange: { from: "", to: "" },
  });
  const selectedCategoryCount = tempFilters.categories
    ? tempFilters.categories.length
    : 0;
  const selectedSubCategoryCount = tempFilters.subCategories
    ? tempFilters.subCategories.length
    : 0;
  const [appliedFilters, setAppliedFilters] = useState({ ...tempFilters });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const isSearchActive = searchTerm !== ""; // Check if there is text in the search bar

  const filterCount = useMemo(() => {
    let count = 0;
    count += tempFilters.categories.length;
    count += tempFilters.subCategories.length;
    if (tempFilters.dateRange.from) count += 1;
    if (tempFilters.dateRange.to) count += 1;
    return count;
  }, [tempFilters]);

  const filteredTransactions = useMemo(() => {
    return blogs.filter((bg) => {
      const filtersToApply = appliedFilters;

      const matchesSearch =
        bg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bg.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bg.subCategories.toString().includes(searchTerm.toLowerCase()) ||
        bg.categories.includes(searchTerm.toLowerCase()) ||
        bg.author.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        filtersToApply.categories.length === 0 ||
        filtersToApply.categories.includes(bg.categories.toLowerCase());

      const matchesDateRange =
        (!filtersToApply.dateRange.from ||
          bg.createdAt.split(" ")[0] >= filtersToApply.dateRange.from) &&
        (!filtersToApply.dateRange.to ||
          bg.createdAt.split(" ")[0] <= filtersToApply.dateRange.to);

      return matchesSearch && matchesCategory && matchesDateRange;
    });
  }, [searchTerm, appliedFilters, blogs]);

  const previewedTransactions = useMemo(() => {
    return blogs.filter((bg) => {
      const matchesCategory =
        tempFilters.categories.length === 0 ||
        tempFilters.categories.includes(bg.categories.toLowerCase());

      const transactionSubCategories = bg.subCategory
        ? bg.subCategory.split(",").map((sub) => sub.trim()) // Convert to array and trim spaces
        : [];

      const matchesSubCategory =
        tempFilters.subCategories.length === 0 ||
        transactionSubCategories.some((sub) =>
          tempFilters.subCategories.includes(sub)
        );

      const matchesDateRange =
        (!tempFilters.dateRange.from ||
          bg.createdAt.split(" ")[0] >= tempFilters.dateRange.from) &&
        (!tempFilters.dateRange.to ||
          bg.createdAt.split(" ")[0] <= tempFilters.dateRange.to);

      return matchesCategory && matchesSubCategory && matchesDateRange;
    });
  }, [tempFilters, blogs]);

  const applyFilters = () => {
    setAppliedFilters({ ...tempFilters });
    setIsDialogOpen(false); // Close the dialog
  };

  const clearFilters = () => {
    setTempFilters(appliedFilters);
  };

  const resetFilters = () => {
    setAppliedFilters({
      categories: [],
      subCategories: [],
      dateRange: { from: "", to: "" },
    });
    setTempFilters({
      categories: [],
      subCategories: [],
      dateRange: { from: "", to: "" },
    });

    toast.success("Filters have been successfully reset to default!");
  };

  const handleDialogClose = (isOpen) => {
    if (!isOpen) {
      setTempFilters({ ...appliedFilters }); // Reset temp filters to applied filters when dialog is closed
    }
    setIsDialogOpen(isOpen); // Track dialog state
  };

  const displayedBlogs = isDialogOpen
    ? previewedTransactions
    : filteredTransactions;

  const hasActiveFilters =
    appliedFilters.categories.length > 0 ||
    (appliedFilters.dateRange.from &&
      appliedFilters.dateRange.from.trim() !== "") ||
    (appliedFilters.dateRange.to && appliedFilters.dateRange.to.trim() !== "");

  return (
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 px-4 py-10">
      {displayedBlogs.map((blog, index) => (
        <Link href={`/blogpost/${blog.id}`} key={index}>
          <div className="relative max-w-sm mx-auto lg:max-w-md rounded-3xl shadow-xl hover:shadow-2xl transform transition-all duration-500 hover:scale-[1.03] bg-gradient-to-br from-blue-400 via-white to-blue-200 dark:from-gray-800 dark:via-gray-900 dark:to-black text-gray-900 dark:text-gray-100 cursor-pointer overflow-hidden">
            {/* Image Section */}
            <div className="relative w-full h-56 sm:h-64 md:h-72 lg:h-64 xl:h-72 overflow-hidden rounded-t-3xl">
              <Image
                src={blog.blogImage || "/placeholder.png"}
                alt={blog.title}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105 rounded-t-3xl"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>

            {/* Blog Content */}
            <div className="p-5 md:p-6 lg:p-7 space-y-4">
              {/* Title */}
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-teal-500 to-emerald-400 dark:from-pink-400 dark:via-orange-300 dark:to-yellow-400 transition-all duration-300 leading-tight">
                {blog.title}
              </h3>

              {/* Author, Date, and Category */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300 mt-2">
                {/* Left: Author + Date */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                  <span className="flex items-center gap-1.5">
                    <svg
                      className="w-4 h-4 text-blue-600 dark:text-pink-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 12c2.7 0 5.5 1.3 5.5 3.8V18H6.5v-2.2C6.5 13.3 9.3 12 12 12zm0-2a3 3 0 100-6 3 3 0 000 6z" />
                    </svg>
                    {blog.author}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <svg
                      className="w-4 h-4 text-blue-600 dark:text-pink-400"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {formatDate(blog.date)}
                  </span>
                </div>

                {/* Right: Category */}
                <div className="mt-1 md:mt-0 max-w-full md:max-w-xs px-2">
                  <span className="inline-block px-3 py-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full text-xs font-medium shadow-sm truncate whitespace-nowrap">
                    {blog.categories}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed line-clamp-3">
                {blog.description}
              </p>

              {/* Subcategories */}
              <div className="flex flex-wrap gap-2 pt-2">
                {blog.subCategories.split(",").map((cat, index) => (
                  <span
                    key={index}
                    className="inline-block px-3 py-1 bg-gradient-to-r from-sky-600 to-teal-500 dark:from-pink-500 dark:to-yellow-400 text-white rounded-full text-xs md:text-sm font-semibold shadow-sm hover:scale-105 transition-transform duration-300"
                  >
                    {cat.trim()}
                  </span>
                ))}
              </div>

              {/* Read More Link */}
              <p className="mt-4 text-blue-700 dark:text-pink-500 font-semibold underline underline-offset-2 hover:text-blue-900 dark:hover:text-pink-300 text-sm md:text-base">
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
