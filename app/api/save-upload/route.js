// /app/api/save-upload/route.ts
import { db } from "@/lib/dbConfig";
import { EditorImageUploads } from "@/lib/schema";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req) {
  const body = await req.json();
  const { url, fileId } = body;

  const user = await currentUser();
  if (!user || !url || !fileId) return new Response("Invalid", { status: 400 });

  await db.insert(EditorImageUploads).values({
    url,
    fileId,
    addedBy: user.emailAddresses[0]?.emailAddress,
  });

  return new Response("Saved", { status: 200 });
}
