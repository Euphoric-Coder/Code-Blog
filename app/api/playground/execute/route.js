import { db } from "@/lib/dbConfig";
import { PlaygroundOverallUsage, PlaygroundUsageByUser, PlaygroundUserLogs } from "@/lib/schema";
import { eq, and } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { language, code, output, createdBy } = await req.json();

    // 1. Log the execution
    await db.insert(PlaygroundUserLogs).values({
      language,
      code,
      output,
      createdBy,
    });

    // 2. Update or insert overall usage
    const overall = await db.query.PlaygroundOverallUsage.findFirst({
      where: eq(PlaygroundOverallUsage.language, language),
    });

    if (overall) {
      await db
        .update(PlaygroundOverallUsage)
        .set({
          numberOfExecutions: overall.numberOfExecutions + 1,
        })
        .where(eq(PlaygroundOverallUsage.language, language));
    } else {
      await db.insert(PlaygroundOverallUsage).values({
        language,
        numberOfExecutions: 1,
        numberOfDownloads: 0,
      });
    }

    // 3. Update or insert usage per user
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
          numberOfExecutions: overall.numberOfExecutions + 1,
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
        numberOfExecutions: 1,
        numberOfDownloads: 0,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Execution Logging Error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
