"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
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
  MoreHorizontal,
  Search,
  Share2,
  Tag,
  TrendingUp,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { blogCategories, blogSubCategoriesList } from "@/lib/data";
import { Badge } from "../ui/badge";
import { toast } from "sonner";
import { format } from "date-fns";
import BlogShare from "../Miscellaneous/BlogShare";
import { useUser } from "@clerk/nextjs";
import BlogLike from "../Miscellaneous/BlogLikeButton";
import BlogBookmark from "../Miscellaneous/BlogBookmarkButton";
import FilterButton from "./FilterButton";

const BlogFetch = ({ blogs, refreshData }) => {
  const Blogs = [
    {
      id: 1,
      title: "The Future of Web Development: Static vs Dynamic Websites",
      description:
        "Explore the evolution of web development and understand when to choose static or dynamic approaches for your next project.",
      content: "Full blog content here...",
      category: "Web Development",
      subCategories: [
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
      subCategories: [
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
      subCategories: ["React Development", "Frontend Patterns"],
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
      subCategories: [
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
      subCategories: [
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
      subCategories: ["Backend Development", "API Design"],
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

  // Subcategory display component
  const SubcategoryDisplay = ({ blog }) => {
    const maxVisible = 2;
    const visibleSubcategories = Array.isArray(blog.subCategories)
      ? blog.subCategories.slice(0, maxVisible)
      : [];
    const remainingCount = Array.isArray(blog.subCategories)
      ? blog.subCategories.length - maxVisible
      : 0;

    return (
      <div className="flex flex-wrap gap-2 items-center">
        {visibleSubcategories.map((subcategory) => (
          <span
            key={subcategory}
            className="inline-block px-3 py-1 bg-gradient-to-r from-sky-600 to-teal-500 dark:from-pink-500 dark:to-yellow-400 text-white rounded-full text-xs md:text-sm font-semibold shadow-sm hover:scale-105 transition-transform duration-300"
          >
            {subcategory}
          </span>
        ))}

        {remainingCount > 0 && (
          <HoverCard>
            <HoverCardTrigger>
              <button className="flex items-center px-2 py-1 bg-gradient-to-r from-blue-200 to-blue-300 dark:from-blue-800/60 dark:to-blue-700/60 text-blue-800 dark:text-blue-200 text-xs rounded-md shadow-sm font-medium hover:from-blue-300 hover:to-blue-400 dark:hover:from-blue-700/60 dark:hover:to-blue-600/60 transition-all duration-200">
                <MoreHorizontal className="h-3 w-3 mr-1" />+{remainingCount}{" "}
                more
              </button>
            </HoverCardTrigger>

            <HoverCardContent side="top">
              <div className="">
                <div className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  All Subcategories ({blog.subCategories.length})
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {blog.subCategories.map((subcategory) => (
                    <span
                      key={subcategory}
                      className="px-2 py-1 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700/60 dark:to-gray-600/60 text-gray-700 dark:text-gray-200 text-xs rounded-md font-medium"
                    >
                      {subcategory}
                    </span>
                  ))}
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        )}
      </div>
    );
  };

  const fetchIndividualBlog = (id) => {
    return blogs.find((blog) => blog.id === id);
  };

  const BlogCard = ({ blog, isListView = false }) => {
    if (isListView) {
      return (
        <article className="group relative overflow-hidden rounded-3xl shadow-lg hover:shadow-xl border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 hover:-translate-y-1">
          {/* Enhanced gradient background overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-400 via-blue-50 to-blue-200 dark:from-gray-800 dark:via-gray-900 dark:to-black text-gray-900 dark:text-gray-100"></div>

          <div className="relative flex flex-col lg:flex-row">
            {/* Image */}
            <div className="relative lg:w-80 h-48 lg:h-auto overflow-hidden">
              <img
                src={blog.blogImage || "/placeholder.png"}
                alt={blog.title}
                className="w-full h-full object-fill group-hover:scale-105 transition-transform duration-500"
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
                <div className="flex items-center justify-between">
                  <span className="inline-block px-3 py-1 bg-gradient-to-br from-purple-200 via-purple-100 to-purple-300 dark:from-purple-800/60 dark:via-purple-800 dark:to-purple-700/60 text-purple-800 dark:text-purple-200 text-sm font-semibold rounded-full shadow-sm">
                    {blog.category}
                  </span>
                  <div className="flex items-center space-x-2">
                    <BlogLike
                      blogId={blog.id}
                      initialLikes={likesMap[blog.id] ?? blog.likes ?? 0}
                      onChange={handleLikeChange}
                      showIconOnly={true}
                      listView={true}
                    />
                    <BlogBookmark
                      blogId={blog.id}
                      onChange={handleBookmarkChange}
                      showIconOnly={true}
                      listView={true}
                    />
                    <button
                      className="p-2 bg-white hover:bg-white/80 dark:bg-white/30 dark:hover:bg-white/40 backdrop-blur-sm rounded-full transition-colors shadow-lg"
                      onClick={() => {
                        setIndividualBlog(fetchIndividualBlog(blog.id));
                        setIsShareOpen(true);
                      }}
                    >
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

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
                  <SubcategoryDisplay blog={blog} />
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {blog.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex gap-1 items-center px-3 py-1 bg-gradient-to-br from-cyan-400 via-sky-300 to-sky-400 dark:from-cyan-700 dark:to-sky-600 text-white text-sm font-semibold rounded-full shadow-md"
                    >
                      <Tag className="h-4 w-4" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-400/60 dark:border-gray-500/50">
                <div className="flex items-center space-x-4 text-sm text-gray-700 dark:text-gray-200">
                  <div className="flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <span className="font-semibold">
                      {/* Full version for medium+ screens */}
                      <span className="hidden xl:inline">
                        {blog.author.split(" ")[0]}{" "}
                        {blog.author.split(" ")[1]
                          ? blog.author.split(" ")[1]?.charAt(0).toUpperCase() +
                            "."
                          : ""}
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
                      <span>{blog.views ?? "0"}</span>
                    </div>
                    <BlogLike
                      blogId={blog.id}
                      initialLikes={likesMap[blog.id] ?? blog.likes ?? 0}
                      onChange={handleLikeChange}
                    />
                    <BlogBookmark
                      blogId={blog.id}
                      onChange={handleBookmarkChange}
                    />
                  </div>

                  <Link href={`/blogpost/${blog.id}`}>
                    <button className="group/btn inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition-colors">
                      Read More
                      <ArrowRight className="ml-1 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </article>
      );
    }

    return (
      <article className="group mb-6 relative overflow-hidden rounded-3xl shadow-lg hover:shadow-xl border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 hover:-translate-y-2">
        {/* Enhanced gradient background overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-white to-blue-200 dark:from-gray-800 dark:via-gray-900 dark:to-black text-gray-900 dark:text-gray-100"></div>

        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={blog.blogImage || "/placeholder.png"}
            alt={blog.title}
            className="w-full h-full object-fill group-hover:scale-110 transition-transform duration-500"
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
            <BlogBookmark
              blogId={blog.id}
              onChange={handleBookmarkChange}
              showIconOnly={true}
            />
            <BlogLike
              blogId={blog.id}
              initialLikes={likesMap[blog.id] ?? blog.likes ?? 0}
              onChange={handleLikeChange}
              showIconOnly={true}
            />

            <button
              className="p-2 bg-white/30 backdrop-blur-sm rounded-full text-white hover:bg-white/40 transition-colors shadow-lg"
              onClick={() => {
                setIndividualBlog(fetchIndividualBlog(blog.id));
                setIsShareOpen(true);
              }}
            >
              <Share2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="relative p-6 space-y-4">
          {/* Category */}
          <span className="inline-block px-3 py-1 bg-gradient-to-br from-purple-200 via-purple-100 to-purple-300 dark:from-purple-800/60 dark:via-purple-800 dark:to-purple-700/60 text-purple-800 dark:text-purple-200 text-sm font-semibold rounded-full shadow-sm">
            {blog.category}
          </span>

          {/* Title */}
          <h3 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-teal-500 to-emerald-400 dark:from-pink-400 dark:via-orange-300 dark:to-yellow-400 transition-all duration-300 leading-tight">
            {blog.title}
          </h3>

          {/* Description */}
          <p className="text-gray-700 dark:text-gray-200 leading-relaxed line-clamp-3 drop-shadow-sm font-medium">
            {blog.description ?? "No Description Available"}
          </p>

          {/* Subcategories */}
          <div className="space-y-2">
            <div className="text-xs font-medium text-gray-600 dark:text-gray-400">
              Subcategories: {blog.subCategories.length === 0 && "NA"}
            </div>
            <SubcategoryDisplay blog={blog} />
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {blog.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-flex gap-1 items-center px-3 py-1 bg-gradient-to-br from-cyan-400 via-sky-300 to-sky-400 dark:from-cyan-700 dark:to-sky-600 text-white text-sm font-semibold rounded-full shadow-md"
              >
                <Tag className="h-4 w-4" />
                {tag}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-200">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <Eye className="h-4 w-4" />
                <span>{blog.views ?? "0"}</span>
              </div>
              <BlogLike
                blogId={blog.id}
                initialLikes={likesMap[blog.id] ?? blog.likes ?? 0}
                onChange={handleLikeChange}
              />
              <BlogBookmark blogId={blog.id} onChange={handleBookmarkChange} />
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
                  {blog.author.split(" ")[1]
                    ? blog.author.split(" ")[1]?.charAt(0).toUpperCase() + "."
                    : ""}
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

            <Link href={`/blogpost/${blog.id}`}>
              <button className="group/btn inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition-colors">
                Read More
                <ArrowRight className="ml-1 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </div>
      </article>
    );
  };

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

  useEffect(() => {
    const updateViewMode = () => {
      if (window.innerWidth < 768) {
        setViewMode("grid"); // force grid for small screens
      }
    };

    updateViewMode(); // call on mount
    window.addEventListener("resize", updateViewMode); // optional: respond to resize

    return () => window.removeEventListener("resize", updateViewMode);
  }, []);

  const { user, isSignedIn } = useUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [individualBlog, setIndividualBlog] = useState(null);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [likesMap, setLikesMap] = useState(() => {
    return Object.fromEntries(blogs.map((b) => [b.id, b.likes ?? 0]));
  });
  const [bookmarkedMap, setBookmarkedMap] = useState({});

  const [viewMode, setViewMode] = useState("grid");
  const [tempFilters, setTempFilters] = useState({
    authors: [],
    category: [],
    subCategories: [],
    dateRange: { from: "", to: "" },
    oldestBlog: false,
  });
  const selectedCategoryCount = tempFilters.category
    ? tempFilters.category.length
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
    count += tempFilters.category.length;
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
        bg.category.includes(searchTerm.toLowerCase()) ||
        bg.author.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        filtersToApply.category.length === 0 ||
        filtersToApply.category.includes(bg.category.toLowerCase());

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
        tempFilters.category.length === 0 ||
        tempFilters.category.includes(bg.category.toLowerCase());

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
      category: [],
      subCategories: [],
      dateRange: { from: "", to: "" },
      oldestBlog: false,
    });
    setTempFilters({
      authors: [],
      category: [],
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
    appliedFilters.category.length > 0 ||
    (appliedFilters.dateRange.from &&
      appliedFilters.dateRange.from.trim() !== "") ||
    (appliedFilters.dateRange.to &&
      appliedFilters.dateRange.to.trim() !== "") ||
    appliedFilters.oldestBlog;

  const handleLikeChange = (blogId, total, liked) => {
    setLikesMap((prev) => ({ ...prev, [blogId]: total }));
    refreshData?.(); // optional if you're syncing from DB
  };

  const handleBookmarkChange = (blogId, bookmarked) => {
    setBookmarkedMap((prev) => ({ ...prev, [blogId]: bookmarked }));
  };

  return (
    <div>
      {/* Search Bar & Filter Button for Non-Mobile Devices */}
      <div className="hidden md:flex justify-center mb-16 gap-4 items-center pt-3 px-6">
        <div className="relative max-w-3xl w-full mx-auto">
          <div className="relative bg-gradient-to-r from-blue-50 via-white to-teal-50 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-3xl shadow-lg border border-blue-500 dark:border-gray-300">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 sm:gap-x-4 sm:gap-y-0">
              <div className="flex items-center justify-center w-12 h-12 text-gray-400">
                <Search className="h-5 w-5" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search blogs by title, content, or tags..."
                className="flex-1 min-w-[200px] max-w-full sm:max-w-none h-12 px-1 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 bg-transparent border-none outline-none"
              />

              <div className="flex flex-wrap gap-2 items-center pr-4">
                {/* Clear Button Inside Search Bar */}
                <div>
                  {isSearchActive && (
                    <Button
                      onClick={() => setSearchTerm("")}
                      className=" text-white px-3 py-1 rounded-full shadow-md text-sm xs:text-base transition-transform duration-300 bg-gradient-to-r from-blue-500 to-teal-500 dark:from-pink-400 dark:to-yellow-400 hover:scale-110 active:scale-95"
                    >
                      Clear
                    </Button>
                  )}
                </div>
                <FilterButton
                  tempFilters={tempFilters}
                  setTempFilters={setTempFilters}
                  blogCategories={blogCategories}
                  blogSubCategoriesList={blogSubCategoriesList}
                  blogAuthors={blogAuthors}
                  filterCount={filterCount}
                  selectedCategoryCount={selectedCategoryCount}
                  selectedSubCategoryCount={selectedSubCategoryCount}
                  selectedAuthorCount={selectedAuthorCount}
                  hasActiveFilters={hasActiveFilters}
                  applyFilters={applyFilters}
                  clearFilters={clearFilters}
                  resetFilters={resetFilters}
                  handleDialogClose={handleDialogClose}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar & Filter Button for Mobile Devices */}
      <div className="flex md:hidden justify-center mb-4 gap-4 items-center pt-3 px-6">
        <div className="relative max-w-3xl w-full">
          <Input
            type="text"
            placeholder="Search transactions by name, description, or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-6 py-5 rounded-full placeholder:text-[10px] text-[11px] font-bold shadow-lg border transition-all duration-300 bg-white dark:bg-gray-900 dark:text-white text-gray-800 border-gray-300 dark:border-gray-600 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500 dark:focus:ring-purple-600"
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
      </div>
      <div className="flex md:hidden justify-center mb-6 gap-4 items-center pt-3 px-6">
        <FilterButton
          tempFilters={tempFilters}
          setTempFilters={setTempFilters}
          blogCategories={blogCategories}
          blogSubCategoriesList={blogSubCategoriesList}
          blogAuthors={blogAuthors}
          filterCount={filterCount}
          selectedCategoryCount={selectedCategoryCount}
          selectedSubCategoryCount={selectedSubCategoryCount}
          selectedAuthorCount={selectedAuthorCount}
          hasActiveFilters={hasActiveFilters}
          applyFilters={applyFilters}
          clearFilters={clearFilters}
          resetFilters={resetFilters}
          handleDialogClose={handleDialogClose}
        />
      </div>
      <div className="container flex items-center justify-center md:justify-between mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Showing {displayedBlogs.length} of {blogs.length} blogs
        </div>
        <div className="hidden md:flex items-center space-x-2">
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
      </div>
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {displayedBlogs.length > 0 ? (
          <div
            className={`${
              viewMode === "grid"
                ? "grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                : "space-y-8"
            }`}
          >
            {displayedBlogs.map((blog) => (
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

      {/* Blog Share Modal */}
      {individualBlog && (
        <BlogShare
          isOpen={isShareOpen}
          onClose={() => {
            setIsShareOpen(false);
            setIndividualBlog(null);
          }}
          title={individualBlog.title}
          description={individualBlog.description}
          url={`https://yourdomain.com/blogpost/${individualBlog.id}`} // replace with your actual domain
          // url={"https://www.google.com"} // placeholder URL, replace with actual blog URL
        />
      )}
    </div>
  );
};

export default BlogFetch;
