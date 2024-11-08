import path from "path";
import fs from "fs";
import matter from "gray-matter";
import React from "react";
import BlogClient from "./TutorialClient";

// This is a server-side component that fetches the blog data.
export default async function Blog() {
  // Fetch the content from the "content" directory on the server-side
  const dirPath = path.join(process.cwd(), "tutorial");
  const dirContent = fs.readdirSync(dirPath, "utf-8");

  // Parse each markdown file and extract the front matter (metadata)
  const tutorial = dirContent.map((file) => {
    const filePath = path.join(dirPath, file);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContent);
    return data;
  });

  // Pass the fetched data as props to the Client Component
  return <BlogClient blogs={tutorial} />;
}
