import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Course from "@/models/Course";

type Params = {
  params: Promise<{ slug: string }>;
};

/* ===================== GET COURSE BY SLUG ===================== */
export async function GET(req: Request, { params }: Params) {
  await connectDB();

  const { slug } = await params; // ✅ REQUIRED (Next.js fix)

  const course = await Course.findOne({
    slug,
    is_active: true,
  }).populate("created_by", "name email");

  if (!course) {
    return NextResponse.json(
      { success: false, message: "Course not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    course,
  });
}
