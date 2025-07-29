// app/api/check-like/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/dbConfig";
import { tutorialLikes } from "@/lib/schema";
import { eq, and } from "drizzle-orm";

export async function POST(req) {
  const { tutorialId, email } = await req.json();
  const [like] = await db
    .select()
    .from(tutorialLikes)
    .where(and(eq(tutorialLikes.tutorialId, tutorialId), eq(tutorialLikes.likedBy, email)));

  return NextResponse.json({ liked: !!like });
}
