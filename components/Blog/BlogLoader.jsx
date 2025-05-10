import React from "react";

const BlogLoader = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 animate-pulse">
      {/* Hero Section Skeleton */}
      <div className="relative h-[60vh] bg-gray-200 dark:bg-gray-800">
        <div className="absolute inset-0 flex flex-col justify-center items-center px-4 space-y-4">
          <div className="w-24 h-8 bg-gray-300 dark:bg-gray-700 rounded-full" />
          <div className="w-3/4 max-w-3xl h-12 bg-gray-300 dark:bg-gray-700 rounded-lg" />
          <div className="w-2/3 max-w-2xl h-8 bg-gray-300 dark:bg-gray-700 rounded-lg" />
          <div className="flex items-center space-x-8 mt-8">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full" />
              <div className="w-32 h-4 bg-gray-300 dark:bg-gray-700 rounded" />
            </div>
            <div className="w-24 h-4 bg-gray-300 dark:bg-gray-700 rounded" />
            <div className="w-32 h-4 bg-gray-300 dark:bg-gray-700 rounded" />
          </div>
        </div>
      </div>

      {/* Content Section Skeleton */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Social Buttons */}
          <div className="flex justify-between items-center pb-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex space-x-4">
              <div className="w-20 h-8 bg-gray-200 dark:bg-gray-800 rounded" />
              <div className="w-20 h-8 bg-gray-200 dark:bg-gray-800 rounded" />
            </div>
            <div className="w-20 h-8 bg-gray-200 dark:bg-gray-800 rounded" />
          </div>

          {/* Content Paragraphs */}
          <div className="space-y-4">
            <div className="w-full h-6 bg-gray-200 dark:bg-gray-800 rounded" />
            <div className="w-5/6 h-6 bg-gray-200 dark:bg-gray-800 rounded" />
            <div className="w-full h-6 bg-gray-200 dark:bg-gray-800 rounded" />
            <div className="w-4/6 h-6 bg-gray-200 dark:bg-gray-800 rounded" />
          </div>

          {/* Code Block Skeleton */}
          <div className="my-8 p-6 bg-gray-200 dark:bg-gray-800 rounded-xl">
            <div className="space-y-3">
              <div className="w-full h-4 bg-gray-300 dark:bg-gray-700 rounded" />
              <div className="w-5/6 h-4 bg-gray-300 dark:bg-gray-700 rounded" />
              <div className="w-4/6 h-4 bg-gray-300 dark:bg-gray-700 rounded" />
            </div>
          </div>

          {/* More Paragraphs */}
          <div className="space-y-4">
            <div className="w-full h-6 bg-gray-200 dark:bg-gray-800 rounded" />
            <div className="w-5/6 h-6 bg-gray-200 dark:bg-gray-800 rounded" />
            <div className="w-full h-6 bg-gray-200 dark:bg-gray-800 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogLoader;
