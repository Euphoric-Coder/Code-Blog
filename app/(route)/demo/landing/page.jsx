"use client";

import React from "react";
import { useTheme } from "next-themes";
import { Hero } from "./_components/Hero";
import { Header } from "./_components/Header";
import { Footer } from "./_components/Footer";
import { SearchSection } from "./_components/SearchSection";
import { FeaturedBlogs } from "./_components/FeaturedBlogs";
import { FeaturedTutorials } from "./_components/FeaturedTutorials";
import { TopCodeSnippets } from "./_components/TopCodeSnippets";

const page = () => {

  return (
    <main className="relative w-full min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-blue-950 text-gray-900 dark:text-gray-100 transition-all duration-700 overflow-hidden">
      {/* Floating Pulsing Circles for Light Theme */}
      {/* {theme === "light" && (
        <>
          <div className="absolute top-10 left-10 w-40 h-40 bg-gradient-to-br from-purple-300 via-pink-400 to-yellow-400 rounded-full filter blur-3xl opacity-50 animate-pulse-fast"></div>
          <div className="absolute bottom-16 right-16 w-52 h-52 bg-gradient-to-br from-blue-300 via-teal-300 to-green-300 rounded-full filter blur-3xl opacity-50 animate-pulse-slow"></div>
          <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-300 rounded-full filter blur-2xl opacity-40 animate-pulse-fast"></div>
        </>
      )} */}

      <div className="absolute top-10 left-10 w-40 h-40 bg-gradient-to-br from-purple-300 via-pink-400 to-yellow-400 rounded-full filter blur-3xl opacity-50 animate-pulse-fast"></div>
      <div className="absolute bottom-16 right-16 w-52 h-52 bg-gradient-to-br from-blue-300 via-teal-300 to-green-300 rounded-full filter blur-3xl opacity-50 animate-pulse-slow"></div>
      <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-300 rounded-full filter blur-2xl opacity-40 animate-pulse-fast"></div>

      {/* Floating Pulsing Circles for Dark Theme */}
      {/* {theme === "dark" && (
        <>
          <div className="absolute top-12 left-12 w-40 h-40 bg-gradient-to-br from-indigo-800 via-blue-900 to-teal-800 rounded-full filter blur-3xl opacity-40 dark:animate-pulse-slow"></div>
          <div className="absolute bottom-16 right-16 w-52 h-52 bg-gradient-to-br from-blue-900 via-teal-800 to-indigo-900 rounded-full filter blur-3xl opacity-30 dark:animate-pulse-slow"></div>
          <div className="absolute top-1/2 left-1/3 w-36 h-36 bg-gradient-to-br from-teal-900 via-blue-900 to-indigo-900 rounded-full filter blur-2xl opacity-40 dark:animate-pulse-fast"></div>
        </>
      )} */}
      <Hero />
      <SearchSection />
      <FeaturedBlogs />
      <FeaturedTutorials />
      <TopCodeSnippets />
      <Footer />
    </main>
  );
};

export default page;
