import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

type Params = {
  params: Promise<{ id: string }>;
};

/* ================= GET USER ================= */
export async function GET(_req: Request, { params }: Params) {
  await connectDB();

  const { id } = await params;

  const user = await User.findById(id).populate("role_id", "name");

  if (!user) {
    return NextResponse.json(
      { message: "User not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    user,
  });
}

/* ================= UPDATE USER ================= */
export async function PUT(req: Request, { params }: Params) {
  await connectDB();

  const { id } = await params;
  const body = await req.json();

  const user = await User.findByIdAndUpdate(id, body, { new: true });

  if (!user) {
    return NextResponse.json(
      { message: "User not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    user,
  });
}

/* ================= SOFT DELETE USER ================= */
export async function DELETE(_req: Request, { params }: Params) {
  await connectDB();

  const { id } = await params;

  const user = await User.findByIdAndUpdate(
    id,
    { is_active: false },
    { new: true }
  );

  if (!user) {
    return NextResponse.json(
      { message: "User not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    message: "User deactivated successfully",
  });
}
