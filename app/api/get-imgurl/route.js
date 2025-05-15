import { db } from "@/lib/dbConfig";
import { Users } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email } = await req.json();

    // Fetch imageURL for the given email
    const imageURL = await db
      .select()
      .from(Users)
      .where(eq(Users.email, email.trim()));

    console.log("Image URL:", imageURL);

    if (imageURL.length === 0) {
      return NextResponse.json({ imgURL: null });
    }

    return NextResponse.json({ imgURL: imageURL[0].imgURL });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
