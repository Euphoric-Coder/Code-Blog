import ImageKit from "imagekit";
import { NextResponse } from "next/server";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY,
  urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT,
});

export async function POST(req) {
  try {
    const { fileId } = await req.json();
    console.log(fileId)
    const result = await imagekit.deleteFile(fileId);
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
} 
