
import { db } from "@/lib/dbConfig";
import { TutorialsMarkedAsRead } from "@/lib/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req) {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

  const { tutorialId } = await req.json();

  if (!tutorialId) {
    return NextResponse.json({ error: "Missing tutorial ID" }, { status: 400 });
  }

  const marked = await db
    .select({
      subsectionId: TutorialsMarkedAsRead.subsectionId,
    })
    .from(TutorialsMarkedAsRead)
    .where(
      eq(TutorialsMarkedAsRead.markedBy, user.emailAddresses[0]?.emailAddress)
    )
    .where(eq(TutorialsMarkedAsRead.tutorialId, tutorialId));

  return NextResponse.json({ completed: marked.map((m) => m.subsectionId) });
}
