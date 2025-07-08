import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/dbConfig";
import { blogViews, Blogs } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function POST(req) {
  try {
    const { blogId } = await req.json();

    const user = await currentUser();

    const email = user.emailAddresses[0]?.emailAddress;

    if (!blogId || !email) {
      return NextResponse.json(
        { error: "Missing blogId or email" },
        { status: 400 }
      );
    }

    const [existingViewEntry] = await db
      .select()
      .from(blogViews)
      .where(eq(blogViews.blogId, blogId));

    if (existingViewEntry) {
      const hasViewed = existingViewEntry.viewers.some(
        (viewer) => viewer.email === email
      );

      if (hasViewed) {
        return NextResponse.json(
          { message: "Already viewed" },
          { status: 200 }
        );
      }

      const updatedViewers = [
        ...existingViewEntry.viewers,
        { email, viewedAt: new Date().toISOString() },
      ];

      const updatedTotalViews = parseInt(existingViewEntry.totalViews) + 1;

      await db
        .update(blogViews)
        .set({
          viewers: updatedViewers,
          totalViews: updatedTotalViews.toString(),
        })
        .where(eq(blogViews.blogId, blogId));

      // ⬇ Also update Blogs.views
      const [blog] = await db.select().from(Blogs).where(eq(Blogs.id, blogId));
      const blogViewsCount = parseInt(blog.views || "0") + 1;

      await db
        .update(Blogs)
        .set({ views: blogViewsCount.toString() }) // or just .set({ views: blogViewsCount }) if using integer
        .where(eq(Blogs.id, blogId));
    } else {
      await db.insert(blogViews).values({
        blogId,
        viewers: [{ email, viewedAt: new Date().toISOString() }],
        totalViews: "1",
      });

      // Also initialize Blogs.views
      await db
        .update(Blogs)
        .set({ views: "1" }) // or 1 if integer
        .where(eq(Blogs.id, blogId));
    }

    return NextResponse.json({ message: "View registered" }, { status: 200 });
  } catch (error) {
    console.error("View registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
