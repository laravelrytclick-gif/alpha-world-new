import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { authGuard } from "@/lib/auth";
import { roleGuard } from "@/lib/roleGuard";
import Content from "@/models/Content";

/* ================= CREATE BLOG ================= */
export async function POST(req: Request) {
  await connectDB();

  const auth = authGuard(req);
  if ("error" in auth) {
    return NextResponse.json(
      { message: auth.error },
      { status: auth.status }
    );
  }

  const roleCheck = roleGuard(auth.user.role, ["ADMIN", "PUBLISHER"]);
  if (roleCheck) return roleCheck;

  const { title, slug, body, image } = await req.json();

  if (!title || !slug || !body) {
    return NextResponse.json(
      { message: "Title, slug, body required" },
      { status: 400 }
    );
  }

  const exists = await Content.findOne({ slug });
  if (exists) {
    return NextResponse.json(
      { message: "Slug already exists" },
      { status: 409 }
    );
  }

  const blog = await Content.create({
    title,
    slug,
    body,
    image,
    type: "blog",
    created_by: auth.user.id,
    is_published: true, // ✅ ADMIN LIST KE LIYE TRUE
  });

  return NextResponse.json(
    { success: true, blog },
    { status: 201 }
  );
}

export async function GET(req: Request) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 20);
  const skip = (page - 1) * limit;

  const blogs = await Content.find({ type: "blog" })
    .sort({ created_at: -1 })
    .skip(skip)
    .limit(limit);

  return NextResponse.json({
    success: true,
    blogs,
  });
}