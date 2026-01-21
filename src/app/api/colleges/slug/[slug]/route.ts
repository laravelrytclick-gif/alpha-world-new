import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import College from "@/models/College";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  await connectDB();

  const { slug } = params;

  const college = await College.findOne({ slug });

  if (!college) {
    return NextResponse.json(
      { success: false, message: "College not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true, college });
}
