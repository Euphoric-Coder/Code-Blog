import { NextResponse } from "next/server";
import { db } from "@/lib/dbConfig";
import { snippetBookmarks } from "@/lib/schema";
import { and, eq } from "drizzle-orm";

export async function POST(req) {
  const { snippetId, email } = await req.json();

  const [bookmark] = await db
    .select()
    .from(snippetBookmarks)
    .where(
      and(
        eq(snippetBookmarks.snippetId, snippetId),
        eq(snippetBookmarks.bookmarkedBy, email)
      )
    );

  return NextResponse.json({ bookmarked: !!bookmark });
}
