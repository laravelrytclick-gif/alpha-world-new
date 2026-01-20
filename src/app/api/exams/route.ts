import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { authGuard } from "@/lib/auth";
import { roleGuard } from "@/lib/roleGuard";
import Exam from "@/models/Exam";

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

  const exists = await Exam.findOne({ slug: body.slug });
  if (exists) {
    return NextResponse.json(
      { message: "Exam slug already exists" },
      { status: 409 }
    );
  }

  const exam = await Exam.create({
    ...body,
    created_by: auth.user.id,
  });

  return NextResponse.json(
    { success: true, exam },
    { status: 201 }
  );
}


export async function GET() {
  await connectDB();

  const exams = await Exam.find({ is_active: true })
    .populate("created_by", "name email")
    .sort({ created_at: -1 });

  return NextResponse.json({
    success: true,
    exams,
  });
}
