import { NextResponse } from "next/server";
import { db } from "@/lib/dbConfig";
import { eq } from "drizzle-orm";
import { EditorImageUploads } from "@/lib/schema";

export async function POST(req) {
  try {
    const body = await req.json();
    const { url } = body;

    if (!url) {
      return new NextResponse("URL is required", { status: 400 });
    }

    const existingImage = await db
      .select()
      .from(EditorImageUploads)
      .where(eq(EditorImageUploads.url, url));
 
    return NextResponse.json(existingImage[0] || null); // return null if not found
  } catch (error) {
    console.error("Error in save-upload POST:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
