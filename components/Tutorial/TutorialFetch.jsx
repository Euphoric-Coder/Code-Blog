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
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import TutorialBookmark from "./TutorialBookmarkButton";
import TutorialLike from "./TutorialLikeButton";

export const TutorialFetch = ({ tutorials }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [individualTutorial, setIndividualTutorial] = useState(null);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [likesMap, setLikesMap] = useState(() => {
    return Object.fromEntries(tutorials.map((t) => [t.id, t.likes ?? 0]));
  });
  const [bookmarkedMap, setBookmarkedMap] = useState({});
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
  const selectedLevelCount = tempFilters.level ? tempFilters.level.length : 0;
  const tutorialAuthors = [...new Set(tutorials.map((blog) => blog.author))];
  const [appliedFilters, setAppliedFilters] = useState({ ...tempFilters });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Check if there is text in the search bar
  const isSearchActive = searchTerm !== "";

  const fetchIndividualTutorial = (id) => {
    return tutorials.find((tutorial) => tutorial.id === id);
  };

  const handleBookmarkChange = (tutorialId, bookmarked) => {
    setBookmarkedMap((prev) => ({ ...prev, [tutorialId]: bookmarked }));
  };

  const handleLikeChange = (blogId, total, liked) => {
    setLikesMap((prev) => ({ ...prev, [blogId]: total }));
  };

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
    count += tempFilters.level.length;
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

      const matchesLevel =
        filtersToApply.level.length === 0 ||
        filtersToApply.level.includes(bg.level.toLowerCase());

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
        matchesLevel &&
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

      const matchesLevel =
        tempFilters.level.length === 0 ||
        tempFilters.level.includes(bg.level.toLowerCase());

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
        matchesLevel &&
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
                {tutorial.level && (
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${getLevelColor(tutorial.level)}`}
                  >
                    {tutorial.level}
                  </span>
                )}
                {tutorial.featured && (
                  <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-semibold rounded-full shadow-lg">
                    Featured
                  </span>
                )}
                {tutorial.trending && (
                  <span className="flex items-center px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-semibold rounded-full shadow-lg">
                    <TrendingUp className="h-4 w-4 mr-1" /> Trending
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

                <Link href={`/tutorialpost/${tutorial.id}`}>
                  <button className="group/btn inline-flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-semibold transition-colors">
                    View Tutorial
                    <ArrowRight className="ml-1 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </Link>
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
            {tutorial.level && (
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${getLevelColor(tutorial.level)}`}
              >
                {tutorial.level}
              </span>
            )}
            {tutorial.featured && (
              <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-semibold rounded-full shadow-lg">
                Featured
              </span>
            )}
            {tutorial.trending && (
              <span className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-semibold rounded-full shadow-lg">
                <TrendingUp className="h-4 w-4" /> Trending
              </span>
            )}
          </div>

          <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <TutorialBookmark
              tutorialId={tutorial.id}
              onChange={handleBookmarkChange}
              showIconOnly={true}
            />
            <TutorialLike
              tutorialId={tutorial.id}
              initialLikes={likesMap[tutorial.id] ?? blog.likes ?? 0}
              onChange={handleLikeChange}
              showIconOnly={true}
            />
            {tutorial.featured && (
              <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-semibold rounded-full shadow-lg">
                Featured
              </span>
            )}
            {tutorial.trending && (
              <span className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-semibold rounded-full shadow-lg">
                <TrendingUp className="h-4 w-4" /> Trending
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

          {/* Tutorial Quick Actions */}
          <div className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-200">
            <div className="flex gap-1">
              <TutorialBookmark
                tutorialId={tutorial.id}
                onChange={handleBookmarkChange}
              />
              <TutorialLike
                tutorialId={tutorial.id}
                initialLikes={likesMap[tutorial.id] ?? blog.likes ?? 0}
                onChange={handleLikeChange}
              />
            </div>
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

            <Link href={`/tutorialpost/${tutorial.id}`}>
              <button className="group/btn inline-flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-semibold transition-colors">
                View Tutorial
                <ArrowRight className="ml-1 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </div>
      </article>
    );
  };

  return (
    <div>
      {/* Search and Filter Section */}
      {/* Search Bar & Filter Button for Non-Mobile Devices */}
      <div className="hidden md:flex justify-center mb-16 gap-4 items-center pt-3 px-6">
        <div className="relative max-w-4xl w-full mx-auto">
          <div className="relative bg-gradient-to-r from-blue-50 via-white to-teal-50 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-3xl shadow-lg border border-blue-500 dark:border-gray-300">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 sm:gap-x-4 sm:gap-y-0">
              <div className="flex items-center justify-center w-12 h-12 text-gray-400">
                <Search className="h-5 w-5" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search tutorials by title, content, or tags..."
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
                  blogCategories={tutorialCategories}
                  blogSubCategoriesList={subCategoryList}
                  tutorialAuthors={tutorialAuthors}
                  filterCount={filterCount}
                  selectedCategoryCount={selectedCategoryCount}
                  selectedSubCategoryCount={selectedSubCategoryCount}
                  selectedAuthorCount={selectedAuthorCount}
                  selectedLevelCount={selectedLevelCount}
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
          blogCategories={tutorialCategories}
          blogSubCategoriesList={subCategoryList}
          tutorialAuthors={tutorialAuthors}
          filterCount={filterCount}
          selectedCategoryCount={selectedCategoryCount}
          selectedSubCategoryCount={selectedSubCategoryCount}
          selectedAuthorCount={selectedAuthorCount}
          selectedLevelCount={selectedLevelCount}
          hasActiveFilters={hasActiveFilters}
          applyFilters={applyFilters}
          clearFilters={clearFilters}
          resetFilters={resetFilters}
          handleDialogClose={handleDialogClose}
        />
      </div>
      <div className="max-w-screen-3xl flex items-center justify-center md:justify-between mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Showing {displayedTutorial.length} of {tutorials.length} tutorials
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
      {/* Tutorial Grid */}
      <section className="py-12">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8">
          {displayedTutorial.length > 0 ? (
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
