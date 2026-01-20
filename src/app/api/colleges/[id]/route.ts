import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import College from "@/models/College";
import { roleGuard } from "@/lib/roleGuard";
import { authGuard } from "@/lib/auth";

type Params = {
  params: Promise<{ id: string }>;
};

/* ================= GET COLLEGE ================= */
export async function GET(
  _req: Request,
  { params }: Params
) {
  await connectDB();

  const { id } = await params;

  const college = await College.findById(id).populate(
    "created_by",
    "name email"
  );

  if (!college || !college.is_active) {
    return NextResponse.json(
      { message: "College not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true, college });
}

/* ================= UPDATE COLLEGE ================= */
export async function PUT(
  req: Request,
  { params }: Params
) {
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

  const { id } = await params;
  const body = await req.json();

  const college = await College.findByIdAndUpdate(
    id,
    body,
    { new: true }
  );

  if (!college) {
    return NextResponse.json(
      { message: "College not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    college,
  });
}

/* ================= DELETE COLLEGE ================= */
export async function DELETE(
  req: Request,
  { params }: Params
) {
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

  await College.findByIdAndUpdate(id, {
    is_active: false,
  });

  return NextResponse.json({
    success: true,
    message: "College deactivated",
  });
}
