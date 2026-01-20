import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Content from "@/models/Content";
import { authGuard } from "@/lib/auth";
import { roleGuard } from "@/lib/roleGuard";

type Params = {
  params: Promise<{ id: string }>;
};

/* ================= GET BLOG ================= */
export async function GET(_req: Request, { params }: Params) {
  await connectDB();

  const { id } = await params;

  const blog = await Content.findById(id);

  if (!blog) {
    return NextResponse.json(
      { message: "Blog not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    blog,
  });
}

/* ================= UPDATE BLOG ================= */
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

  const blog = await Content.findByIdAndUpdate(id, body, { new: true });

  if (!blog) {
    return NextResponse.json(
      { message: "Blog not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true, blog });
}

/* ================= DELETE BLOG ================= */
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

  await Content.findByIdAndDelete(id);

  return NextResponse.json({
    success: true,
    message: "Blog deleted",
  });
}
