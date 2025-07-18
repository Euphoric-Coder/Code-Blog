import React, { useMemo, useState } from "react";
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
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { tutorialCategories, tutorialSubCategoriesList } from "@/lib/data";
import { toast } from "sonner";
import FilterButton from "./FilterButton";

export const TutorialFetch = ({ tutorials }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [sortBy, setSortBy] = useState("latest");
  const [viewMode, setViewMode] = useState("grid");
  const [tempFilters, setTempFilters] = useState({
    authors: [],
    category: [],
    level: [],
    subCategories: [],
    dateRange: { from: "", to: "" },
    oldestTutorial: false,
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
  const blogAuthors = [...new Set(tutorials.map((blog) => blog.author))];
  const [appliedFilters, setAppliedFilters] = useState({ ...tempFilters });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Check if there is text in the search bar
  const isSearchActive = searchTerm !== "";

  const convertToTutorialSubCategoriesList = (input) => {
    const result = {};
    for (const [category, subCategories] of Object.entries(input)) {
      const key = category.toLowerCase(); // optionally format the key
      result[key] = subCategories.map((sub) => sub.label);
    }
    return result;
  };

  const filterCount = useMemo(() => {
    let count = 0;
    count += tempFilters.authors.length;
    count += tempFilters.category.length;
    count += tempFilters.subCategories.length;
    if (tempFilters.dateRange.from) count += 1;
    if (tempFilters.dateRange.to) count += 1;
    if (tempFilters.oldestTutorial) count += 1;
    return count;
  }, [tempFilters]);

  const filteredBlogs = useMemo(() => {
    let filters = tutorials.filter((bg) => {
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
    // If oldestTutorial is true, reverse the filtered list
    if (appliedFilters.oldestTutorial) {
      filters = [...filters].reverse(); // clone before reverse to avoid mutating original array
    }
    return filters;
  }, [searchTerm, appliedFilters, tutorials]);

  const subCategoryList = convertToTutorialSubCategoriesList(
    tutorialSubCategoriesList
  );

  const previewedBlogs = useMemo(() => {
    let filtered = tutorials.filter((bg) => {
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
    // If oldestTutorial is true, reverse the filtered list
    if (tempFilters.oldestTutorial) {
      filtered = [...filtered].reverse(); // clone before reverse to avoid mutating original array
    }

    return filtered;
  }, [tempFilters, tutorials]);

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
      level: [],
      subCategories: [],
      dateRange: { from: "", to: "" },
      oldestTutorial: false,
    });
    setTempFilters({
      authors: [],
      category: [],
      level: [],
      subCategories: [],
      dateRange: { from: "", to: "" },
      oldestTutorial: false,
    });

    toast.success("Filters have been successfully reset to default!");
  };

  const handleDialogClose = (isOpen) => {
    if (!isOpen) {
      setTempFilters({ ...appliedFilters }); // Reset temp filters to applied filters when dialog is closed
    }
    setIsDialogOpen(isOpen); // Track dialog state
  };

  const displayedTutorial = isDialogOpen ? previewedBlogs : filteredBlogs;

  const hasActiveFilters =
    appliedFilters.authors.length > 0 ||
    appliedFilters.category.length > 0 ||
    (appliedFilters.dateRange.from &&
      appliedFilters.dateRange.from.trim() !== "") ||
    (appliedFilters.dateRange.to &&
      appliedFilters.dateRange.to.trim() !== "") ||
    appliedFilters.oldestTutorial;

  const [expandedSections, setExpandedSections] = useState({});

  const categories = [
    "All",
    "Programming",
    "Web Development",
    "AI/ML",
    "DevOps",
    "Mobile",
    "Data Science",
    "Blockchain",
    "Cloud Computing",
  ];
  const levels = ["All", "Beginner", "Intermediate", "Advanced"];

  // const tutorials = [
  //   {
  //     id: "e7db08b7-7339-4d10-a472-fd782d98fb6f",
  //     title: "Beginner's Guide to APIs (Application Programming Interfaces)",
  //     coverImage: null,
  //     imageId: null,
  //     description:
  //       "APIs power nearly every digital experience — from social media apps and e-commerce platforms to weather dashboards and payment gateways. This guide offers an in-depth introduction to APIs, how they work, their types, practical use cases, data formats, and authentication strategies.",
  //     category: "Programming",
  //     subCategories: [
  //       "javascript",
  //       "python",
  //       "java",
  //       "c-cpp",
  //       "ruby",
  //       "php",
  //       "go",
  //       "RESTAPIs",
  //       "API",
  //     ],
  //     tags: ["api", "restfull api", "new age tech"],
  //     content: [
  //       {
  //         id: "c1aa6ac4-b8d1-4183-b8b0-7c429370660f",
  //         title: "What is an API",
  //         subsections: [
  //           {
  //             id: "0737d004-93b9-4505-999e-281995f9e8d7",
  //             title: "API in Simple Terms",
  //             content:
  //               "<p>An&nbsp;<strong>API</strong>&nbsp;is a&nbsp;<strong>set of rules</strong>&nbsp;that allows one software program to interact with another. It defines&nbsp;<strong>how requests should be made</strong>,&nbsp;<strong>what data is required</strong>, and&nbsp;<strong>what format responses should be in</strong>.</p><ul><li><p>You don't need to know how a server is built, just like you don't need to know how a car engine works to drive. Similarly, an API hides the internal details and gives you just the controls you need.</p></li></ul><blockquote><p><strong>Analogy:</strong>&nbsp;Think of an API like a&nbsp;<strong>restaurant menu</strong>. The menu lists items you can order, along with a description. When you specify what you want, the kitchen (backend system) prepares it and returns it. The waiter (API) is the intermediary.</p></blockquote>",
  //             usedMarkdown: false,
  //           },
  //           {
  //             id: "fbdcfed8-718f-4f75-b6ca-2907aaf8b460",
  //             title: "What APIs Are NOT",
  //             content:
  //               "<ul><li><p>APIs are&nbsp;<strong>not the database</strong>, but they&nbsp;<strong>communicate with it</strong>.</p></li><li><p>APIs are&nbsp;<strong>not the frontend</strong>, but they&nbsp;<strong>feed it data</strong>.</p></li><li><p>APIs are&nbsp;<strong>not magic</strong>, but they&nbsp;<strong>abstract complexity</strong>.</p></li></ul>",
  //             usedMarkdown: false,
  //           },
  //         ],
  //       },
  //       {
  //         id: "77b9b9fa-e954-4026-bdea-b57288172aa9",
  //         title: "Why Are APIs So Important?",
  //         subsections: [
  //           {
  //             id: "9e827208-d5cf-4460-af3d-0cc33eba8d71",
  //             title: "The Request-Response Cycle",
  //             content:
  //               '<ol><li><p><strong>Client</strong>&nbsp;makes a request (e.g., your app asks for weather in Mumbai).</p></li><li><p><strong>Server/API</strong>&nbsp;processes the request.</p></li><li><p><strong>Response</strong>&nbsp;is sent back (e.g., temperature is 32°C, status is "Sunny").</p></li></ol><p><strong>Data Format:</strong>&nbsp;Most APIs respond with data in JSON format.<br>Example:</p><pre><code class="language-json">{ "city": "Mumbai", "temperature": "32°C", "condition": "Sunny" }</code></pre><p></p>',
  //             usedMarkdown: false,
  //           },
  //           {
  //             id: "fd88403d-4c05-4c07-94ed-a9ef1079b21b",
  //             title: "Real-Life Examples of APIs",
  //             content:
  //               "<ul><li><p>Instagram API: Used to fetch user posts or stories.</p></li><li><p>Spotify API: Fetches user playlists or song data.</p></li><li><p>GitHub API: Retrieves repositories, issues, and commits.</p></li></ul>",
  //             usedMarkdown: false,
  //           },
  //         ],
  //       },
  //       {
  //         id: "16326a51-9c5b-4edc-bb16-b54f9d9239d0",
  //         title: "API Authentication",
  //         subsections: [
  //           {
  //             id: "fc392b1d-b7fd-4dda-84aa-8d68c991f5d8",
  //             title: "API Keys",
  //             content:
  //               "<ul><li><p>A unique identifier used to authenticate a user or app.</p></li><li><p>Common for public APIs like news APIs or movie databases.</p></li></ul><blockquote><p>Example:&nbsp;<code>apiKey=123456abcdef</code></p></blockquote>",
  //             usedMarkdown: false,
  //           },
  //           {
  //             id: "36ad8d50-6727-4aaa-aafe-3f44609923dd",
  //             title: "OAuth",
  //             content:
  //               "<ul><li><p>Used for&nbsp;<strong>secure user-based access</strong>.</p></li><li><p>Common in services like Google, GitHub, Facebook.</p></li><li><p>Requires permission from the user and returns a token for access.</p></li></ul>",
  //             usedMarkdown: false,
  //           },
  //         ],
  //       },
  //       {
  //         id: "6ced8c98-a9a7-4fe6-8d84-70983521e11a",
  //         title: "Types of APIs",
  //         subsections: [
  //           {
  //             id: "60db956c-a788-4155-b678-fbce22a6c630",
  //             title: "Open vs Private APIs",
  //             content:
  //               "<ul><li><p><strong>Open APIs</strong>: Publicly accessible, often with limited usage.</p></li><li><p><strong>Private APIs</strong>: Used within a company or organization.</p></li><li><p><strong>Partner APIs</strong>: Shared with specific business partners.</p></li></ul>",
  //             usedMarkdown: false,
  //           },
  //           {
  //             id: "0634eabe-256d-4182-b41a-935c6da368d8",
  //             title: "REST, SOAP, and GraphQL",
  //             content:
  //               "<ul><li><p><strong>REST (most common)</strong>: Uses HTTP methods like GET, POST.</p></li><li><p><strong>SOAP</strong>: Protocol-heavy, used in legacy systems.</p></li><li><p><strong>GraphQL</strong>: Flexible querying, lets clients ask for only the data they need.</p></li></ul>",
  //             usedMarkdown: false,
  //           },
  //         ],
  //       },
  //       {
  //         id: "f72d79ad-87d0-4f90-ad06-fd98e31290c0",
  //         title: "Common Use Cases of APIs",
  //         subsections: [
  //           {
  //             id: "00a24df0-fc99-424f-98d2-ce03a38bf795",
  //             title: "Social Media Integration",
  //             content:
  //               "<p>Apps fetch user profile photos, names, and posts from platforms like Instagram or LinkedIn using APIs.</p>",
  //             usedMarkdown: false,
  //           },
  //           {
  //             id: "c76d4606-73d8-442a-a626-e2ce6fb5f3cd",
  //             title: "Payments and E-commerce",
  //             content:
  //               "<p>Payment gateways like Razorpay or Stripe offer APIs to handle transactions, refunds, and billing.</p>",
  //             usedMarkdown: false,
  //           },
  //           {
  //             id: "4719756e-c9c5-4a10-8381-22c98b62fd85",
  //             title: "Real-time Data",
  //             content:
  //               "<ul><li><p>Stock market apps (e.g., NSE/BSE APIs)</p></li><li><p>Weather forecasting</p></li><li><p>Live sports scores</p></li></ul><p></p>",
  //             usedMarkdown: false,
  //           },
  //         ],
  //       },
  //     ],
  //     author: "Sagnik Dey",
  //     date: "2025-07-03",
  //     featured: true,
  //     createdBy: "2023ebcs536@online.bits-pilani.ac.in",
  //     views: 12500,
  //     likes: 890,
  //     rating: 4.9,
  //     students: 8900,
  //     level: "Beginner",
  //     duration: "2 hours",
  //     lessons: 15,
  //   },
  //   // Add more sample tutorials with the new structure
  //   {
  //     id: "sample-tutorial-2",
  //     title: "Complete React Hooks Masterclass",
  //     coverImage:
  //       "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800",
  //     imageId: null,
  //     description:
  //       "Master React Hooks from basics to advanced patterns with real-world examples and best practices.",
  //     category: "Web Development",
  //     subCategories: ["React", "JavaScript", "Frontend"],
  //     tags: ["React", "Hooks", "Frontend"],
  //     content: [
  //       {
  //         id: "react-intro",
  //         title: "Introduction to React Hooks",
  //         subsections: [
  //           {
  //             id: "what-are-hooks",
  //             title: "What are React Hooks?",
  //             content:
  //               "<p>React Hooks are functions that let you use state and other React features without writing a class component.</p>",
  //             usedMarkdown: false,
  //           },
  //         ],
  //       },
  //     ],
  //     author: "Sarah Chen",
  //     date: "2024-04-17",
  //     featured: true,
  //     createdBy: "sarah@codeblog.dev",
  //     level: "Intermediate",
  //     duration: "4.5 hours",
  //     lessons: 24,
  //   },
  // ];

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
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case "popular":
        return (b.students || 0) - (a.students || 0);
      case "rating":
        return (b.rating || 0) - (a.rating || 0);
      case "trending":
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
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

  const toggleSection = (tutorialId, sectionId) => {
    const key = `${tutorialId}-${sectionId}`;
    setExpandedSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const renderContent = (content) => {
    return (
      <div
        dangerouslySetInnerHTML={{ __html: content }}
        className="prose prose-sm dark:prose-invert max-w-none"
      />
    );
  };

  const SubcategoryDisplay = ({ subcategories }) => {
    const maxVisible = 3;
    const visibleSubcategories = subcategories.slice(0, maxVisible);
    const remainingCount = subcategories.length - maxVisible;

    return (
      <div className="flex flex-wrap gap-1">
        {visibleSubcategories.map((subcategory) => (
          <span
            key={subcategory}
            className="px-2 py-1 bg-gradient-to-r from-blue-200 to-blue-300 dark:from-blue-800/60 dark:to-blue-700/60 text-blue-800 dark:text-blue-200 text-xs rounded-md shadow-sm font-medium"
          >
            {subcategory}
          </span>
        ))}

        {remainingCount > 0 && (
          <span className="px-2 py-1 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-600/60 dark:to-gray-500/60 text-gray-800 dark:text-gray-100 text-xs rounded-md shadow-sm font-medium">
            +{remainingCount} more
          </span>
        )}
      </div>
    );
  };

  const TutorialCard = ({ tutorial, isListView = false }) => {
    const totalSubsections = tutorial.content.reduce(
      (total, section) => total + section.subsections.length,
      0
    );
    const defaultImage =
      "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800";

    if (isListView) {
      return (
        <article className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 hover:-translate-y-1">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-100/70 via-white/85 to-pink-100/70 dark:from-gray-800/95 dark:via-gray-700/90 dark:to-gray-800/95"></div>

          <div className="relative flex flex-col lg:flex-row">
            {/* Image */}
            <div className="relative lg:w-80 h-48 lg:h-auto overflow-hidden">
              <img
                src={tutorial.coverImage || defaultImage}
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
                {tutorial.level && (
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${getLevelColor(tutorial.level)}`}
                  >
                    {tutorial.level}
                  </span>
                )}
              </div>

              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <BookOpen className="h-8 w-8 text-white" />
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

                {/* Subcategories */}
                <div className="space-y-2">
                  <div className="text-xs font-medium text-gray-600 dark:text-gray-400">
                    Subcategories:
                  </div>
                  <SubcategoryDisplay subcategories={tutorial.subCategories} />
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {tutorial.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gradient-to-r from-teal-200 to-teal-300 dark:from-teal-800/60 dark:to-teal-700/60 text-teal-800 dark:text-teal-200 text-xs rounded-md shadow-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Tutorial Stats */}
                <div className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-200">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{tutorial.duration || "Self-paced"}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <BookOpen className="h-4 w-4" />
                      <span>{tutorial.content.length} sections</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="h-4 w-4" />
                      <span>{totalSubsections} lessons</span>
                    </div>
                  </div>
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
                    <span>{formatDate(tutorial.date)}</span>
                  </div>
                </div>

                <button className="group/btn inline-flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-semibold transition-colors">
                  Start Tutorial
                  <ArrowRight className="ml-1 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          {/* Expandable Content Preview */}
          <div className="relative border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => toggleSection(tutorial.id, "preview")}
              className="w-full px-6 py-3 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            >
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Preview Content ({tutorial.content.length} sections)
              </span>
              <ChevronDown
                className={`h-4 w-4 text-gray-400 transition-transform ${
                  expandedSections[`${tutorial.id}-preview`] ? "rotate-180" : ""
                }`}
              />
            </button>

            {expandedSections[`${tutorial.id}-preview`] && (
              <div className="px-6 pb-4 space-y-3">
                {tutorial.content.map((section, index) => (
                  <div
                    key={section.id}
                    className="border-l-2 border-purple-200 dark:border-purple-800 pl-4"
                  >
                    <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                      {index + 1}. {section.title}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      {section.subsections.length} lesson
                      {section.subsections.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </article>
      );
    }

    return (
      <article className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 hover:-translate-y-2">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100/70 via-white/85 to-pink-100/70 dark:from-gray-800/95 dark:via-gray-700/90 dark:to-gray-800/95"></div>

        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={tutorial.coverImage || defaultImage}
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
            {tutorial.level && (
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${getLevelColor(tutorial.level)}`}
              >
                {tutorial.level}
              </span>
            )}
          </div>

          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <BookOpen className="h-8 w-8 text-white" />
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

          {/* Subcategories */}
          <div className="space-y-2">
            <div className="text-xs font-medium text-gray-600 dark:text-gray-400">
              Subcategories:
            </div>
            <SubcategoryDisplay subcategories={tutorial.subCategories} />
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {tutorial.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-gradient-to-r from-teal-200 to-teal-300 dark:from-teal-800/60 dark:to-teal-700/60 text-teal-800 dark:text-teal-200 text-xs rounded-md shadow-sm font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Tutorial Stats */}
          <div className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-200">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{tutorial.duration || "Self-paced"}</span>
              </div>
              <div className="flex items-center space-x-1">
                <BookOpen className="h-4 w-4" />
                <span>{tutorial.content.length} sections</span>
              </div>
            </div>
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
                {formatDate(tutorial.date)}
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
    <div>
      {/* Search and Filter Section */}
      <section className="py-12 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {/* Search Bar */}
            <FilterButton
              tempFilters={tempFilters}
              setTempFilters={setTempFilters}
              blogCategories={tutorialCategories}
              blogSubCategoriesList={subCategoryList}
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
              {displayedTutorial.map((tutorial) => (
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
};
