import { NextResponse } from "next/server";
import { db } from "@/lib/dbConfig";
import { snippetBookmarks } from "@/lib/schema";
import { and, eq } from "drizzle-orm";

export async function POST(req) {
  try {
    const { snippetId, email, time } = await req.json();

    const [existingBookmark] = await db
      .select()
      .from(snippetBookmarks)
      .where(
        and(
          eq(snippetBookmarks.snippetId, snippetId),
          eq(snippetBookmarks.bookmarkedBy, email)
        )
      );

    if (existingBookmark) {
      // Remove bookmark
      await db
        .delete(snippetBookmarks)
        .where(
          and(
            eq(snippetBookmarks.snippetId, snippetId),
            eq(snippetBookmarks.bookmarkedBy, email)
          )
        );

      return NextResponse.json({ bookmarked: false });
    } else {
      // Add bookmark
      await db.insert(snippetBookmarks).values({
        snippetId,
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
