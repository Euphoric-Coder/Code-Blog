import React, { useState } from "react";
import {
  Search,
  Filter,
  Calendar,
  User,
  Clock,
  ArrowRight,
  Tag,
  TrendingUp,
  Grid,
  List,
  ChevronDown,
  Eye,
  Heart,
  Bookmark,
  Share2,
  Code,
  Zap,
  BookOpen,
  Lightbulb,
  Cpu,
  Globe,
  MoreHorizontal,
} from "lucide-react";

export const BlogPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTag, setSelectedTag] = useState("All");
  const [sortBy, setSortBy] = useState("latest");
  const [viewMode, setViewMode] = useState("grid");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [hoveredBlogId, setHoveredBlogId] = useState(null);

  const categories = [
    "All",
    "Web Development",
    "AI/ML",
    "DevOps",
    "Mobile",
    "Data Science",
    "Blockchain",
    "Cloud Computing",
  ];
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

  const blogs = [
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
      publishDate: "2024-04-17",
      readTime: "8 min read",
      image:
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
      publishDate: "2024-04-17",
      readTime: "12 min read",
      image:
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
      publishDate: "2024-04-15",
      readTime: "15 min read",
      image:
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
      publishDate: "2024-04-14",
      readTime: "20 min read",
      image:
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
      publishDate: "2024-04-12",
      readTime: "18 min read",
      image:
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
      publishDate: "2024-04-10",
      readTime: "14 min read",
      image:
        "https://images.pexels.com/photos/943096/pexels-photo-943096.jpeg?auto=compress&cs=tinysrgb&w=800",
      views: 8900,
      likes: 650,
      featured: false,
      trending: false,
    },
  ];

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesCategory =
      selectedCategory === "All" || blog.category === selectedCategory;
    const matchesTag = selectedTag === "All" || blog.tags.includes(selectedTag);

    return matchesSearch && matchesCategory && matchesTag;
  });

  const sortedBlogs = [...filteredBlogs].sort((a, b) => {
    switch (sortBy) {
      case "latest":
        return (
          new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
        );
      case "popular":
        return b.views - a.views;
      case "trending":
        return (b.trending ? 1 : 0) - (a.trending ? 1 : 0);
      default:
        return 0;
    }
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Function to handle category selection from tech icons
  const handleCategorySelect = (category) => {
    const categoryMap = {
      Frontend: "Web Development",
      "AI/ML": "AI/ML",
      Backend: "Web Development",
      DevOps: "DevOps",
      Innovation: "Blockchain",
      Tutorials: "All",
    };

    setSelectedCategory(categoryMap[category] || "All");
    // Scroll to blog section
    const blogSection = document.getElementById("blog-section");
    if (blogSection) {
      blogSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Function to handle explore blogs action
  const handleExploreBlogsClick = () => {
    // Scroll to blog section
    const blogSection = document.getElementById("blog-section");
    if (blogSection) {
      blogSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Function to handle browse categories action
  const handleBrowseCategoriesClick = () => {
    setIsFilterOpen(true);
    // Scroll to search section
    const searchSection = document.getElementById("search-section");
    if (searchSection) {
      searchSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Subcategory display component
  const SubcategoryDisplay = ({ blog }) => {
    const maxVisible = 2;
    const visibleSubcategories = blog.subcategories.slice(0, maxVisible);
    const remainingCount = blog.subcategories.length - maxVisible;

    return (
      <div className="flex flex-wrap gap-2 items-center">
        {visibleSubcategories.map((subcategory) => (
          <span
            key={subcategory}
            className="px-2 py-1 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-600/60 dark:to-gray-500/60 text-gray-800 dark:text-gray-100 text-xs rounded-md shadow-sm font-medium"
          >
            {subcategory}
          </span>
        ))}

        {remainingCount > 0 && (
          <div
            className="relative"
            onMouseEnter={() => setHoveredBlogId(blog.id)}
            onMouseLeave={() => setHoveredBlogId(null)}
          >
            <button className="flex items-center px-2 py-1 bg-gradient-to-r from-blue-200 to-blue-300 dark:from-blue-800/60 dark:to-blue-700/60 text-blue-800 dark:text-blue-200 text-xs rounded-md shadow-sm font-medium hover:from-blue-300 hover:to-blue-400 dark:hover:from-blue-700/60 dark:hover:to-blue-600/60 transition-all duration-200">
              <MoreHorizontal className="h-3 w-3 mr-1" />+{remainingCount} more
            </button>

            {/* Hover Card */}
            {hoveredBlogId === blog.id && (
              <div className="absolute bottom-full left-0 mb-2 z-50 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-3 animate-in fade-in-0 zoom-in-95 duration-200">
                <div className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  All Subcategories ({blog.subcategories.length})
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {blog.subcategories.map((subcategory) => (
                    <span
                      key={subcategory}
                      className="px-2 py-1 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700/60 dark:to-gray-600/60 text-gray-700 dark:text-gray-200 text-xs rounded-md font-medium"
                    >
                      {subcategory}
                    </span>
                  ))}
                </div>

                {/* Arrow pointer */}
                <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-200 dark:border-t-gray-700"></div>
                <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-white dark:border-t-gray-800 transform translate-y-[-1px]"></div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

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
                src={blog.image}
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
                  <SubcategoryDisplay blog={blog} />
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
                    <span className="font-semibold">{blog.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(blog.publishDate)}</span>
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
            src={blog.image}
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
            <SubcategoryDisplay blog={blog} />
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
              <span className="text-sm text-gray-700 dark:text-gray-200 font-semibold">
                {blog.author}
              </span>
              <span className="text-gray-400 dark:text-gray-500">•</span>
              <span className="text-sm text-gray-700 dark:text-gray-200">
                {formatDate(blog.publishDate)}
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-400/10 to-teal-400/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-teal-400/10 to-blue-400/10 rounded-full blur-3xl"></div>

          {/* Decorative Elements */}
          <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Enhanced Main Heading with Background */}
              <div className="relative">
                {/* Background Shape */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full max-w-4xl h-32 bg-gradient-to-r from-blue-500/5 via-purple-500/10 to-teal-500/5 rounded-3xl blur-3xl transform rotate-1"></div>
                </div>

                {/* Main Heading */}
                <div className="relative">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight">
                    <span className="block text-gray-900 dark:text-white mb-2">
                      Stay Ahead in
                    </span>
                    <span className="block relative">
                      {/* Background text effect */}
                      <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-teal-500 bg-clip-text text-transparent blur-sm opacity-50">
                        Tech & Innovation
                      </span>
                      {/* Main text */}
                      <span className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-teal-500 bg-clip-text text-transparent animate-gradient drop-shadow-2xl">
                        Tech & Innovation
                      </span>
                    </span>
                  </h1>

                  {/* Decorative underline */}
                  <div className="flex justify-start mt-4">
                    <div className="w-32 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500 rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Subtitle with enhanced styling */}
              <div className="space-y-4">
                <p className="text-xl sm:text-2xl text-teal-600 dark:text-teal-400 font-semibold">
                  Your Daily Dose of Technology Insights
                </p>

                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  Dive into expert-led blogs covering{" "}
                  <span className="font-semibold text-blue-600 dark:text-blue-400">
                    Full Stack Development
                  </span>
                  ,{" "}
                  <span className="font-semibold text-purple-600 dark:text-purple-400">
                    AI/ML advancements
                  </span>
                  , and{" "}
                  <span className="font-semibold text-teal-600 dark:text-teal-400">
                    Cloud Computing
                  </span>{" "}
                  insights. Stay informed with the latest in{" "}
                  <span className="font-semibold text-orange-600 dark:text-orange-400">
                    Blockchain
                  </span>
                  ,{" "}
                  <span className="font-semibold text-green-600 dark:text-green-400">
                    DevOps practices
                  </span>
                  , and more to elevate your tech journey.
                </p>
              </div>
            </div>

            {/* Right Content - Tech Illustration */}
            <div className="relative lg:h-96 flex items-center justify-center">
              {/* Main Container */}
              <div className="relative w-full max-w-md">
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-3xl transform rotate-3"></div>

                {/* Main Illustration Container */}
                <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-gray-200/50 dark:border-gray-700/50">
                  {/* Tech Stack Visualization */}
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="text-center space-y-2">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto">
                        <Code className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                        Tech Blog Hub
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Interactive Learning Platform
                      </p>
                    </div>

                    {/* Tech Icons Grid */}
                    <div className="grid grid-cols-3 gap-4">
                      {/* Frontend */}
                      <button
                        onClick={() => handleCategorySelect("Frontend")}
                        className="group bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 rounded-xl p-3 text-center hover:scale-105 transition-transform cursor-pointer"
                      >
                        <Globe className="h-6 w-6 text-blue-600 dark:text-blue-400 mx-auto mb-1" />
                        <span className="text-xs font-medium text-blue-700 dark:text-blue-300">
                          Frontend
                        </span>
                      </button>

                      {/* AI/ML */}
                      <button
                        onClick={() => handleCategorySelect("AI/ML")}
                        className="group bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 rounded-xl p-3 text-center hover:scale-105 transition-transform cursor-pointer"
                      >
                        <Cpu className="h-6 w-6 text-purple-600 dark:text-purple-400 mx-auto mb-1" />
                        <span className="text-xs font-medium text-purple-700 dark:text-purple-300">
                          AI/ML
                        </span>
                      </button>

                      {/* Backend */}
                      <button
                        onClick={() => handleCategorySelect("Backend")}
                        className="group bg-gradient-to-br from-teal-100 to-teal-200 dark:from-teal-900/30 dark:to-teal-800/30 rounded-xl p-3 text-center hover:scale-105 transition-transform cursor-pointer"
                      >
                        <Zap className="h-6 w-6 text-teal-600 dark:text-teal-400 mx-auto mb-1" />
                        <span className="text-xs font-medium text-teal-700 dark:text-teal-300">
                          Backend
                        </span>
                      </button>

                      {/* DevOps */}
                      <button
                        onClick={() => handleCategorySelect("DevOps")}
                        className="group bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30 rounded-xl p-3 text-center hover:scale-105 transition-transform cursor-pointer"
                      >
                        <BookOpen className="h-6 w-6 text-orange-600 dark:text-orange-400 mx-auto mb-1" />
                        <span className="text-xs font-medium text-orange-700 dark:text-orange-300">
                          DevOps
                        </span>
                      </button>

                      {/* Innovation */}
                      <button
                        onClick={() => handleCategorySelect("Innovation")}
                        className="group bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 rounded-xl p-3 text-center hover:scale-105 transition-transform cursor-pointer"
                      >
                        <Lightbulb className="h-6 w-6 text-green-600 dark:text-green-400 mx-auto mb-1" />
                        <span className="text-xs font-medium text-green-700 dark:text-green-300">
                          Innovation
                        </span>
                      </button>

                      {/* Tutorials */}
                      <button
                        onClick={() => handleCategorySelect("Tutorials")}
                        className="group bg-gradient-to-br from-pink-100 to-pink-200 dark:from-pink-900/30 dark:to-pink-800/30 rounded-xl p-3 text-center hover:scale-105 transition-transform cursor-pointer"
                      >
                        <BookOpen className="h-6 w-6 text-pink-600 dark:text-pink-400 mx-auto mb-1" />
                        <span className="text-xs font-medium text-pink-700 dark:text-pink-300">
                          Tutorials
                        </span>
                      </button>
                    </div>

                    {/* Animated Progress Bars */}
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-600 dark:text-gray-400">
                            Learning Progress
                          </span>
                          <span className="text-blue-600 dark:text-blue-400 font-medium">
                            85%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full w-4/5 animate-pulse"></div>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-600 dark:text-gray-400">
                            Skill Development
                          </span>
                          <span className="text-teal-600 dark:text-teal-400 font-medium">
                            92%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div className="bg-gradient-to-r from-teal-500 to-blue-500 h-2 rounded-full w-11/12 animate-pulse delay-300"></div>
                        </div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-3 pt-2">
                      <div className="text-center">
                        <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                          50+
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Blogs
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                          25+
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Tutorials
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-teal-600 dark:text-teal-400">
                          10K+
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Readers
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-bounce"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-pink-400 to-red-500 rounded-full animate-bounce delay-1000"></div>
                <div className="absolute top-1/2 -right-6 w-4 h-4 bg-gradient-to-r from-green-400 to-teal-500 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section
        id="search-section"
        className="py-12 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <div className="relative bg-gradient-to-r from-blue-50 via-white to-teal-50 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-600/50">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-12 h-12 text-gray-400">
                    <Search className="h-5 w-5" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search blogs by title, content, or tags..."
                    className="flex-1 h-12 px-4 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 bg-transparent border-none outline-none"
                  />
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
                </div>
              </div>
            </div>

            {/* Filters */}
            {isFilterOpen && (
              <div className="bg-gradient-to-r from-blue-50 via-white to-teal-50 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-2xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-600/50">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Category Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Category
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Tag Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Tag
                    </label>
                    <select
                      value={selectedTag}
                      onChange={(e) => setSelectedTag(e.target.value)}
                      className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {tags.map((tag) => (
                        <option key={tag} value={tag}>
                          {tag}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Sort Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Sort By
                    </label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="latest">Latest</option>
                      <option value="popular">Most Popular</option>
                      <option value="trending">Trending</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* View Controls */}
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Showing {sortedBlogs.length} of {blogs.length} blogs
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
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section id="blog-section" className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {sortedBlogs.length > 0 ? (
            <div
              className={`${
                viewMode === "grid"
                  ? "grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                  : "space-y-8"
              }`}
            >
              {sortedBlogs.map((blog) => (
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
      </section>
    </div>
  );
};
