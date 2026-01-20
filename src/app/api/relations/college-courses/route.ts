import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { authGuard } from "@/lib/auth";
import { roleGuard } from "@/lib/roleGuard";
import CollegeCourse from "@/models/CollegeCourse";

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

  const { college_id, course_id } = await req.json();

  if (!college_id || !course_id) {
    return NextResponse.json(
      { message: "college_id and course_id required" },
      { status: 400 }
    );
  }

  const exists = await CollegeCourse.findOne({ college_id, course_id });
  if (exists) {
    return NextResponse.json(
      { message: "Relation already exists" },
      { status: 409 }
    );
  }

  const relation = await CollegeCourse.create({
    college_id,
    course_id,
  });

  return NextResponse.json(
    { success: true, relation },
    { status: 201 }
  );
}
