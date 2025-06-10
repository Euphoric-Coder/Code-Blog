"use client";

import React, { useState } from "react";
import { Search, Filter, TrendingUp } from "lucide-react";

export const SearchSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const trendingTopics = [
    "React Hooks",
    "TypeScript",
    "Node.js",
    "Python AI",
    "DevOps",
    "Blockchain",
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            Search for a{" "}
            <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
              Blog
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Find exactly what you're looking for in seconds.
          </p>
        </div>

        {/* Search Container */}
        <div className="relative">
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
                placeholder="Search by title, category, or keyword..."
                className="flex-1 h-12 px-4 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 bg-transparent border-none outline-none text-lg"
              />

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
              <button className="m-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-teal-500 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200">
                Search
              </button>
            </div>

            {/* Filter Dropdown */}
            {isFilterOpen && (
              <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-750">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {["All", "Tutorials", "Guides", "News"].map((filter) => (
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

          {/* Search Suggestions */}
          {searchQuery && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-10">
              <div className="p-4">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  Suggestions
                </div>
                <div className="space-y-2">
                  {trendingTopics
                    .filter((topic) =>
                      topic.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .slice(0, 3)
                    .map((topic) => (
                      <button
                        key={topic}
                        className="block w-full text-left px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        onClick={() => setSearchQuery(topic)}
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
                onClick={() => setSearchQuery(topic)}
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
