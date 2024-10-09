"use server";

import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

// Define the path to your markdown files
const postsDirectory = path.join(process.cwd(), "content");

// Async function to get all posts data from markdown files
export async function getAllPosts() {
  const filenames = await fs.readdir(postsDirectory);

  const posts = await Promise.all(
    filenames.map(async (filename) => {
      const filePath = path.join(postsDirectory, filename);
      const fileContents = await fs.readFile(filePath, "utf8");

      // Use gray-matter to parse the front matter of the markdown file
      const { data } = matter(fileContents);

      return {
        slug: filename.replace(".md", ""), // Use the file name as the slug
        title: data.title,
        description: data.description,
        category: data.category || [],
        feature: data.feature,
        image: data.image,
      };
    })
  );

  return posts;
}
