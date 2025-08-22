import { db } from "@/lib/dbConfig";
import { BlogComments, BlogReplies } from "@/lib/schema";
import { desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { blogId } = await req.json();

    // Step 1: Fetch comments for this blog
    const comments = await db
      .select()
      .from(BlogComments)
      .where(eq(BlogComments.blogId, blogId))
      .orderBy(desc(BlogComments.time));

    if (comments.length === 0) {
      return NextResponse.json([]);
    }

    // Step 2: Fetch all replies (we'll filter manually)
    const allReplies = await db.select().from(BlogReplies);

    // Step 3: Map replies to each comment
    const commentsWithReplies = comments.map((comment) => {
      const replies = allReplies.filter(
        (reply) => reply.commentId === comment.id
      );
      return { ...comment, replies };
    });

    return NextResponse.json(commentsWithReplies);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
