import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { authGuard } from "@/lib/auth";
import { roleGuard } from "@/lib/roleGuard";
import College from "@/models/College";

/* ---------------- SLUGIFY ---------------- */
function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/* ---------------- CREATE COLLEGE ---------------- */
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

  const body = await req.json();

  if (!body.name) {
    return NextResponse.json(
      { message: "College name is required" },
      { status: 400 }
    );
  }

  const slug = slugify(body.name);

  const exists = await College.findOne({ slug });
  if (exists) {
    return NextResponse.json(
      { message: "College slug already exists" },
      { status: 409 }
    );
  }

  const college = await College.create({
    ...body,
    slug, // ✅ GUARANTEED SLUG
    status: body.status || "Active",
    created_by: auth.user.id,
  });

  return NextResponse.json(
    { success: true, college },
    { status: 201 }
  );
}


export async function GET(req: Request) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  let colleges = [];

  if (slug) {
    // exact slug match
    colleges = await College.find({ slug });

    // fallback: name match
    if (colleges.length === 0) {
      const nameGuess = slug.replace(/-/g, " ");
      colleges = await College.find({
        name: { $regex: `^${nameGuess}$`, $options: "i" },
      });
    }
  } else {
    colleges = await College.find({});
  }

  return NextResponse.json({
    success: true,
    colleges,
    count: colleges.length,
  });
}


 