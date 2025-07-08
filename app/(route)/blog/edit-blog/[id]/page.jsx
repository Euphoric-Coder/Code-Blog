"use client";

import BlogEditor from "@/components/Blog/BlogEditor";
import { db } from "@/lib/dbConfig";
import { Blogs } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const params = useParams();
  const id = params?.id;
  const [blogData, setBlogData] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchBlog = async () => {
      const result = await db.select().from(Blogs).where(eq(id, Blogs.id));
      console.log(result[0]);
      setBlogData(result[0]);
    };

    fetchBlog();
  }, [id]);

  if (!blogData) return <p className="p-6">Loading blog...</p>;

  return (
    <div>
      <BlogEditor
        initialTitle={blogData.title}
        initialDescription={blogData.description}
        initialCategory={blogData.category}
        initialSubCategories={blogData.subCategories}
        initialContent={blogData.content}
        initialCoverImageURL={blogData.blogImage}
        initialfileId={blogData.blogImageId}
        initialTags={blogData.tags}
        editing
      />
    </div>
  );
};

export default Page;
