import { NextResponse } from "next/server";
import { db } from "@/lib/dbConfig";
import { blogLikes, Blogs } from "@/lib/schema";
import { eq, and } from "drizzle-orm";

export async function POST(req) {
  try {
    const { blogId, email, time } = await req.json();

    const [existingLike] = await db
      .select()
      .from(blogLikes)
      .where(and(eq(blogLikes.blogId, blogId), eq(blogLikes.likedBy, email)));

    const [blog] = await db
      .select({ likes: Blogs.likes })
      .from(Blogs)
      .where(eq(Blogs.id, blogId));

    const currentLikes = blog?.likes ?? 0;

    if (existingLike) {
      // Remove like
      await db
        .delete(blogLikes)
        .where(and(eq(blogLikes.blogId, blogId), eq(blogLikes.likedBy, email)));

      await db
        .update(Blogs)
        .set({ likes: Math.max(0, currentLikes - 1) })
        .where(eq(Blogs.id, blogId));

      return NextResponse.json({ liked: false });
    } else {
      // Add like
      await db.insert(blogLikes).values({
        blogId,
        likedBy: email,
        likedAt: time,
        totalLikes: "1",
      });

      await db
        .update(Blogs)
        .set({ likes: currentLikes + 1 })
        .where(eq(Blogs.id, blogId));

      return NextResponse.json({ liked: true });
    }
  } catch (error) {
    console.error("Error toggling like:", error);
    return NextResponse.json(
      { liked: null, error: "Failed to toggle like" },
      { status: 500 }
    );
  }
}
