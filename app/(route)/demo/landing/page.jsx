"use client";

import React from "react";
import { Hero } from "./_components/Hero";
import { SearchSection } from "./_components/SearchSection";
import { FeaturedBlogs } from "./_components/FeaturedBlogs";
import { FeaturedTutorials } from "./_components/FeaturedTutorials";
import { TopCodeSnippets } from "./_components/TopCodeSnippets";

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
