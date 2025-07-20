// app/api/tutorials/mark-as-read/route.ts

import { db } from "@/lib/dbConfig";
import { TutorialsMarkedAsRead } from "@/lib/schema";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req) {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { tutorialId, subsectionId } = await req.json();

  if (!tutorialId || !subsectionId) {
    return NextResponse.json({ error: "Missing data" }, { status: 400 });
  }

  await db.insert(TutorialsMarkedAsRead).values({
    markedBy: user.emailAddresses[0]?.emailAddress,
    tutorialId,
    subsectionId,
  });

  return NextResponse.json({ success: true });
}
