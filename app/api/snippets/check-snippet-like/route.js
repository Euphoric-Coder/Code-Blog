// app/api/check-like/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/dbConfig";
import { snippetLikes } from "@/lib/schema";
import { eq, and } from "drizzle-orm";

export async function POST(req) {
  const { snippetId, email } = await req.json();
  const [like] = await db
    .select()
    .from(snippetLikes)
    .where(and(eq(snippetLikes.snippetId, snippetId), eq(snippetLikes.likedBy, email)));

  return NextResponse.json({ liked: !!like });
}
