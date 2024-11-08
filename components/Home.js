"use client";

import { useState, useEffect } from "react";
import HeroSection from "./HeroSection";
import SearchSection from "./SearchSection";
import FeaturedBlogsSection from "./FeaturedBlogsSection";
import { useTheme } from "next-themes";
import FeaturedTutorialSection from "./FeaturedTutorialsSection";

export default function HomeClient({ initialPosts, tutorialPosts }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [featuredTutorials, setFeaturedTutorials] = useState([]);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Set mounted to true when component is mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  // Filter posts based on search term
  useEffect(() => {
    if (searchTerm) {
      const filtered = initialPosts.filter((post) => {
        const title = post.title?.toLowerCase() || "";
        const description = post.description?.toLowerCase() || "";
        const category = post.category || [];

        return (
          title.includes(searchTerm.toLowerCase()) ||
          description.includes(searchTerm.toLowerCase()) ||
          category.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          )
        );
      });
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts([]);
    }
  }, [searchTerm, initialPosts]);

  // Filter posts with the 'feature' tag set to true
  useEffect(() => {
    const featured = initialPosts.filter((post) => post.feature === true);
    setFeaturedPosts(featured);
  }, [initialPosts]);

  // Filter tutorial posts with the 'feature' tag set to true
  useEffect(() => {
    const featured = tutorialPosts.filter((post) => post.feature === true);
    setFeaturedTutorials(featured);
  }, [tutorialPosts]);

  // Return null if not mounted to avoid hydration errors
  if (!mounted) return null;

  return (
    <main className="relative w-full min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-blue-950 text-gray-900 dark:text-gray-100 transition-all duration-700 overflow-hidden">
      {/* Floating Pulsing Circles for Light Theme */}
      {theme === "light" && (
        <>
          <div className="absolute top-10 left-10 w-40 h-40 bg-gradient-to-br from-purple-300 via-pink-400 to-yellow-400 rounded-full filter blur-3xl opacity-50 animate-pulse-fast"></div>
          <div className="absolute bottom-16 right-16 w-52 h-52 bg-gradient-to-br from-blue-300 via-teal-300 to-green-300 rounded-full filter blur-3xl opacity-50 animate-pulse-slow"></div>
          <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-300 rounded-full filter blur-2xl opacity-40 animate-pulse-fast"></div>
        </>
      )}

      {/* Floating Pulsing Circles for Dark Theme */}
      {theme === "dark" && (
        <>
          <div className="absolute top-12 left-12 w-40 h-40 bg-gradient-to-br from-indigo-800 via-blue-900 to-teal-800 rounded-full filter blur-3xl opacity-40 dark:animate-pulse-slow"></div>
          <div className="absolute bottom-16 right-16 w-52 h-52 bg-gradient-to-br from-blue-900 via-teal-800 to-indigo-900 rounded-full filter blur-3xl opacity-30 dark:animate-pulse-slow"></div>
          <div className="absolute top-1/2 left-1/3 w-36 h-36 bg-gradient-to-br from-teal-900 via-blue-900 to-indigo-900 rounded-full filter blur-2xl opacity-40 dark:animate-pulse-fast"></div>
        </>
      )}

      {/* Hero Section */}
      <HeroSection />

      {/* Search Section */}
      <SearchSection
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filteredPosts={filteredPosts}
      />

      {/* Featured Blogs Section */}
      <FeaturedBlogsSection featuredPosts={featuredPosts} />

      <FeaturedTutorialSection featuredPosts={featuredTutorials}/>
    </main>
  );
}
