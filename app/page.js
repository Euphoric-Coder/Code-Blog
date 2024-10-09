import { getAllPosts } from "@/lib/posts";
import HomeClient from "@/components/Home";

// Server Component
export default async function Home() {
  const posts = await getAllPosts(); // Fetch posts server-side

  return <HomeClient initialPosts={posts} />;
}
