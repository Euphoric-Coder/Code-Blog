import React from "react";
import { Hero } from "./_components/Hero";
import { Header } from "./_components/Header";
import { Footer } from "./_components/Footer";
import { SearchSection } from "./_components/SearchSection";
import { FeaturedBlogs } from "./_components/FeaturedBlogs";
import { FeaturedTutorials } from "./_components/FeaturedTutorials";
import { TopCodeSnippets } from "./_components/TopCodeSnippets";

const page = () => {
  return (
    <div>
      <Header />
      <Hero />
      <SearchSection />
      <FeaturedBlogs />
      <FeaturedTutorials />
      <TopCodeSnippets />
      <Footer />
    </div>
  );
};

export default page;
