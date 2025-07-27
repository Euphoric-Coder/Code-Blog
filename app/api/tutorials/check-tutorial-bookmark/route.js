import { NextResponse } from "next/server";
import { db } from "@/lib/dbConfig";
import { tutorialBookmarks } from "@/lib/schema";
import { and, eq } from "drizzle-orm";

export async function POST(req) {
  const { tutorialId, email } = await req.json();

  const [bookmark] = await db
    .select()
    .from(tutorialBookmarks)
    .where(
      and(
        eq(tutorialBookmarks.tutorialId, tutorialId),
        eq(tutorialBookmarks.bookmarkedBy, email)
      )
    );

  return NextResponse.json({ bookmarked: !!bookmark });
}
