// app/api/check-like/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/dbConfig";
import { blogLikes } from "@/lib/schema";
import { eq, and } from "drizzle-orm";

export async function POST(req) {
  const { blogId, email } = await req.json();
  const [like] = await db
    .select()
    .from(blogLikes)
    .where(and(eq(blogLikes.blogId, blogId), eq(blogLikes.likedBy, email)));

  return NextResponse.json({ liked: !!like });
}
