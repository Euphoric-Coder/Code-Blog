import { db } from "@/lib/dbConfig";
import { Blogs } from "@/lib/schema";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const blogs = await db.select().from(Blogs);
    return NextResponse.json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}
