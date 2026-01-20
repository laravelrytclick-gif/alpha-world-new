import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Exam from "@/models/Exam";
import { authGuard } from "@/lib/auth";
import { roleGuard } from "@/lib/roleGuard";

type Params = {
  params: Promise<{ id: string }>;
};

/* ================= GET EXAM ================= */
export async function GET(_req: Request, { params }: Params) {
  await connectDB();

  const { id } = await params;

  const exam = await Exam.findById(id).populate(
    "created_by",
    "name email"
  );

  if (!exam || !exam.is_active) {
    return NextResponse.json(
      { message: "Exam not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    exam,
  });
}

/* ================= UPDATE EXAM ================= */
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

  const body = await req.json();
  const { id } = await params;

  const exam = await Exam.findByIdAndUpdate(id, body, { new: true });

  if (!exam) {
    return NextResponse.json(
      { message: "Exam not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    exam,
  });
}

/* ================= DELETE (SOFT) ================= */
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

  const { id } = await params;

  await Exam.findByIdAndUpdate(id, { is_active: false });

  return NextResponse.json({
    success: true,
    message: "Exam deactivated",
  });
}
