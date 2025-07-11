import { NextResponse } from "next/server";
import { db } from "@/lib/dbConfig";
import { blogBookmarks } from "@/lib/schema";
import { and, eq } from "drizzle-orm";

export async function POST(req) {
  try {
    const { blogId, email, time } = await req.json();

    const [existingBookmark] = await db
      .select()
      .from(blogBookmarks)
      .where(
        and(
          eq(blogBookmarks.blogId, blogId),
          eq(blogBookmarks.bookmarkedBy, email)
        )
      );

    if (existingBookmark) {
      // Remove bookmark
      await db
        .delete(blogBookmarks)
        .where(
          and(
            eq(blogBookmarks.blogId, blogId),
            eq(blogBookmarks.bookmarkedBy, email)
          )
        );

      return NextResponse.json({ bookmarked: false });
    } else {
      // Add bookmark
      await db.insert(blogBookmarks).values({
        blogId,
        bookmarkedBy: email,
        bookmarkedAt: time,
      });

      return NextResponse.json({ bookmarked: true });
    }
  } catch (error) {
    console.error("Error toggling bookmark:", error);
    return NextResponse.json(
      { bookmarked: null, error: "Failed to toggle bookmark" },
      { status: 500 }
    );
  }
}
