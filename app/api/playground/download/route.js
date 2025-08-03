import { db } from "@/lib/dbConfig";
import { PlaygroundOverallUsage, PlaygroundUsageByUser } from "@/lib/schema";
import { eq, and } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { language, createdBy } = await req.json();

    // 1. Update or insert overall downloads
    const overall = await db.query.PlaygroundOverallUsage.findFirst({
      where: eq(PlaygroundOverallUsage.language, language),
    });

    if (overall) {
      await db
        .update(PlaygroundOverallUsage)
        .set({
          numberOfDownloads: overall.numberOfDownloads + 1,
        })
        .where(eq(PlaygroundOverallUsage.language, language));
    } else {
      await db.insert(PlaygroundOverallUsage).values({
        language,
        numberOfExecutions: 0,
        numberOfDownloads: 1,
      });
    }

    // 2. Update or insert user downloads
    const userUsage = await db.query.PlaygroundUsageByUser.findFirst({
      where: and(
        eq(PlaygroundUsageByUser.language, language),
        eq(PlaygroundUsageByUser.createdBy, createdBy)
      ),
    });

    if (userUsage) {
      await db
        .update(PlaygroundUsageByUser)
        .set({
          numberOfDownloads: overall.numberOfDownloads + 1,
        })
        .where(
          and(
            eq(PlaygroundUsageByUser.language, language),
            eq(PlaygroundUsageByUser.createdBy, createdBy)
          )
        );
    } else {
      await db.insert(PlaygroundUsageByUser).values({
        language,
        createdBy,
        numberOfExecutions: 0,
        numberOfDownloads: 1,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Download Logging Error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
