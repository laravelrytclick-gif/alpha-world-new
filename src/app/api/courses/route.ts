import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { authGuard } from "@/lib/auth";
import { roleGuard } from "@/lib/roleGuard";
import "@/models/User";

import Course from "@/models/Course";
import { success } from "zod";

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

  const exists = await Course.findOne({ slug: body.slug });
  if (exists) {
    return NextResponse.json(
      { message: "Course slug already exists" },
      { status: 409 }
    );
  }

  const course = await Course.create({
    ...body,
    created_by: auth.user.id,
  });

  return NextResponse.json(
    { success: true, course },
    { status: 201 }
  );
}
export async function GET() {
  await connectDB();

  const courses = await Course.find({ is_active: true })
    .populate("created_by", "name email")
    .sort({ created_at: -1 });

  return NextResponse.json({
    success: true,
    courses,
  });
}
