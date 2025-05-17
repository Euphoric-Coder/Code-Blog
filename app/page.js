import HomeClient from "@/components/LandingPage/Home";
import { getAllPosts, getallTutorials } from "@/lib/posts";
w
// Server Component
export default async function Home() {
  const blogposts = await getAllPosts(); // Fetch posts server-side
  const tutorialposts = await getallTutorials();

  return <HomeClient initialPosts={blogposts} tutorialPosts={tutorialposts}/>;
}
