import { db } from "@/lib/dbConfig";
import { Blogs } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { blogId } = params;

  try {
    const blog = await db.select().from(Blogs).where(eq(Blogs.id, blogId));

    if (blog.length === 0) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog[0]);
  } catch (error) {
    console.error("Error fetching blog by ID:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog" },
      { status: 500 }
    );
  }
}
