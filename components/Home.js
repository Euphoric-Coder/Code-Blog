"use client";

import { useState, useEffect } from "react";
import HeroSection from "./HeroSection";
import SearchSection from "./SearchSection";
import FeaturedBlogsSection from "./FeaturedBlogsSection";

export default function HomeClient({ initialPosts }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [featuredPosts, setFeaturedPosts] = useState([]);

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

  return (
    <main className="w-full min-h-screen bg-gradient-to-b from-blue-100 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-gray-100 transition-all duration-700">
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
    </main>
  );
}
