  import { NextResponse } from "next/server";
  import { connectDB } from "@/lib/db";
  import Course from "@/models/Course";
  import { authGuard } from "@/lib/auth";
  import { roleGuard } from "@/lib/roleGuard";

  type Params = {
    params: Promise<{ id: string }>;
  };

  /* ===================== GET ===================== */
  export async function GET(req: Request, { params }: Params) {
    await connectDB();

    const { id } = await params; 

    const course = await Course.findById(id).populate(
      "created_by",
      "name email"
    );

    if (!course || !course.is_active) {
      return NextResponse.json(
        { message: "Course not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      course,
    });
  }

  /* ===================== PUT ===================== */
  export async function PUT(req: Request, { params }: Params) {
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

    const { id } = await params; // ✅ FIX
    const body = await req.json();

    const course = await Course.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!course) {
      return NextResponse.json(
        { message: "Course not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      course,
    });
  }

  /* ===================== DELETE ===================== */
  export async function DELETE(req: Request, { params }: Params) {
    await connectDB();

    const auth = authGuard(req);
    if ("error" in auth) {
      return NextResponse.json(
        { message: auth.error },
        { status: auth.status }
      );
    }

    const roleCheck = roleGuard(auth.user.role, ["ADMIN"]);
    if (roleCheck) return roleCheck;

    const { id } = await params; // ✅ FIX

    await Course.findByIdAndUpdate(id, {
      is_active: false,
    });

    return NextResponse.json({
      success: true,
      message: "Course deactivated",
    });
  }
