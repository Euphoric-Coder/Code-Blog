import { db } from "@/lib/dbConfig";
import { EditorImageUploads } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function POST(req) {
  const body = await req.json();
  const { url } = body;

  if (!url) return new Response("Invalid", { status: 400 });

  await db.delete(EditorImageUploads).where(eq(EditorImageUploads.url, url));

  return new Response("Deleted", { status: 200 });
}
