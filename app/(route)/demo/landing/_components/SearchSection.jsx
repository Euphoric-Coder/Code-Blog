"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  Filter,
  TrendingUp,
  Clock,
  User,
  Tag,
  Play,
  Code2,
  Eye,
  Heart,
  BookOpen,
  Star,
} from "lucide-react";

export const SearchSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);

  const trendingTopics = [
    "React Hooks",
    "TypeScript",
    "Node.js",
    "Python AI",
    "DevOps",
    "Blockchain",
  ];

  // Dummy data for search results
  const allContent = [
    // Blogs
    {
      id: 1,
      type: "blog",
      title: "The Future of Web Development: Static vs Dynamic Websites",
      description:
        "Explore the evolution of web development and understand when to choose static or dynamic approaches.",
      author: "Sagnik Dey",
      category: "Web Development",
      tags: ["React", "JavaScript", "Web Development"],
      readTime: "8 min read",
      views: 12500,
      likes: 890,
      image:
        "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=300",
    },
    {
      id: 2,
      type: "blog",
      title: "The Rise of AI Assistants: From Siri to ChatGPT",
      description:
        "A comprehensive look at how AI assistants have evolved and their impact on modern technology.",
      author: "Sarah Chen",
      category: "AI/ML",
      tags: ["AI", "Machine Learning", "Technology"],
      readTime: "12 min read",
      views: 18900,
      likes: 1250,
      image:
        "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=300",
    },
    {
      id: 3,
      type: "blog",
      title: "Mastering React Hooks: A Complete Guide",
      description:
        "Deep dive into React Hooks with practical examples and best practices for modern React development.",
      author: "Mike Rodriguez",
      category: "Web Development",
      tags: ["React", "JavaScript", "Frontend"],
      readTime: "15 min read",
      views: 9800,
      likes: 720,
      image:
        "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=300",
    },
    {
      id: 4,
      type: "blog",
      title: "Docker and Kubernetes: Container Orchestration Mastery",
      description:
        "Learn how to effectively use Docker and Kubernetes for scalable application deployment.",
      author: "Alex Thompson",
      category: "DevOps",
      tags: ["Docker", "Kubernetes", "DevOps"],
      readTime: "20 min read",
      views: 7600,
      likes: 540,
      image:
        "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=300",
    },
    {
      id: 5,
      type: "blog",
      title: "Python for Data Science: Essential Libraries and Tools",
      description:
        "Comprehensive guide to Python libraries essential for data science including Pandas and NumPy.",
      author: "Dr. Emily Watson",
      category: "Data Science",
      tags: ["Python", "Data Science", "Machine Learning"],
      readTime: "18 min read",
      views: 11200,
      likes: 890,
      image:
        "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=300",
    },
    {
      id: 6,
      type: "blog",
      title: "Building Scalable APIs with Node.js and Express",
      description:
        "Learn best practices for creating robust, scalable APIs using Node.js and Express framework.",
      author: "Lisa Park",
      category: "Backend",
      tags: ["Node.js", "Express", "API"],
      readTime: "14 min read",
      views: 8900,
      likes: 650,
      image:
        "https://images.pexels.com/photos/943096/pexels-photo-943096.jpeg?auto=compress&cs=tinysrgb&w=300",
    },

    // Tutorials
    {
      id: 7,
      type: "tutorial",
      title: "Complete React Hooks Masterclass",
      description:
        "Master React Hooks from basics to advanced patterns with real-world examples and best practices.",
      author: "Sarah Chen",
      category: "Web Development",
      tags: ["React", "Hooks", "Frontend"],
      duration: "4.5 hours",
      views: 12500,
      likes: 890,
      rating: 4.9,
      image:
        "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=300",
    },
    {
      id: 8,
      type: "tutorial",
      title: "Node.js Backend Development",
      description:
        "Build scalable backend applications with Node.js, Express, and MongoDB from scratch.",
      author: "Mike Rodriguez",
      category: "Backend",
      tags: ["Node.js", "Express", "MongoDB"],
      duration: "6 hours",
      views: 18900,
      likes: 1250,
      rating: 4.8,
      image:
        "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=300",
    },
    {
      id: 9,
      type: "tutorial",
      title: "Python Data Science Bootcamp",
      description:
        "Learn data analysis, visualization, and machine learning with Python, Pandas, and Scikit-learn.",
      author: "Dr. Emily Watson",
      category: "Data Science",
      tags: ["Python", "Data Science", "ML"],
      duration: "8 hours",
      views: 9800,
      likes: 720,
      rating: 4.9,
      image:
        "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=300",
    },
    {
      id: 10,
      type: "tutorial",
      title: "DevOps with Docker & Kubernetes",
      description:
        "Master containerization and orchestration with Docker and Kubernetes for modern deployments.",
      author: "Alex Thompson",
      category: "DevOps",
      tags: ["Docker", "Kubernetes", "DevOps"],
      duration: "5.5 hours",
      views: 7600,
      likes: 540,
      rating: 4.7,
      image:
        "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=300",
    },
    {
      id: 11,
      type: "tutorial",
      title: "Machine Learning Fundamentals",
      description:
        "Introduction to machine learning concepts, algorithms, and practical implementation with Python.",
      author: "Dr. James Liu",
      category: "AI/ML",
      tags: ["Machine Learning", "Python", "AI"],
      duration: "7 hours",
      views: 11200,
      likes: 890,
      rating: 4.8,
      image:
        "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=300",
    },
    {
      id: 12,
      type: "tutorial",
      title: "React Native Mobile Development",
      description:
        "Build cross-platform mobile apps with React Native, from setup to app store deployment.",
      author: "Lisa Park",
      category: "Mobile",
      tags: ["React Native", "Mobile", "JavaScript"],
      duration: "6.5 hours",
      views: 8900,
      likes: 650,
      rating: 4.6,
      image:
        "https://images.pexels.com/photos/943096/pexels-photo-943096.jpeg?auto=compress&cs=tinysrgb&w=300",
    },

    // Code Snippets
    {
      id: 13,
      type: "snippet",
      title: "React Custom Hook for API Calls",
      description:
        "A reusable custom hook for handling API requests with loading states and error handling.",
      author: "Alex Chen",
      category: "Utilities",
      tags: ["React", "Hooks", "API"],
      language: "TypeScript",
      views: 8900,
      likes: 1250,
    },
    {
      id: 14,
      type: "snippet",
      title: "Python Data Validator",
      description:
        "Elegant data validation utility with custom error messages and type checking.",
      author: "Maria Rodriguez",
      category: "Utilities",
      tags: ["Python", "Validation", "Utils"],
      language: "Python",
      views: 5600,
      likes: 890,
    },
    {
      id: 15,
      type: "snippet",
      title: "CSS Grid Auto-Fit Layout",
      description:
        "Responsive grid layout that automatically adjusts columns based on container width.",
      author: "David Kim",
      category: "UI/UX",
      tags: ["CSS", "Grid", "Responsive"],
      language: "CSS",
      views: 12400,
      likes: 2100,
    },
    {
      id: 16,
      type: "snippet",
      title: "Node.js Rate Limiter Middleware",
      description:
        "Express middleware for rate limiting with Redis backend and customizable rules.",
      author: "Sarah Johnson",
      category: "Security",
      tags: ["Node.js", "Express", "Security"],
      language: "JavaScript",
      views: 9200,
      likes: 1580,
    },
    {
      id: 17,
      type: "snippet",
      title: "Vue 3 Composable for Local Storage",
      description:
        "Reactive composable for managing localStorage with automatic JSON serialization.",
      author: "Emma Wilson",
      category: "Utilities",
      tags: ["Vue", "Composables", "Storage"],
      language: "TypeScript",
      views: 4300,
      likes: 750,
    },
    {
      id: 18,
      type: "snippet",
      title: "Go HTTP Client with Retry Logic",
      description:
        "Robust HTTP client with exponential backoff retry mechanism and timeout handling.",
      author: "Michael Chang",
      category: "Utilities",
      tags: ["Go", "HTTP", "Resilience"],
      language: "Go",
      views: 6100,
      likes: 920,
    },
  ];

  // Search function
  const performSearch = (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    setIsSearching(true);

    // Simulate API delay
    setTimeout(() => {
      const filtered = allContent.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase()) ||
          item.tags.some((tag) =>
            tag.toLowerCase().includes(query.toLowerCase())
          ) ||
          item.category.toLowerCase().includes(query.toLowerCase()) ||
          item.author.toLowerCase().includes(query.toLowerCase()) ||
          (item.language &&
            item.language.toLowerCase().includes(query.toLowerCase()))
      );

      // Sort by relevance (title matches first, then description, then tags)
      const sorted = filtered.sort((a, b) => {
        const aTitle = a.title.toLowerCase().includes(query.toLowerCase())
          ? 3
          : 0;
        const bTitle = b.title.toLowerCase().includes(query.toLowerCase())
          ? 3
          : 0;
        const aDesc = a.description.toLowerCase().includes(query.toLowerCase())
          ? 2
          : 0;
        const bDesc = b.description.toLowerCase().includes(query.toLowerCase())
          ? 2
          : 0;
        const aTags = a.tags.some((tag) =>
          tag.toLowerCase().includes(query.toLowerCase())
        )
          ? 1
          : 0;
        const bTags = b.tags.some((tag) =>
          tag.toLowerCase().includes(query.toLowerCase())
        )
          ? 1
          : 0;

        return bTitle + bDesc + bTags - (aTitle + aDesc + aTags);
      });

      setSearchResults(sorted.slice(0, 8)); // Limit to 8 results
      setShowResults(true);
      setIsSearching(false);
    }, 300);
  };

  // Handle search input change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      performSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Handle click outside to close results
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getTypeIcon = (type) => {
    switch (type) {
      case "blog":
        return <BookOpen className="h-4 w-4" />;
      case "tutorial":
        return <Play className="h-4 w-4" />;
      case "snippet":
        return <Code2 className="h-4 w-4" />;
      default:
        return <Search className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "blog":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300";
      case "tutorial":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300";
      case "snippet":
        return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };

  const handleResultClick = (result) => {
    // Navigate to the appropriate page based on type
    const routes = {
      blog: "#blog",
      tutorial: "#tutorial",
      snippet: "#snippets",
    };
    window.location.hash = routes[result.type];
    setShowResults(false);
    setSearchQuery("");
  };

  const handleTrendingClick = (topic) => {
    setSearchQuery(topic);
    setShowResults(true);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            Search for{" "}
            <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
              Content
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Find blogs, tutorials, and code snippets in seconds.
          </p>
        </div>

        {/* Search Container */}
        <div className="relative" ref={searchRef}>
          <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl shadow-blue-500/5 border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
            <div className="flex items-center">
              {/* Search Icon */}
              <div className="flex items-center justify-center w-12 h-12 text-gray-400">
                <Search className="h-5 w-5" />
              </div>

              {/* Search Input */}
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search blogs, tutorials, code snippets..."
                className="flex-1 h-12 px-4 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 bg-transparent border-none outline-none text-lg"
                onFocus={() => searchQuery && setShowResults(true)}
              />

              {/* Loading indicator */}
              {isSearching && (
                <div className="flex items-center justify-center w-12 h-12">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                </div>
              )}

              {/* Filter Button */}
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`flex items-center justify-center w-12 h-12 transition-colors ${
                  isFilterOpen
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                }`}
              >
                <Filter className="h-5 w-5" />
              </button>

              {/* Search Button */}
              <button
                onClick={() => performSearch(searchQuery)}
                className="m-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-teal-500 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200"
              >
                Search
              </button>
            </div>

            {/* Filter Dropdown */}
            {isFilterOpen && (
              <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-750">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {["All", "Blogs", "Tutorials", "Snippets"].map((filter) => (
                    <button
                      key={filter}
                      className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-colors"
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Search Results */}
          {showResults && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50 max-h-96 overflow-y-auto">
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Found {searchResults.length} results for "{searchQuery}"
                  </div>
                  <button
                    onClick={() => setShowResults(false)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    ×
                  </button>
                </div>

                <div className="space-y-3">
                  {searchResults.map((result) => (
                    <div
                      key={result.id}
                      onClick={() => handleResultClick(result)}
                      className="group p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-600 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-all duration-200 cursor-pointer"
                    >
                      <div className="flex items-start space-x-4">
                        {/* Image for blogs and tutorials */}
                        {(result.type === "blog" ||
                          result.type === "tutorial") &&
                          result.image && (
                            <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden">
                              <img
                                src={result.image}
                                alt={result.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                              />
                            </div>
                          )}

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-2">
                            <span
                              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(result.type)}`}
                            >
                              {getTypeIcon(result.type)}
                              <span className="ml-1 capitalize">
                                {result.type}
                              </span>
                            </span>

                            {result.language && (
                              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full">
                                {result.language}
                              </span>
                            )}

                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {result.category}
                            </span>
                          </div>

                          <h3 className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1 mb-1">
                            {result.title}
                          </h3>

                          <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2 mb-2">
                            {result.description}
                          </p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                              <div className="flex items-center space-x-1">
                                <User className="h-3 w-3" />
                                <span>{result.author}</span>
                              </div>

                              {result.readTime && (
                                <div className="flex items-center space-x-1">
                                  <Clock className="h-3 w-3" />
                                  <span>{result.readTime}</span>
                                </div>
                              )}

                              {result.duration && (
                                <div className="flex items-center space-x-1">
                                  <Play className="h-3 w-3" />
                                  <span>{result.duration}</span>
                                </div>
                              )}

                              {result.rating && (
                                <div className="flex items-center space-x-1">
                                  <Star className="h-3 w-3 text-yellow-400 fill-current" />
                                  <span>{result.rating}</span>
                                </div>
                              )}
                            </div>

                            <div className="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-400">
                              <div className="flex items-center space-x-1">
                                <Eye className="h-3 w-3" />
                                <span>{result.views.toLocaleString()}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Heart className="h-3 w-3" />
                                <span>{result.likes}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {searchResults.length === 8 && (
                  <div className="mt-4 text-center">
                    <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
                      View all results →
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* No Results */}
          {showResults &&
            searchResults.length === 0 &&
            searchQuery &&
            !isSearching && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50">
                <div className="p-6 text-center">
                  <Search className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No results found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Try searching for something else or browse our trending
                    topics below.
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {trendingTopics.slice(0, 3).map((topic) => (
                      <button
                        key={topic}
                        onClick={() => handleTrendingClick(topic)}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm rounded-full hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
        </div>

        {/* Trending Topics */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
            <TrendingUp className="h-4 w-4" />
            <span>Trending topics:</span>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {trendingTopics.map((topic) => (
              <button
                key={topic}
                onClick={() => handleTrendingClick(topic)}
                className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-300 hover:border-blue-300 dark:hover:border-blue-600 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
