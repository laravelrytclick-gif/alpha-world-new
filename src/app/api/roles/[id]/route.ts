import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Role from "@/models/Role";

type Params = {
  params: Promise<{ id: string }>;
};

/* ================= UPDATE ROLE ================= */
export async function PUT(req: Request, { params }: Params) {
  await connectDB();

  const { id } = await params; // ✅ REQUIRED
  const body = await req.json();

  const role = await Role.findByIdAndUpdate(id, body, { new: true });

  if (!role) {
    return NextResponse.json(
      { message: "Role not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    role,
  });
}

/* ================= DELETE ROLE (BLOCKED) ================= */
export async function DELETE() {
  return NextResponse.json(
    { message: "Deleting roles is not allowed" },
    { status: 403 }
  );
}
