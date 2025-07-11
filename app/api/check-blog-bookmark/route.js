import { NextResponse } from "next/server";
import { db } from "@/lib/dbConfig";
import { blogBookmarks } from "@/lib/schema";
import { and, eq } from "drizzle-orm";

export async function POST(req) {
  const { blogId, email } = await req.json();

  const [bookmark] = await db
    .select()
    .from(blogBookmarks)
    .where(
      and(
        eq(blogBookmarks.blogId, blogId),
        eq(blogBookmarks.bookmarkedBy, email)
      )
    );

  return NextResponse.json({ bookmarked: !!bookmark });
}
