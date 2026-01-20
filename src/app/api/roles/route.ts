import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Role from "@/models/Role";

// POST /api/roles
export async function POST(req: Request) {
  await connectDB();

  const body = await req.json();
  const { name } = body;

  if (!name) {
    return NextResponse.json(
      { message: "Role name is required" },
      { status: 400 }
    );
  }

  const exists = await Role.findOne({ name });
  if (exists) {
    return NextResponse.json(
      { message: "Role already exists" },
      { status: 409 }
    );
  }

  const role = await Role.create({ name });

  return NextResponse.json(
    { success: true, role },
    { status: 201 }
  );
}

// GET /api/roles
export async function GET() {
  await connectDB();

  const roles = await Role.find().sort({ created_at: 1 });

  return NextResponse.json({
    success: true,
    roles,
  });
}
