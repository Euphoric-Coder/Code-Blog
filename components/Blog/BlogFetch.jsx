"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  ArrowRight,
  Bookmark,
  Calendar,
  CalendarIcon,
  Clock,
  Eye,
  Filter,
  Grid,
  Heart,
  List,
  Search,
  Share2,
  TrendingUp,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { blogCategories, blogSubCategoriesList } from "@/lib/data";
import { Badge } from "../ui/badge";
import { toast } from "sonner";
import { format } from "date-fns";

const tags = [
  "All",
  "React",
  "JavaScript",
  "Python",
  "TypeScript",
  "Node.js",
  "Docker",
  "AWS",
  "Machine Learning",
  "CSS",
];

const Blogs = [
  {
    id: 1,
    title: "The Future of Web Development: Static vs Dynamic Websites",
    description:
      "Explore the evolution of web development and understand when to choose static or dynamic approaches for your next project.",
    content: "Full blog content here...",
    category: "Web Development",
    subcategories: [
      "Frontend Architecture",
      "Performance Optimization",
      "SEO Best Practices",
    ],
    tags: ["React", "JavaScript", "Web Development"],
    author: "Sagnik Dey",
    date: "2024-04-17",
    readTime: "8 min read",
    blogImage:
      "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800",
    views: 12500,
    likes: 890,
    featured: true,
    trending: true,
  },
  {
    id: 2,
    title: "The Rise of AI Assistants: From Siri to ChatGPT",
    description:
      "A comprehensive look at how AI assistants have evolved and their impact on modern technology and daily life.",
    content: "Full blog content here...",
    category: "AI/ML",
    subcategories: [
      "Natural Language Processing",
      "Machine Learning",
      "Deep Learning",
      "Computer Vision",
      "Neural Networks",
    ],
    tags: ["AI", "Machine Learning", "Technology"],
    author: "Sagnik Dey",
    date: "2024-04-17",
    readTime: "12 min read",
    blogImage:
      "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800",
    views: 18900,
    likes: 1250,
    featured: true,
    trending: true,
  },
  {
    id: 3,
    title: "Mastering React Hooks: A Complete Guide",
    description:
      "Deep dive into React Hooks with practical examples and best practices for modern React development.",
    content: "Full blog content here...",
    category: "Web Development",
    subcategories: ["React Development", "Frontend Patterns"],
    tags: ["React", "JavaScript", "Frontend"],
    author: "Sarah Johnson",
    date: "2024-04-15",
    readTime: "15 min read",
    blogImage:
      "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800",
    views: 9800,
    likes: 720,
    featured: false,
    trending: true,
  },
  {
    id: 4,
    title: "Docker and Kubernetes: Container Orchestration Mastery",
    description:
      "Learn how to effectively use Docker and Kubernetes for scalable application deployment and management.",
    content: "Full blog content here...",
    category: "DevOps",
    subcategories: [
      "Container Orchestration",
      "Infrastructure",
      "Deployment Strategies",
      "Monitoring",
    ],
    tags: ["Docker", "Kubernetes", "DevOps"],
    author: "Mike Chen",
    date: "2024-04-14",
    readTime: "20 min read",
    blogImage:
      "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=800",
    views: 7600,
    likes: 540,
    featured: false,
    trending: false,
  },
  {
    id: 5,
    title: "Python for Data Science: Essential Libraries and Tools",
    description:
      "Comprehensive guide to Python libraries essential for data science including Pandas, NumPy, and Scikit-learn.",
    content: "Full blog content here...",
    category: "Data Science",
    subcategories: [
      "Data Analysis",
      "Machine Learning",
      "Data Visualization",
      "Statistical Computing",
      "Big Data",
    ],
    tags: ["Python", "Data Science", "Machine Learning"],
    author: "Dr. Emily Watson",
    date: "2024-04-12",
    readTime: "18 min read",
    blogImage:
      "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=800",
    views: 11200,
    likes: 890,
    featured: false,
    trending: true,
  },
  {
    id: 6,
    title: "Building Scalable APIs with Node.js and Express",
    description:
      "Learn best practices for creating robust, scalable APIs using Node.js and Express framework.",
    content: "Full blog content here...",
    category: "Web Development",
    subcategories: ["Backend Development", "API Design"],
    tags: ["Node.js", "Express", "API"],
    author: "Alex Rodriguez",
    date: "2024-04-10",
    readTime: "14 min read",
    blogImage:
      "https://images.pexels.com/photos/943096/pexels-photo-943096.jpeg?auto=compress&cs=tinysrgb&w=800",
    views: 8900,
    likes: 650,
    featured: false,
    trending: false,
  },
];

const BlogCard = ({ blog, isListView = false }) => {
  if (isListView) {
    return (
      <article className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 hover:-translate-y-1">
        {/* Enhanced gradient background overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/70 via-white/85 to-teal-100/70 dark:from-gray-800/95 dark:via-gray-700/90 dark:to-gray-800/95"></div>

        <div className="relative flex flex-col lg:flex-row">
          {/* Image */}
          <div className="relative lg:w-80 h-48 lg:h-auto overflow-hidden">
            <img
              src={blog.blogImage}
              alt={blog.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              {blog.featured && (
                <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-semibold rounded-full shadow-lg">
                  Featured
                </span>
              )}
              {blog.trending && (
                <span className="px-3 py-1 bg-gradient-to-r from-red-400 to-pink-500 text-white text-xs font-semibold rounded-full flex items-center shadow-lg">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Trending
                </span>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 flex flex-col justify-between relative">
            <div className="space-y-4">
              {/* Category */}
              <span className="inline-block px-3 py-1 bg-gradient-to-r from-blue-200 to-blue-300 dark:from-blue-800/60 dark:to-blue-700/60 text-blue-800 dark:text-blue-200 text-sm font-semibold rounded-full shadow-sm">
                {blog.category}
              </span>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 drop-shadow-sm">
                {blog.title}
              </h3>

              {/* Description */}
              <p className="text-gray-700 dark:text-gray-200 leading-relaxed line-clamp-3 drop-shadow-sm font-medium">
                {blog.description}
              </p>

              {/* Subcategories */}
              <div className="space-y-2">
                <div className="text-xs font-medium text-gray-600 dark:text-gray-400">
                  Subcategories:
                </div>
                {/* <SubcategoryDisplay blog={blog} /> */}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {blog.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gradient-to-r from-teal-200 to-teal-300 dark:from-teal-800/60 dark:to-teal-700/60 text-teal-800 dark:text-teal-200 text-xs rounded-md shadow-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-300/50 dark:border-gray-500/50">
              <div className="flex items-center space-x-4 text-sm text-gray-700 dark:text-gray-200">
                <div className="flex items-center space-x-1">
                  <User className="h-4 w-4" />
                  <span className="font-semibold">
                    {/* Full version for medium+ screens */}
                    <span className="hidden xl:inline">
                      {blog.author.split(" ")[0]}{" "}
                      {blog.author.split(" ")[1]?.charAt(0).toUpperCase() + "."}
                    </span>

                    {/* Short version for small screens */}
                    <span className="inline xl:hidden">
                      {blog.author.split(" ")[0]}
                    </span>
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{format(blog.date, "PPP")}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{blog.readTime}</span>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3 text-sm text-gray-700 dark:text-gray-200">
                  <div className="flex items-center space-x-1">
                    <Eye className="h-4 w-4" />
                    <span>{blog.views.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Heart className="h-4 w-4" />
                    <span>{blog.likes}</span>
                  </div>
                </div>

                <button className="group/btn inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition-colors">
                  Read More
                  <ArrowRight className="ml-1 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 hover:-translate-y-2">
      {/* Enhanced gradient background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100/70 via-white/85 to-teal-100/70 dark:from-gray-800/95 dark:via-gray-700/90 dark:to-gray-800/95"></div>

      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={blog.blogImage}
          alt={blog.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {blog.featured && (
            <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-semibold rounded-full shadow-lg">
              Featured
            </span>
          )}
          {blog.trending && (
            <span className="px-3 py-1 bg-gradient-to-r from-red-400 to-pink-500 text-white text-xs font-semibold rounded-full flex items-center shadow-lg">
              <TrendingUp className="h-3 w-3 mr-1" />
              Trending
            </span>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-2 bg-white/30 backdrop-blur-sm rounded-full text-white hover:bg-white/40 transition-colors shadow-lg">
            <Bookmark className="h-4 w-4" />
          </button>
          <button className="p-2 bg-white/30 backdrop-blur-sm rounded-full text-white hover:bg-white/40 transition-colors shadow-lg">
            <Share2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="relative p-6 space-y-4">
        {/* Category */}
        <span className="inline-block px-3 py-1 bg-gradient-to-r from-blue-200 to-blue-300 dark:from-blue-800/60 dark:to-blue-700/60 text-blue-800 dark:text-blue-200 text-sm font-semibold rounded-full shadow-sm">
          {blog.category}
        </span>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 drop-shadow-sm">
          {blog.title}
        </h3>

        {/* Description */}
        <p className="text-gray-700 dark:text-gray-200 leading-relaxed line-clamp-3 drop-shadow-sm font-medium">
          {blog.description}
        </p>

        {/* Subcategories */}
        <div className="space-y-2">
          <div className="text-xs font-medium text-gray-600 dark:text-gray-400">
            Subcategories:
          </div>
          {/* <SubcategoryDisplay blog={blog} /> */}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {blog.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-gradient-to-r from-teal-200 to-teal-300 dark:from-teal-800/60 dark:to-teal-700/60 text-teal-800 dark:text-teal-200 text-xs rounded-md shadow-sm font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-200">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <Eye className="h-4 w-4" />
              <span>{blog.views.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Heart className="h-4 w-4" />
              <span>{blog.likes}</span>
            </div>
          </div>
          <span className="font-semibold">{blog.readTime}</span>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-300/50 dark:border-gray-500/50">
          <div className="flex items-center space-x-2">
            <User className="h-4 w-4 text-gray-600 dark:text-gray-300" />
            <span className="font-semibold">
              {/* Full version for medium+ screens */}
              <span className="hidden xl:inline">
                {blog.author.split(" ")[0]}{" "}
                {blog.author.split(" ")[1]?.charAt(0).toUpperCase() + "."}
              </span>

              {/* Short version for small screens */}
              <span className="inline xl:hidden">
                {blog.author.split(" ")[0]}
              </span>
            </span>

            <span className="text-gray-400 dark:text-gray-500">•</span>
            <span className="text-sm text-gray-700 dark:text-gray-200">
              {format(blog.date, "PPP")}
            </span>
          </div>

          <button className="group/btn inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition-colors">
            Read More
            <ArrowRight className="ml-1 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </article>
  );
};

const BlogFetch = ({ blogs }) => {
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
  const [viewMode, setViewMode] = useState("grid");
  const [tempFilters, setTempFilters] = useState({
    authors: [],
    categories: [],
    subCategories: [],
    dateRange: { from: "", to: "" },
    oldestBlog: false,
  });
  const selectedCategoryCount = tempFilters.categories
    ? tempFilters.categories.length
    : 0;
  const selectedSubCategoryCount = tempFilters.subCategories
    ? tempFilters.subCategories.length
    : 0;
  const selectedAuthorCount = tempFilters.authors
    ? tempFilters.authors.length
    : 0;
  const blogAuthors = [...new Set(blogs.map((blog) => blog.author))];
  const [appliedFilters, setAppliedFilters] = useState({ ...tempFilters });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const isSearchActive = searchTerm !== ""; // Check if there is text in the search bar

  const filterCount = useMemo(() => {
    let count = 0;
    count += tempFilters.authors.length;
    count += tempFilters.categories.length;
    count += tempFilters.subCategories.length;
    if (tempFilters.dateRange.from) count += 1;
    if (tempFilters.dateRange.to) count += 1;
    if (tempFilters.oldestBlog) count += 1;
    return count;
  }, [tempFilters]);

  const filteredBlogs = useMemo(() => {
    let filters = blogs.filter((bg) => {
      const filtersToApply = appliedFilters;

      const matchesSearch =
        bg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bg.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bg.subCategories?.toString().includes(searchTerm.toLowerCase()) ||
        bg.categories.includes(searchTerm.toLowerCase()) ||
        bg.author.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        filtersToApply.categories.length === 0 ||
        filtersToApply.categories.includes(bg.categories.toLowerCase());

      const blogSubCategories = bg.subCategories
        ? bg.subCategories.map((sub) => sub.trim()) // Convert to array and trim spaces
        : [];

      const matchesSubCategory =
        tempFilters.subCategories.length === 0 ||
        blogSubCategories.some((sub) =>
          tempFilters.subCategories.includes(sub)
        );

      const matchesDateRange =
        (!filtersToApply.dateRange.from ||
          bg.date.split(" ")[0] >= filtersToApply.dateRange.from) &&
        (!filtersToApply.dateRange.to ||
          bg.date.split(" ")[0] <= filtersToApply.dateRange.to);

      const matchesAuthor =
        filtersToApply.authors.length === 0 || // Check if no authors are selected
        filtersToApply.authors.includes(bg.author.toLowerCase());

      return (
        matchesSearch &&
        matchesCategory &&
        matchesSubCategory &&
        matchesDateRange &&
        matchesAuthor
      );
    });

    // Conditionally sort by oldest
    // If oldestBlog is true, reverse the filtered list
    if (appliedFilters.oldestBlog) {
      filters = [...filters].reverse(); // clone before reverse to avoid mutating original array
    }
    return filters;
  }, [searchTerm, appliedFilters, blogs]);

  const previewedBlogs = useMemo(() => {
    let filtered = blogs.filter((bg) => {
      const matchesCategory =
        tempFilters.categories.length === 0 ||
        tempFilters.categories.includes(bg.categories.toLowerCase());

      const blogSubCategories = bg.subCategories
        ? bg.subCategories.map((sub) => sub.trim())
        : [];

      const matchesSubCategory =
        tempFilters.subCategories.length === 0 ||
        blogSubCategories.some((sub) =>
          tempFilters.subCategories.includes(sub)
        );

      const matchesAuthor =
        tempFilters.authors.length === 0 || // Check if no authors are selected
        tempFilters.authors.includes(bg.author.toLowerCase());

      const matchesDateRange =
        (!tempFilters.dateRange.from ||
          bg.createdAt.split(" ")[0] >= tempFilters.dateRange.from) &&
        (!tempFilters.dateRange.to ||
          bg.createdAt.split(" ")[0] <= tempFilters.dateRange.to);

      return (
        matchesCategory &&
        matchesSubCategory &&
        matchesDateRange &&
        matchesAuthor
      );
    });

    // Conditionally sort by oldest
    // If oldestBlog is true, reverse the filtered list
    if (tempFilters.oldestBlog) {
      filtered = [...filtered].reverse(); // clone before reverse to avoid mutating original array
    }

    return filtered;
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
      authors: [],
      categories: [],
      subCategories: [],
      dateRange: { from: "", to: "" },
      oldestBlog: false,
    });
    setTempFilters({
      authors: [],
      categories: [],
      subCategories: [],
      dateRange: { from: "", to: "" },
      oldestBlog: false,
    });

    toast.success("Filters have been successfully reset to default!");
  };

  const handleDialogClose = (isOpen) => {
    if (!isOpen) {
      setTempFilters({ ...appliedFilters }); // Reset temp filters to applied filters when dialog is closed
    }
    setIsDialogOpen(isOpen); // Track dialog state
  };

  const displayedBlogs = isDialogOpen ? previewedBlogs : filteredBlogs;

  const hasActiveFilters =
    appliedFilters.authors.length > 0 ||
    appliedFilters.categories.length > 0 ||
    (appliedFilters.dateRange.from &&
      appliedFilters.dateRange.from.trim() !== "") ||
    (appliedFilters.dateRange.to &&
      appliedFilters.dateRange.to.trim() !== "") ||
    appliedFilters.oldestBlog;

  return (
    <div>
      {/* Search Bar & Filter Button */}
      <div className="flex justify-center mb-6 gap-4 items-center pt-3 px-6">
        <div className="relative max-w-3xl w-full">
          <Input
            type="text"
            placeholder="Search transactions by name, description, or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-6 py-5 rounded-full shadow-lg border transition-all duration-300 bg-white dark:bg-gray-900 dark:text-white text-gray-800 border-gray-300 dark:border-gray-600 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500 dark:focus:ring-purple-600"
          />

          {/* Clear Button Inside Search Bar */}
          {isSearchActive && (
            <Button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white px-3 py-1 rounded-full shadow-md text-sm xs:text-base transition-transform duration-300 bg-gradient-to-r from-blue-500 to-teal-500 dark:from-pink-400 dark:to-yellow-400 hover:scale-110 active:scale-95"
            >
              Clear
            </Button>
          )}
        </div>
        <div className="flex gap-3">
          <Dialog onOpenChange={handleDialogClose}>
            <DialogTrigger asChild>
              <Button
                className={`flex items-center gap-2 px-4 py-2 rounded-3xl transition-colors ${
                  filterCount > 0
                    ? "bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 text-white hover:from-purple-600 hover:via-purple-700 hover:to-purple-800 dark:from-violet-700 dark:via-violet-800 dark:to-violet-900 dark:text-white dark:hover:from-violet-800 dark:hover:via-violet-900 dark:hover:to-violet-950"
                    : "bg-gradient-to-r from-purple-100 via-purple-200 to-purple-300 text-purple-700 hover:from-purple-200 hover:via-purple-300 hover:to-purple-400 dark:from-violet-900 dark:via-violet-950 dark:to-purple-900 dark:text-violet-300 dark:hover:from-violet-800 dark:hover:via-violet-900 dark:hover:to-purple-950"
                }`}
              >
                <Filter size={20} />
                {filterCount > 0 ? `Filters (${filterCount})` : "Filter"}
              </Button>
            </DialogTrigger>
            <DialogContent className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-white via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-8 rounded-3xl shadow-[0_0_40px_rgba(0,200,255,0.3)] w-[95%] max-w-2xl max-h-[80vh] md:max-h-[90vh] overflow-y-auto">
              {/* Background Effects */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-10 -left-10 w-60 h-60 bg-gradient-radial from-purple-400 via-blue-400 to-transparent dark:from-indigo-800 dark:via-blue-800 dark:to-gray-800 opacity-25 blur-3xl animate-spin-slow"></div>
                <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-radial from-teal-300 via-blue-300 to-transparent dark:from-blue-900 dark:via-teal-800 dark:to-gray-800 opacity-30 blur-[120px]"></div>
              </div>
              {/* Filter Heading */}
              <DialogHeader>
                <DialogTitle className="flex gap-2 items-center text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-500 to-pink-500 dark:from-blue-400 dark:via-indigo-400 dark:to-teal-400">
                  Budget Filter
                </DialogTitle>
                <DialogDescription asChild>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Select filters to apply to your transactions.
                  </p>
                </DialogDescription>
              </DialogHeader>
              {/* Filter Options */}
              <div className="space-y-6">
                {/* Sort Blogs By */}
                <div
                  className="relative max-h-[300px] p-3 shadow-sm rounded-xl border-2 
             bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900
             border-purple-400 dark:border-blue-800 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <label className="budg-text1">Sort Blogs By</label>
                      <Badge className="border-0 bg-gradient-to-r from-amber-400 to-yellow-500 text-white px-2 py-1 rounded-full text-xs dark:from-yellow-500 dark:to-yellow-600">
                        {tempFilters.oldestBlog
                          ? "Oldest First"
                          : "Newest First"}
                      </Badge>
                    </div>

                    {tempFilters.oldestBlog && (
                      <Button
                        variant="outline"
                        onClick={() =>
                          setTempFilters((prev) => ({
                            ...prev,
                            oldestBlog: false,
                          }))
                        }
                        className="del2"
                        size="sm"
                      >
                        Reset Sort
                      </Button>
                    )}
                  </div>

                  <div className="mt-2 flex flex-wrap gap-3">
                    <Badge
                      onClick={() =>
                        setTempFilters((prev) => ({
                          ...prev,
                          oldestBlog: true,
                        }))
                      }
                      className={`px-3 py-1 rounded-full text-sm font-bold cursor-pointer transition-all ${
                        tempFilters.oldestBlog
                          ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white dark:from-blue-600 dark:to-purple-700"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                      }`}
                    >
                      Oldest
                    </Badge>
                    <Badge
                      onClick={() =>
                        setTempFilters((prev) => ({
                          ...prev,
                          oldestBlog: false,
                        }))
                      }
                      className={`px-3 py-1 rounded-full text-sm font-bold cursor-pointer transition-all ${
                        !tempFilters.oldestBlog
                          ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white dark:from-blue-600 dark:to-purple-700"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                      }`}
                    >
                      Newest
                    </Badge>
                  </div>
                </div>
                {/* Date Range */}
                <div>
                  <label className="blog-text1">Blog Creation Date Range</label>
                  <div className="mt-2">
                    <Popover modal>
                      <PopoverTrigger asChild>
                        <Button
                          id="date"
                          variant="outline"
                          className={cn(
                            "blog-select-field justify-start",
                            !tempFilters.dateRange.from &&
                              "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon />
                          {tempFilters.dateRange.from ? (
                            tempFilters.dateRange.to ? (
                              <>
                                {format(
                                  new Date(tempFilters.dateRange.from),
                                  "LLL dd, y"
                                )}{" "}
                                -{" "}
                                {format(
                                  new Date(tempFilters.dateRange.to),
                                  "LLL dd, y"
                                )}
                              </>
                            ) : (
                              format(
                                new Date(tempFilters.dateRange.from),
                                "LLL dd, y"
                              )
                            )
                          ) : (
                            <span>Pick a Date Range</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          initialFocus
                          mode="range"
                          defaultMonth={
                            tempFilters.dateRange.from
                              ? new Date(tempFilters.dateRange.from)
                              : new Date()
                          }
                          selected={{
                            from: tempFilters.dateRange.from
                              ? new Date(tempFilters.dateRange.from)
                              : undefined,
                            to: tempFilters.dateRange.to
                              ? new Date(tempFilters.dateRange.to)
                              : undefined,
                          }}
                          onSelect={(e) =>
                            setTempFilters((prev) => ({
                              ...prev,
                              dateRange: {
                                from: e?.from
                                  ? format(e.from, "yyyy-MM-dd")
                                  : "",
                                to: e?.to ? format(e.to, "yyyy-MM-dd") : "",
                              },
                            }))
                          }
                          numberOfMonths={2}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                {/* Categories */}
                <div
                  className="relative max-h-[300px] overflow-y-auto 
                    p-3 shadow-sm rounded-xl border-2 
                    bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900
                    border-cyan-400 dark:border-blue-800 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <label className="budg-text1">
                        Categories ({blogCategories.length})
                      </label>
                      {/* Show Selected Count Badge */}
                      {selectedCategoryCount > 0 && (
                        <Badge className="border-0 bg-gradient-to-r from-green-400 to-green-600 text-white px-2 py-1 rounded-full text-xs dark:from-green-500 dark:to-green-700 ">
                          Selected: {selectedCategoryCount}
                        </Badge>
                      )}
                    </div>
                    <div>
                      {/* Clear Button */}
                      {selectedCategoryCount > 0 && (
                        <Button
                          variant="outline"
                          onClick={() =>
                            setTempFilters({
                              ...tempFilters,
                              categories: [],
                            })
                          }
                          className="del2"
                          size="sm"
                        >
                          Clear Selection
                        </Button>
                      )}
                    </div>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-3">
                    {blogCategories.map((category) => (
                      <Badge
                        key={category}
                        onClick={() => {
                          setTempFilters((prev) => ({
                            ...prev,
                            categories: prev.categories.includes(
                              category.toLowerCase()
                            )
                              ? prev.categories.filter(
                                  (c) => c !== category.toLowerCase()
                                )
                              : [...prev.categories, category.toLowerCase()],
                          }));
                        }}
                        className={`border-0 rounded-full text-sm cursor-pointer px-3 py-1 transition-all font-bold ${
                          tempFilters.categories.includes(
                            category.toLowerCase()
                          )
                            ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                        }`}
                      >
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Sub-Categories (Only Show When Categories Are Selected) */}
                {tempFilters.categories.length > 0 && (
                  <div
                    className="relative max-h-[200px] overflow-y-auto 
                    p-3 shadow-sm rounded-xl border-2 
                    bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900
                    border-cyan-400 dark:border-blue-800 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <label className="blog-text1">
                          Sub-Categories (
                          {
                            new Set(
                              tempFilters.categories.flatMap(
                                (category) =>
                                  blogSubCategoriesList[category] || []
                              )
                            ).size
                          }
                          )
                        </label>
                        {/* Show Selected Count Badge */}
                        {selectedSubCategoryCount > 0 && (
                          <Badge className="border-0 bg-gradient-to-r from-green-400 to-green-600 text-white px-2 py-1 rounded-full text-xs dark:from-green-500 dark:to-green-700 ">
                            Selected: {selectedSubCategoryCount}
                          </Badge>
                        )}
                      </div>
                      <div>
                        {/* Clear Button */}
                        {selectedSubCategoryCount > 0 && (
                          <Button
                            variant="outline"
                            onClick={() =>
                              setTempFilters({
                                ...tempFilters,
                                subCategories: [],
                              })
                            }
                            className="text-sm rounded-full text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-500 dark:border-gray-300"
                            size="sm"
                          >
                            Clear Selection
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Subcategories List */}
                    <div className="mt-3 flex flex-wrap gap-3">
                      {[
                        ...new Set(
                          tempFilters.categories.flatMap(
                            (category) => blogSubCategoriesList[category] || []
                          )
                        ),
                      ] // Convert Set back to an array to prevent duplicates
                        .map((subCategory) => (
                          <Badge
                            key={subCategory}
                            onClick={() => {
                              setTempFilters((prev) => ({
                                ...prev,
                                subCategories: prev.subCategories.includes(
                                  subCategory.toLowerCase()
                                )
                                  ? prev.subCategories.filter(
                                      (c) => c !== subCategory.toLowerCase()
                                    )
                                  : [
                                      ...prev.subCategories,
                                      subCategory.toLowerCase(),
                                    ],
                              }));
                            }}
                            className={`border-0 rounded-full text-sm font-bold cursor-pointer px-3 py-1 transition-all ${
                              tempFilters.subCategories.includes(
                                subCategory.toLowerCase()
                              )
                                ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                            }`}
                          >
                            {subCategory}
                          </Badge>
                        ))}
                    </div>
                  </div>
                )}

                {/* Authors */}
                <div
                  className="relative max-h-[300px] overflow-y-auto 
                    p-3 shadow-sm rounded-xl border-2 
                    bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900
                    border-cyan-400 dark:border-blue-800 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <label className="budg-text1">
                        Authors ({blogAuthors.length})
                      </label>
                      {/* Show Selected Count Badge */}
                      {selectedAuthorCount > 0 && (
                        <Badge className="border-0 bg-gradient-to-r from-green-400 to-green-600 text-white px-2 py-1 rounded-full text-xs dark:from-green-500 dark:to-green-700 ">
                          Selected: {selectedAuthorCount}
                        </Badge>
                      )}
                    </div>
                    <div>
                      {/* Clear Button */}
                      {selectedAuthorCount > 0 && (
                        <Button
                          variant="outline"
                          onClick={() =>
                            setTempFilters({
                              ...tempFilters,
                              authors: [],
                            })
                          }
                          className="del2"
                          size="sm"
                        >
                          Clear Selection
                        </Button>
                      )}
                    </div>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-3">
                    {blogAuthors.map((author) => (
                      <Badge
                        key={author}
                        onClick={() => {
                          setTempFilters((prev) => ({
                            ...prev,
                            authors: prev.authors.includes(author.toLowerCase())
                              ? prev.authors.filter(
                                  (c) => c !== author.toLowerCase()
                                )
                              : [...prev.categories, author.toLowerCase()],
                          }));
                        }}
                        className={`border-0 rounded-full text-sm cursor-pointer px-3 py-1 transition-all font-bold ${
                          tempFilters.authors.includes(author.toLowerCase())
                            ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                        }`}
                      >
                        {author}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-end space-x-4">
                  <Button
                    variant="outline"
                    onClick={clearFilters}
                    className="del2"
                  >
                    Clear Filters
                  </Button>
                  {hasActiveFilters && (
                    <Button onClick={resetFilters} className="del3">
                      Reset Filters
                    </Button>
                  )}
                  <DialogClose asChild>
                    <Button onClick={applyFilters} className="budg-btn4">
                      Apply Filters
                    </Button>
                  </DialogClose>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          {hasActiveFilters && (
            <button onClick={resetFilters} className="del3">
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Blog Cards */}
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
                <h3 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-teal-500 to-emerald-400 dark:from-pink-400 dark:via-orange-300 dark:to-yellow-400 transition-all duration-300 leading-tight">
                  {blog.title.slice(0, 40) +
                    (blog.title.length > 40 ? "..." : "")}
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
                      {format(blog.date, "PPP")}
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
                  {blog.description
                    ? blog.description?.slice(0, 100) +
                      (blog.description?.length > 100 ? "..." : "")
                    : "No description available."}
                </p>

                {/* Subcategories */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {blog.subCategories.map((cat, index) => (
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
      <div className="flex items-center space-x-2">
        <button
          onClick={() => setViewMode("grid")}
          className={`p-2 rounded-lg transition-colors ${
            viewMode === "grid"
              ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
              : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          }`}
        >
          <Grid className="h-5 w-5" />
        </button>
        <button
          onClick={() => setViewMode("list")}
          className={`p-2 rounded-lg transition-colors ${
            viewMode === "list"
              ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
              : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          }`}
        >
          <List className="h-5 w-5" />
        </button>
      </div>
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {Blogs.length > 0 ? (
          <div
            className={`${
              viewMode === "grid"
                ? "grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                : "space-y-8"
            }`}
          >
            {Blogs.map((blog) => (
              <BlogCard
                key={blog.id}
                blog={blog}
                isListView={viewMode === "list"}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No blogs found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search criteria or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogFetch;
