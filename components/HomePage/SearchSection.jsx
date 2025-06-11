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
  X,
} from "lucide-react";

export const SearchSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [filters, setFilters] = useState({
    type: "All",
    category: "All",
    level: "All",
    language: "All",
  });
  const searchRef = useRef(null);

  const trendingTopics = [
    "React Hooks",
    "TypeScript",
    "Node.js",
    "Python AI",
    "DevOps",
    "Blockchain",
  ];

  const filterOptions = {
    types: ["All", "Blogs", "Tutorials", "Snippets"],
    categories: [
      "All",
      "Web Development",
      "AI/ML",
      "Data Science",
      "DevOps",
      "Cloud Computing",
      "Blockchain",
      "Mobile Development",
    ],
    levels: ["All", "Beginner", "Intermediate", "Advanced"],
    languages: [
      "All",
      "JavaScript",
      "TypeScript",
      "Python",
      "Java",
      "C++",
      "C",
      "Go",
      "Rust",
      "PHP",
      "Ruby",
      "Swift",
      "Kotlin",
      "C#",
      "CSS",
      "Solidity",
    ],
  };

  // Dummy data for search results with subcategories
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
      subcategory: "Frontend Architecture",
      tags: ["React", "JavaScript", "Web Development", "SSG", "SSR"],
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
      subcategory: "Natural Language Processing",
      tags: ["AI", "Machine Learning", "Technology", "NLP", "ChatGPT"],
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
      subcategory: "React Development",
      tags: ["React", "JavaScript", "Frontend", "Hooks", "useState"],
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
      subcategory: "Container Orchestration",
      tags: ["Docker", "Kubernetes", "DevOps", "Containers", "Microservices"],
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
      subcategory: "Data Analysis",
      tags: ["Python", "Data Science", "Machine Learning", "Pandas", "NumPy"],
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
      category: "Web Development",
      subcategory: "Backend Development",
      tags: ["Node.js", "Express", "API", "REST", "Backend"],
      readTime: "14 min read",
      views: 8900,
      likes: 650,
      image:
        "https://images.pexels.com/photos/943096/pexels-photo-943096.jpeg?auto=compress&cs=tinysrgb&w=300",
    },
    {
      id: 7,
      type: "blog",
      title: "Blockchain Technology: Beyond Cryptocurrency",
      description:
        "Exploring blockchain applications in supply chain, healthcare, and digital identity management.",
      author: "David Kim",
      category: "Blockchain",
      subcategory: "Enterprise Applications",
      tags: ["Blockchain", "Cryptocurrency", "Smart Contracts", "DeFi", "Web3"],
      readTime: "16 min read",
      views: 6800,
      likes: 480,
      image:
        "https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=300",
    },
    {
      id: 8,
      type: "blog",
      title: "Cloud Computing Security: Best Practices for 2024",
      description:
        "Essential security measures and compliance strategies for cloud-based applications and infrastructure.",
      author: "Jennifer Liu",
      category: "Cloud Computing",
      subcategory: "Security & Compliance",
      tags: ["Cloud Security", "AWS", "Azure", "Compliance", "Infrastructure"],
      readTime: "22 min read",
      views: 9500,
      likes: 720,
      image:
        "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=300",
    },

    // Tutorials
    {
      id: 9,
      type: "tutorial",
      title: "Complete React Hooks Masterclass",
      description:
        "Master React Hooks from basics to advanced patterns with real-world examples and best practices.",
      author: "Sarah Chen",
      category: "Web Development",
      subcategory: "React Development",
      tags: ["React", "Hooks", "Frontend", "useState", "useEffect"],
      duration: "4.5 hours",
      views: 12500,
      likes: 890,
      rating: 4.9,
      image:
        "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=300",
    },
    {
      id: 10,
      type: "tutorial",
      title: "Node.js Backend Development",
      description:
        "Build scalable backend applications with Node.js, Express, and MongoDB from scratch.",
      author: "Mike Rodriguez",
      category: "Web Development",
      subcategory: "Backend Development",
      tags: ["Node.js", "Express", "MongoDB", "REST API", "Authentication"],
      duration: "6 hours",
      views: 18900,
      likes: 1250,
      rating: 4.8,
      image:
        "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=300",
    },
    {
      id: 11,
      type: "tutorial",
      title: "Python Data Science Bootcamp",
      description:
        "Learn data analysis, visualization, and machine learning with Python, Pandas, and Scikit-learn.",
      author: "Dr. Emily Watson",
      category: "Data Science",
      subcategory: "Machine Learning",
      tags: ["Python", "Data Science", "ML", "Pandas", "Scikit-learn"],
      duration: "8 hours",
      views: 9800,
      likes: 720,
      rating: 4.9,
      image:
        "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=300",
    },
    {
      id: 12,
      type: "tutorial",
      title: "DevOps with Docker & Kubernetes",
      description:
        "Master containerization and orchestration with Docker and Kubernetes for modern deployments.",
      author: "Alex Thompson",
      category: "DevOps",
      subcategory: "Container Orchestration",
      tags: ["Docker", "Kubernetes", "DevOps", "CI/CD", "Deployment"],
      duration: "5.5 hours",
      views: 7600,
      likes: 540,
      rating: 4.7,
      image:
        "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=300",
    },
    {
      id: 13,
      type: "tutorial",
      title: "Machine Learning Fundamentals",
      description:
        "Introduction to machine learning concepts, algorithms, and practical implementation with Python.",
      author: "Dr. James Liu",
      category: "AI/ML",
      subcategory: "Machine Learning Basics",
      tags: [
        "Machine Learning",
        "Python",
        "AI",
        "Algorithms",
        "Neural Networks",
      ],
      duration: "7 hours",
      views: 11200,
      likes: 890,
      rating: 4.8,
      image:
        "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=300",
    },
    {
      id: 14,
      type: "tutorial",
      title: "React Native Mobile Development",
      description:
        "Build cross-platform mobile apps with React Native, from setup to app store deployment.",
      author: "Lisa Park",
      category: "Mobile Development",
      subcategory: "Cross-Platform Development",
      tags: ["React Native", "Mobile", "JavaScript", "iOS", "Android"],
      duration: "6.5 hours",
      views: 8900,
      likes: 650,
      rating: 4.6,
      image:
        "https://images.pexels.com/photos/943096/pexels-photo-943096.jpeg?auto=compress&cs=tinysrgb&w=300",
    },
    {
      id: 15,
      type: "tutorial",
      title: "AWS Cloud Architecture Fundamentals",
      description:
        "Design and deploy scalable cloud solutions using AWS services and best practices.",
      author: "Robert Chen",
      category: "Cloud Computing",
      subcategory: "AWS Architecture",
      tags: ["AWS", "Cloud Architecture", "EC2", "S3", "Lambda"],
      duration: "9 hours",
      views: 13400,
      likes: 980,
      rating: 4.8,
      image:
        "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=300",
    },
    {
      id: 16,
      type: "tutorial",
      title: "Blockchain Development with Solidity",
      description:
        "Learn to build smart contracts and decentralized applications on the Ethereum blockchain.",
      author: "Maria Garcia",
      category: "Blockchain",
      subcategory: "Smart Contract Development",
      tags: ["Blockchain", "Solidity", "Ethereum", "Smart Contracts", "DApps"],
      duration: "7.5 hours",
      views: 5600,
      likes: 420,
      rating: 4.7,
      image:
        "https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=300",
    },

    // Code Snippets
    {
      id: 17,
      type: "snippet",
      title: "React Custom Hook for API Calls",
      description:
        "A reusable custom hook for handling API requests with loading states and error handling.",
      author: "Alex Chen",
      category: "Web Development",
      subcategory: "React Utilities",
      tags: ["React", "Hooks", "API", "Custom Hook", "TypeScript"],
      language: "TypeScript",
      views: 8900,
      likes: 1250,
    },
    {
      id: 18,
      type: "snippet",
      title: "Python Data Validator",
      description:
        "Elegant data validation utility with custom error messages and type checking.",
      author: "Maria Rodriguez",
      category: "Data Science",
      subcategory: "Data Validation",
      tags: [
        "Python",
        "Validation",
        "Utils",
        "Data Processing",
        "Error Handling",
      ],
      language: "Python",
      views: 5600,
      likes: 890,
    },
    {
      id: 19,
      type: "snippet",
      title: "CSS Grid Auto-Fit Layout",
      description:
        "Responsive grid layout that automatically adjusts columns based on container width.",
      author: "David Kim",
      category: "Web Development",
      subcategory: "CSS Layouts",
      tags: ["CSS", "Grid", "Responsive", "Layout", "Frontend"],
      language: "CSS",
      views: 12400,
      likes: 2100,
    },
    {
      id: 20,
      type: "snippet",
      title: "Node.js Rate Limiter Middleware",
      description:
        "Express middleware for rate limiting with Redis backend and customizable rules.",
      author: "Sarah Johnson",
      category: "Web Development",
      subcategory: "Backend Security",
      tags: ["Node.js", "Express", "Security", "Middleware", "Rate Limiting"],
      language: "JavaScript",
      views: 9200,
      likes: 1580,
    },
    {
      id: 21,
      type: "snippet",
      title: "Vue 3 Composable for Local Storage",
      description:
        "Reactive composable for managing localStorage with automatic JSON serialization.",
      author: "Emma Wilson",
      category: "Web Development",
      subcategory: "Vue.js Utilities",
      tags: ["Vue", "Composables", "Storage", "Reactivity", "TypeScript"],
      language: "TypeScript",
      views: 4300,
      likes: 750,
    },
    {
      id: 22,
      type: "snippet",
      title: "Go HTTP Client with Retry Logic",
      description:
        "Robust HTTP client with exponential backoff retry mechanism and timeout handling.",
      author: "Michael Chang",
      category: "Web Development",
      subcategory: "Backend Utilities",
      tags: ["Go", "HTTP", "Resilience", "Client", "Error Handling"],
      language: "Go",
      views: 6100,
      likes: 920,
    },
    {
      id: 23,
      type: "snippet",
      title: "Docker Multi-Stage Build Template",
      description:
        "Optimized Docker multi-stage build configuration for Node.js applications.",
      author: "Tom Wilson",
      category: "DevOps",
      subcategory: "Docker Configuration",
      tags: ["Docker", "DevOps", "Build Optimization", "Node.js", "Containers"],
      language: "Dockerfile",
      views: 7800,
      likes: 650,
    },
    {
      id: 24,
      type: "snippet",
      title: "AWS Lambda Function Template",
      description:
        "Serverless function template with error handling, logging, and environment configuration.",
      author: "Jessica Brown",
      category: "Cloud Computing",
      subcategory: "Serverless Functions",
      tags: ["AWS", "Lambda", "Serverless", "Cloud", "JavaScript"],
      language: "JavaScript",
      views: 9600,
      likes: 780,
    },
    {
      id: 25,
      type: "snippet",
      title: "Python Machine Learning Pipeline",
      description:
        "Complete ML pipeline with data preprocessing, model training, and evaluation metrics.",
      author: "Dr. Kevin Park",
      category: "AI/ML",
      subcategory: "ML Pipelines",
      tags: [
        "Python",
        "Machine Learning",
        "Pipeline",
        "Scikit-learn",
        "Data Science",
      ],
      language: "Python",
      views: 11500,
      likes: 1340,
    },
    {
      id: 26,
      type: "snippet",
      title: "Solidity Smart Contract Template",
      description:
        "Secure smart contract template with access control, events, and gas optimization.",
      author: "Carlos Rodriguez",
      category: "Blockchain",
      subcategory: "Smart Contracts",
      tags: [
        "Solidity",
        "Blockchain",
        "Smart Contracts",
        "Ethereum",
        "Security",
      ],
      language: "Solidity",
      views: 4200,
      likes: 380,
    },
  ];

  // Search function with filters
  const performSearch = (query, currentFilters = filters) => {
    if (
      !query.trim() &&
      Object.values(currentFilters).every((filter) => filter === "All")
    ) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    setIsSearching(true);

    // Simulate API delay
    setTimeout(() => {
      let filtered = allContent;

      // Apply text search
      if (query.trim()) {
        filtered = filtered.filter(
          (item) =>
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.description.toLowerCase().includes(query.toLowerCase()) ||
            item.tags.some((tag) =>
              tag.toLowerCase().includes(query.toLowerCase())
            ) ||
            item.category.toLowerCase().includes(query.toLowerCase()) ||
            item.subcategory.toLowerCase().includes(query.toLowerCase()) ||
            item.author.toLowerCase().includes(query.toLowerCase()) ||
            (item.language &&
              item.language.toLowerCase().includes(query.toLowerCase()))
        );
      }

      // Apply filters
      if (currentFilters.type !== "All") {
        const typeMap = {
          Blogs: "blog",
          Tutorials: "tutorial",
          Snippets: "snippet",
        };
        filtered = filtered.filter(
          (item) => item.type === typeMap[currentFilters.type]
        );
      }

      if (currentFilters.category !== "All") {
        filtered = filtered.filter(
          (item) => item.category === currentFilters.category
        );
      }

      if (currentFilters.language !== "All") {
        filtered = filtered.filter(
          (item) => item.language === currentFilters.language
        );
      }

      // Sort by relevance (title matches first, then description, then tags)
      const sorted = filtered.sort((a, b) => {
        if (!query.trim()) return 0;

        const aTitle = a.title.toLowerCase().includes(query.toLowerCase())
          ? 4
          : 0;
        const bTitle = b.title.toLowerCase().includes(query.toLowerCase())
          ? 4
          : 0;
        const aCategory = a.category.toLowerCase().includes(query.toLowerCase())
          ? 3
          : 0;
        const bCategory = b.category.toLowerCase().includes(query.toLowerCase())
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

        return (
          bTitle +
          bCategory +
          bDesc +
          bTags -
          (aTitle + aCategory + aDesc + aTags)
        );
      });

      setSearchResults(sorted.slice(0, 10)); // Limit to 10 results
      setShowResults(true);
      setIsSearching(false);
    }, 300);
  };

  // Handle search input change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      performSearch(searchQuery, filters);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, filters]);

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

  const getLanguageColor = (language) => {
    const colors = {
      TypeScript:
        "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400",
      JavaScript:
        "bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400",
      Python:
        "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400",
      CSS: "bg-pink-50 text-pink-600 dark:bg-pink-900/20 dark:text-pink-400",
      Go: "bg-cyan-50 text-cyan-600 dark:bg-cyan-900/20 dark:text-cyan-400",
      Dockerfile:
        "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400",
      Solidity:
        "bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400",
    };
    return (
      colors[language] ||
      "bg-gray-50 text-gray-600 dark:bg-gray-900/20 dark:text-gray-400"
    );
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

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    performSearch(searchQuery, newFilters);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setShowResults(false);
  };

  const clearAllFilters = () => {
    const resetFilters = {
      type: "All",
      category: "All",
      level: "All",
      language: "All",
    };
    setFilters(resetFilters);
    performSearch(searchQuery, resetFilters);
  };

  const hasActiveFilters = Object.values(filters).some(
    (filter) => filter !== "All"
  );

  return (
    <section className="py-5">

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
            Find blogs, tutorials, and code snippets across {allContent.length}{" "}
            curated resources.
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

              {/* Clear Button */}
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="flex items-center justify-center w-10 h-10 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  title="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}

              {/* Loading indicator */}
              {isSearching && (
                <div className="flex items-center justify-center w-12 h-12">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                </div>
              )}

              {/* Filter Button */}
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`flex items-center justify-center w-12 h-12 transition-colors relative ${
                  isFilterOpen
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                }`}
              >
                <Filter className="h-5 w-5" />
                {hasActiveFilters && (
                  <div className="absolute top-2 right-2 w-2 h-2 bg-blue-600 rounded-full"></div>
                )}
              </button>

              {/* Search Button */}
              <button
                onClick={() => performSearch(searchQuery, filters)}
                className="m-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-teal-500 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200"
              >
                Search
              </button>
            </div>

            {/* Filter Dropdown */}
            {isFilterOpen && (
              <div className="border-t border-gray-200 dark:border-gray-700 p-6 bg-gray-50 dark:bg-gray-750">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Filters
                  </h3>
                  {hasActiveFilters && (
                    <button
                      onClick={clearAllFilters}
                      className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                    >
                      Clear all
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Type Filter */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
                      Content Type
                    </label>
                    <select
                      value={filters.type}
                      onChange={(e) =>
                        handleFilterChange("type", e.target.value)
                      }
                      className="w-full px-3 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {filterOptions.types.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Category Filter */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
                      Category
                    </label>
                    <select
                      value={filters.category}
                      onChange={(e) =>
                        handleFilterChange("category", e.target.value)
                      }
                      className="w-full px-3 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {filterOptions.categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Level Filter */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
                      Difficulty Level
                    </label>
                    <select
                      value={filters.level}
                      onChange={(e) =>
                        handleFilterChange("level", e.target.value)
                      }
                      className="w-full px-3 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {filterOptions.levels.map((level) => (
                        <option key={level} value={level}>
                          {level}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Language Filter */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
                      Programming Language
                    </label>
                    <select
                      value={filters.language}
                      onChange={(e) =>
                        handleFilterChange("language", e.target.value)
                      }
                      className="w-full px-3 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {filterOptions.languages.map((language) => (
                        <option key={language} value={language}>
                          {language}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Active Filters Display */}
                {hasActiveFilters && (
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                    <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
                      Active Filters:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(filters).map(([key, value]) => {
                        if (value === "All") return null;
                        return (
                          <span
                            key={key}
                            className="inline-flex items-center px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full"
                          >
                            {key}: {value}
                            <button
                              onClick={() => handleFilterChange(key, "All")}
                              className="ml-1 hover:text-blue-900 dark:hover:text-blue-100"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Search Results */}
          {showResults && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50 max-h-96 overflow-y-auto">
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Found {searchResults.length} results
                    {searchQuery && ` for "${searchQuery}"`}
                    {hasActiveFilters && " with filters applied"}
                  </div>
                  <button
                    onClick={() => setShowResults(false)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <X className="h-4 w-4" />
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
                          <div className="flex items-center space-x-2 mb-2 flex-wrap">
                            <span
                              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(result.type)}`}
                            >
                              {getTypeIcon(result.type)}
                              <span className="ml-1 capitalize">
                                {result.type}
                              </span>
                            </span>

                            {result.language && (
                              <span
                                className={`px-2 py-1 text-xs rounded-full font-medium ${getLanguageColor(result.language)}`}
                              >
                                {result.language}
                              </span>
                            )}

                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {result.category}
                            </span>

                            <span className="text-xs text-gray-400 dark:text-gray-500">
                              • {result.subcategory}
                            </span>
                          </div>

                          <h3 className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1 mb-1">
                            {result.title}
                          </h3>

                          <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2 mb-2">
                            {result.description}
                          </p>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-1 mb-2">
                            {result.tags.slice(0, 4).map((tag) => (
                              <span
                                key={tag}
                                className="inline-flex items-center px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded"
                              >
                                <Tag className="h-2.5 w-2.5 mr-1" />
                                {tag}
                              </span>
                            ))}
                            {result.tags.length > 4 && (
                              <span className="text-xs text-gray-400 dark:text-gray-500">
                                +{result.tags.length - 4} more
                              </span>
                            )}
                          </div>

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

                {searchResults.length === 10 && (
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
            (searchQuery || hasActiveFilters) &&
            !isSearching && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50">
                <div className="p-6 text-center">
                  <Search className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No results found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {hasActiveFilters
                      ? "Try adjusting your filters or search terms."
                      : "Try searching for something else or browse our trending topics below."}
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {hasActiveFilters ? (
                      <button
                        onClick={clearAllFilters}
                        className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                      >
                        Clear all filters
                      </button>
                    ) : (
                      trendingTopics.slice(0, 3).map((topic) => (
                        <button
                          key={topic}
                          onClick={() => handleTrendingClick(topic)}
                          className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm rounded-full hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                        >
                          {topic}
                        </button>
                      ))
                    )}
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
