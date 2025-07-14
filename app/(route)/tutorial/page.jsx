"use client";

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
  Eye,
  Heart,
  Bookmark,
  Share2,
  Play,
  BookOpen,
  Star,
  Award,
  CheckCircle,
} from "lucide-react";
import Image from "next/image";

const page = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [sortBy, setSortBy] = useState("latest");
  const [viewMode, setViewMode] = useState("grid");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

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
  const levels = ["All", "Beginner", "Intermediate", "Advanced"];

  const tutorials = [
    {
      id: 1,
      title: "Complete React Hooks Masterclass",
      description:
        "Master React Hooks from basics to advanced patterns with real-world examples and best practices.",
      category: "Web Development",
      tags: ["React", "Hooks", "Frontend"],
      author: "Sarah Chen",
      publishDate: "2024-04-17",
      duration: "4.5 hours",
      lessons: 24,
      level: "Intermediate",
      image:
        "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800",
      views: 12500,
      likes: 890,
      rating: 4.9,
      students: 8900,
      featured: true,
      trending: true,
    },
    {
      id: 2,
      title: "Node.js Backend Development",
      description:
        "Build scalable backend applications with Node.js, Express, and MongoDB from scratch.",
      category: "Web Development",
      tags: ["Node.js", "Express", "MongoDB"],
      author: "Mike Rodriguez",
      publishDate: "2024-04-15",
      duration: "6 hours",
      lessons: 32,
      level: "Beginner",
      image:
        "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800",
      views: 18900,
      likes: 1250,
      rating: 4.8,
      students: 15600,
      featured: true,
      trending: true,
    },
    {
      id: 3,
      title: "Python Data Science Bootcamp",
      description:
        "Learn data analysis, visualization, and machine learning with Python, Pandas, and Scikit-learn.",
      category: "Data Science",
      tags: ["Python", "Data Science", "ML"],
      author: "Dr. Emily Watson",
      publishDate: "2024-04-14",
      duration: "8 hours",
      lessons: 45,
      level: "Intermediate",
      image:
        "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=800",
      views: 9800,
      likes: 720,
      rating: 4.9,
      students: 12300,
      featured: false,
      trending: true,
    },
    {
      id: 4,
      title: "DevOps with Docker & Kubernetes",
      description:
        "Master containerization and orchestration with Docker and Kubernetes for modern deployments.",
      category: "DevOps",
      tags: ["Docker", "Kubernetes", "DevOps"],
      author: "Alex Thompson",
      publishDate: "2024-04-12",
      duration: "5.5 hours",
      lessons: 28,
      level: "Advanced",
      image:
        "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=800",
      views: 7600,
      likes: 540,
      rating: 4.7,
      students: 6800,
      featured: false,
      trending: false,
    },
    {
      id: 5,
      title: "Machine Learning Fundamentals",
      description:
        "Introduction to machine learning concepts, algorithms, and practical implementation with Python.",
      category: "AI/ML",
      tags: ["Machine Learning", "Python", "AI"],
      author: "Dr. James Liu",
      publishDate: "2024-04-10",
      duration: "7 hours",
      lessons: 38,
      level: "Beginner",
      image:
        "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800",
      views: 11200,
      likes: 890,
      rating: 4.8,
      students: 9500,
      featured: false,
      trending: true,
    },
    {
      id: 6,
      title: "React Native Mobile Development",
      description:
        "Build cross-platform mobile apps with React Native, from setup to app store deployment.",
      category: "Mobile",
      tags: ["React Native", "Mobile", "JavaScript"],
      author: "Lisa Park",
      publishDate: "2024-04-08",
      duration: "6.5 hours",
      lessons: 35,
      level: "Intermediate",
      image:
        "https://images.pexels.com/photos/943096/pexels-photo-943096.jpeg?auto=compress&cs=tinysrgb&w=800",
      views: 8900,
      likes: 650,
      rating: 4.6,
      students: 7200,
      featured: false,
      trending: false,
    },
  ];

  const filteredTutorials = tutorials.filter((tutorial) => {
    const matchesSearch =
      tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutorial.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutorial.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesCategory =
      selectedCategory === "All" || tutorial.category === selectedCategory;
    const matchesLevel =
      selectedLevel === "All" || tutorial.level === selectedLevel;

    return matchesSearch && matchesCategory && matchesLevel;
  });

  const sortedTutorials = [...filteredTutorials].sort((a, b) => {
    switch (sortBy) {
      case "latest":
        return (
          new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
        );
      case "popular":
        return b.students - a.students;
      case "rating":
        return b.rating - a.rating;
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

  const getLevelColor = (level) => {
    switch (level) {
      case "Beginner":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300";
      case "Advanced":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };

  const TutorialCard = ({ tutorial, isListView = false }) => {
    if (isListView) {
      return (
        <article className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 hover:-translate-y-1">
          {/* Enhanced gradient background overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-100/70 via-white/85 to-pink-100/70 dark:from-gray-800/95 dark:via-gray-700/90 dark:to-gray-800/95"></div>

          <div className="relative flex flex-col md:flex-row">
            {/* Image */}
            <div className="relative md:w-80 h-48 md:h-auto overflow-hidden">
              <img
                src={tutorial.image}
                alt={tutorial.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                {tutorial.featured && (
                  <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-semibold rounded-full shadow-lg">
                    Featured
                  </span>
                )}
                {tutorial.trending && (
                  <span className="px-3 py-1 bg-gradient-to-r from-red-400 to-pink-500 text-white text-xs font-semibold rounded-full flex items-center shadow-lg">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Trending
                  </span>
                )}
              </div>

              {/* Level Badge */}
              <div className="absolute top-4 right-4">
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${getLevelColor(tutorial.level)}`}
                >
                  {tutorial.level}
                </span>
              </div>

              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Play className="h-8 w-8 text-white ml-1" />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-6 flex flex-col justify-between relative">
              <div className="space-y-4">
                {/* Category */}
                <span className="inline-block px-3 py-1 bg-gradient-to-r from-purple-200 to-purple-300 dark:from-purple-800/60 dark:to-purple-700/60 text-purple-800 dark:text-purple-200 text-sm font-semibold rounded-full shadow-sm">
                  {tutorial.category}
                </span>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2 drop-shadow-sm">
                  {tutorial.title}
                </h3>

                {/* Description */}
                <p className="text-gray-700 dark:text-gray-200 leading-relaxed line-clamp-3 drop-shadow-sm font-medium">
                  {tutorial.description}
                </p>

                {/* Tutorial Stats */}
                <div className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-200">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{tutorial.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <BookOpen className="h-4 w-4" />
                      <span>{tutorial.lessons} lessons</span>
                    </div>
                  </div>
                </div>

                {/* Rating and Students */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {tutorial.rating}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      ({tutorial.students.toLocaleString()})
                    </span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {tutorial.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-600/60 dark:to-gray-500/60 text-gray-800 dark:text-gray-100 text-xs rounded-md shadow-sm font-medium"
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
                    <span className="font-semibold">{tutorial.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(tutorial.publishDate)}</span>
                  </div>
                </div>

                <button className="group/btn inline-flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-semibold transition-colors">
                  Start Tutorial
                  <ArrowRight className="ml-1 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </article>
      );
    }

    return (
      <article className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 hover:-translate-y-2">
        {/* Enhanced gradient background overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100/70 via-white/85 to-pink-100/70 dark:from-gray-800/95 dark:via-gray-700/90 dark:to-gray-800/95"></div>

        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={tutorial.image}
            alt={tutorial.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            {tutorial.featured && (
              <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-semibold rounded-full shadow-lg">
                Featured
              </span>
            )}
            {tutorial.trending && (
              <span className="px-3 py-1 bg-gradient-to-r from-red-400 to-pink-500 text-white text-xs font-semibold rounded-full flex items-center shadow-lg">
                <TrendingUp className="h-3 w-3 mr-1" />
                Trending
              </span>
            )}
          </div>

          {/* Level Badge */}
          <div className="absolute top-4 right-4">
            <span
              className={`px-2 py-1 text-xs font-medium rounded-full ${getLevelColor(tutorial.level)}`}
            >
              {tutorial.level}
            </span>
          </div>

          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Play className="h-8 w-8 text-white ml-1" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative p-6 space-y-4">
          {/* Category */}
          <span className="inline-block px-3 py-1 bg-gradient-to-r from-purple-200 to-purple-300 dark:from-purple-800/60 dark:to-purple-700/60 text-purple-800 dark:text-purple-200 text-sm font-semibold rounded-full shadow-sm">
            {tutorial.category}
          </span>

          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2 drop-shadow-sm">
            {tutorial.title}
          </h3>

          {/* Description */}
          <p className="text-gray-700 dark:text-gray-200 leading-relaxed line-clamp-3 drop-shadow-sm font-medium">
            {tutorial.description}
          </p>

          {/* Tutorial Stats */}
          <div className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-200">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{tutorial.duration}</span>
              </div>
              <div className="flex items-center space-x-1">
                <BookOpen className="h-4 w-4" />
                <span>{tutorial.lessons} lessons</span>
              </div>
            </div>
          </div>

          {/* Rating and Students */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {tutorial.rating}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                ({tutorial.students.toLocaleString()})
              </span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {tutorial.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-600/60 dark:to-gray-500/60 text-gray-800 dark:text-gray-100 text-xs rounded-md shadow-sm font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-300/50 dark:border-gray-500/50">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-gray-600 dark:text-gray-300" />
              <span className="text-sm text-gray-700 dark:text-gray-200 font-semibold">
                {tutorial.author}
              </span>
              <span className="text-gray-400 dark:text-gray-500">•</span>
              <span className="text-sm text-gray-700 dark:text-gray-200">
                {formatDate(tutorial.publishDate)}
              </span>
            </div>

            <button className="group/btn inline-flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-semibold transition-colors">
              Start Tutorial
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
      <section className="py-20 bg-gradient-to-b from-blue-100 via-blue-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800">
              <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between">
                {/* Main Text Section */}
                <div className="lg:w-3/5 text-center lg:text-left mb-12 lg:mb-0">
                  <h1 className="text-5xl sm:text-6xl lg:text-6xl xl:text-7xl font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-500 to-teal-400 dark:from-teal-300 dark:via-blue-400 dark:to-indigo-500 mb-6 drop-shadow-md">
                    Master Coding with Expert Tutorials
                  </h1>
                  <p className="text-lg sm:text-xl lg:text-lg xl:text-xl font-mono leading-relaxed mb-8 text-gray-800 font-extrabold dark:text-gray-300 max-w-2xl lg:max-w-full">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 dark:from-gray-200 dark:to-gray-400">
                      Discover comprehensive tutorials on{" "}
                    </span>
                    <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-300 dark:to-blue-400">
                      Programming Languages
                    </span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 dark:from-gray-200 dark:to-gray-400">
                      , from{" "}
                    </span>
                    <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-300 dark:to-pink-400">
                      beginner concepts
                    </span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 dark:from-gray-200 dark:to-gray-400">
                      {" "}
                      to{" "}
                    </span>
                    <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600 dark:from-blue-300 dark:to-teal-400">
                      advanced practices
                    </span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 dark:from-gray-200 dark:to-gray-400">
                      . Enhance your skills with{" "}
                    </span>
                    <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-teal-600 dark:from-indigo-300 dark:to-teal-400">
                      real-world coding examples
                    </span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 dark:from-gray-200 dark:to-gray-400">
                      {" "}
                      and elevate your programming journey.
                    </span>
                  </p>
                  <div className="mt-10 flex justify-center lg:justify-start gap-4">
                    <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-medium rounded-full shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-300 ease-out dark:from-teal-400 dark:to-blue-500">
                      Start Learning
                    </button>
                    <button className="px-6 py-3 bg-gray-200 text-gray-800 font-medium rounded-full shadow-lg hover:scale-105 hover:bg-gray-300 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-700 transition-transform duration-300 ease-out">
                      Browse Tutorials
                    </button>
                  </div>
                </div>
      
                {/* Illustration Section */}
                <div className="lg:w-2/5 flex justify-center items-center">
                  <Image
                    src="/tutorial-page.jpeg"
                    alt="Coding Tutorial Illustration"
                    width={400}
                    height={400}
                    className="w-full h-auto max-w-sm drop-shadow-lg rounded-lg transform hover:scale-105 transition-transform duration-500 ease-in-out"
                  />
                </div>
              </div>
            </section>
      
            <section className="pb-10">
              <div className="container mx-auto text-center">
                {/* Main Heading */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 dark:from-purple-400 dark:via-pink-500 dark:to-yellow-400 mb-4 p-2">
                  Your Gateway to Programming Excellence
                </h1>
      
                {/* Subheading with tagline */}
                <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500 dark:from-yellow-500 dark:to-purple-400 mb-6">
                  Tutorials Tailored for Coders of All Levels
                </p>
      
                {/* Additional description */}
                <p className="text-md sm:text-lg md:text-xl font-mono font-extrabold text-center text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
                  Whether you&apos;re just starting with coding or honing advanced
                  skills, our tutorials cover essential topics. Dive into{" "}
                  <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-300 dark:to-blue-400">
                    Data Structures & Algorithms
                  </span>
                  , build{" "}
                  <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-300 dark:to-pink-400">
                    full stack projects
                  </span>
                  , and master modern{" "}
                  <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600 dark:from-blue-300 dark:to-teal-400">
                    software development
                  </span>
                  . Boost your skills and stay ready for{" "}
                  <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-teal-600 dark:from-indigo-300 dark:to-teal-400">
                    real-world coding examples
                  </span>
                </p>
              </div>
            </section>

      {/* Search and Filter Section */}
      <section className="py-12 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <div className="relative bg-gradient-to-r from-purple-50 via-white to-pink-50 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-600/50">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-12 h-12 text-gray-400">
                    <Search className="h-5 w-5" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search tutorials by title, technology, or skill level..."
                    className="flex-1 h-12 px-4 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 bg-transparent border-none outline-none"
                  />
                  <button
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className={`flex items-center justify-center w-12 h-12 transition-colors ${
                      isFilterOpen
                        ? "text-purple-600 dark:text-purple-400"
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
              <div className="bg-gradient-to-r from-purple-50 via-white to-pink-50 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-2xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-600/50">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {/* Category Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Category
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Level Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Level
                    </label>
                    <select
                      value={selectedLevel}
                      onChange={(e) => setSelectedLevel(e.target.value)}
                      className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      {levels.map((level) => (
                        <option key={level} value={level}>
                          {level}
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
                      className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="latest">Latest</option>
                      <option value="popular">Most Popular</option>
                      <option value="rating">Highest Rated</option>
                      <option value="trending">Trending</option>
                    </select>
                  </div>

                  {/* View Mode */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      View
                    </label>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setViewMode("grid")}
                        className={`p-2 rounded-lg transition-colors ${
                          viewMode === "grid"
                            ? "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                            : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        }`}
                      >
                        <Grid className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => setViewMode("list")}
                        className={`p-2 rounded-lg transition-colors ${
                          viewMode === "list"
                            ? "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                            : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        }`}
                      >
                        <List className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Results Count */}
            <div className="text-center">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Showing {sortedTutorials.length} of {tutorials.length} tutorials
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tutorial Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {sortedTutorials.length > 0 ? (
            <div
              className={`${
                viewMode === "grid"
                  ? "grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                  : "space-y-8"
              }`}
            >
              {sortedTutorials.map((tutorial) => (
                <TutorialCard
                  key={tutorial.id}
                  tutorial={tutorial}
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
                No tutorials found
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
}

export default page
