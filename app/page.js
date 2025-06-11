"use client";

import React from "react";
import { FeaturedBlogs } from "@/components/HomePage/FeaturedBlogs";
import { FeaturedTutorials } from "@/components/HomePage/FeaturedTutorials";
import { Hero } from "@/components/HomePage/Hero";
import { SearchSection } from "@/components/HomePage/SearchSection";
import { TopCodeSnippets } from "@/components/HomePage/TopCodeSnippets";

const page = () => {
  return (
    <main>
      <Hero />
      <SearchSection />
      <FeaturedBlogs />
      <FeaturedTutorials />
      <TopCodeSnippets />
    </main>
  );
};

export default page;
