import React from "react";
import { blogPosts } from "./_utils/data";
import BlogDetail from "./_components/BlogDetails";

const page = () => {
  const blog = blogPosts[1];
  return (
    <div>
      <BlogDetail blogData={blog} />
    </div>
  );
};

export default page;
