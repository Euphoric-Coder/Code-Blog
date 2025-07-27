import { NextResponse } from "next/server";
import { db } from "@/lib/dbConfig";
import { tutorialBookmarks } from "@/lib/schema";
import { and, eq } from "drizzle-orm";

export async function POST(req) {
  try {
    const { tutorialId, email, time } = await req.json();

    const [existingBookmark] = await db
      .select()
      .from(tutorialBookmarks)
      .where(
        and(
          eq(tutorialBookmarks.tutorialId, tutorialId),
          eq(tutorialBookmarks.bookmarkedBy, email)
        )
      );

    if (existingBookmark) {
      // Remove bookmark
      await db
        .delete(tutorialBookmarks)
        .where(
          and(
            eq(tutorialBookmarks.tutorialId, tutorialId),
            eq(tutorialBookmarks.bookmarkedBy, email)
          )
        );

      return NextResponse.json({ bookmarked: false });
    } else {
      // Add bookmark
      await db.insert(tutorialBookmarks).values({
        tutorialId,
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
