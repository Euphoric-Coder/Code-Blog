import { NextResponse } from "next/server";
import { db } from "@/lib/dbConfig";
import { tutorialLikes, Tutorials } from "@/lib/schema";
import { eq, and } from "drizzle-orm";

export async function POST(req) {
  try {
    const { tutorialId, email, time } = await req.json();

    const [existingLike] = await db
      .select()
      .from(tutorialLikes)
      .where(and(eq(tutorialLikes.tutorialId, tutorialId), eq(tutorialLikes.likedBy, email)));

    const [tutorial] = await db
      .select({ likes: Tutorials.likes })
      .from(Tutorials)
      .where(eq(Tutorials.id, tutorialId));

    const currentLikes = tutorial?.likes ?? 0;

    if (existingLike) {
      // Remove like
      await db
        .delete(tutorialLikes)
        .where(and(eq(tutorialLikes.tutorialId, tutorialId), eq(tutorialLikes.likedBy, email)));

      await db
        .update(Tutorials)
        .set({ likes: Math.max(0, currentLikes - 1) })
        .where(eq(Tutorials.id, tutorialId));

      return NextResponse.json({ liked: false });
    } else {
      // Add like
      await db.insert(tutorialLikes).values({
        tutorialId,
        likedBy: email,
        likedAt: time,
        totalLikes: "1",
      });

      await db
        .update(Tutorials)
        .set({ likes: currentLikes + 1 })
        .where(eq(Tutorials.id, tutorialId));

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
