import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Content from "@/models/Content";

type Params = {
  params: Promise<{ slug: string }>;
};

export async function GET(req: Request, { params }: Params) {
  await connectDB();
  const { slug } = await params;

  const blog = await Content.findOne({
    slug,
    type: "blog",
    is_published: true,
  }).populate("created_by", "name");

  if (!blog) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  return NextResponse.json({
    success: true,
    blog,
  });
}
