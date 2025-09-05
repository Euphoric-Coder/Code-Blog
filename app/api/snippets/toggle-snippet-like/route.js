import { NextResponse } from "next/server";
import { db } from "@/lib/dbConfig";
import { CodeSnippet, snippetLikes } from "@/lib/schema";
import { eq, and } from "drizzle-orm";

export async function POST(req) {
  try {
    const { snippetId, email, time } = await req.json();

    const [existingLike] = await db
      .select()
      .from(snippetLikes)
      .where(and(eq(snippetLikes.snippetId, snippetId), eq(snippetLikes.likedBy, email)));

    const [snippet] = await db
      .select({ likes: CodeSnippet.likes })
      .from(CodeSnippet)
      .where(eq(CodeSnippet.id, snippetId));

    const currentLikes = snippet?.likes ?? 0;

    if (existingLike) {
      // Remove like
      await db
        .delete(snippetLikes)
        .where(and(eq(snippetLikes.snippetId, snippetId), eq(snippetLikes.likedBy, email)));

      await db
        .update(CodeSnippet)
        .set({ likes: Math.max(0, currentLikes - 1) })
        .where(eq(CodeSnippet.id, snippetId));

      return NextResponse.json({ liked: false });
    } else {
      // Add like
      await db.insert(snippetLikes).values({
        snippetId,
        likedBy: email,
        likedAt: time,
        totalLikes: "1",
      });

      await db
        .update(CodeSnippet)
        .set({ likes: currentLikes + 1 })
        .where(eq(CodeSnippet.id, snippetId));

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
