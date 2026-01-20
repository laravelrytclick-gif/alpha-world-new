import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { authGuard } from "@/lib/auth";
import { roleGuard } from "@/lib/roleGuard";
import Role from "@/models/Role";

export async function POST(req: Request) {
  await connectDB();

  const body = await req.json();
  const { name, email, password, role_id } = body;

  if (!name || !email || !password || !role_id) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }

  const role = await Role.findById(role_id);
  if (!role || role.name === "STUDENT") {
    return NextResponse.json(
      { message: "Invalid role for user" },
      { status: 400 }
    );
  }

  const existing = await User.findOne({ email });
  if (existing) {
    return NextResponse.json(
      { message: "Email already exists" },
      { status: 409 }
    );
  }

  const password_hash = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password_hash,
    role_id,
  });

  return NextResponse.json(
    { success: true, user },
    { status: 201 }
  );
}




export async function GET(req: Request) {
  const auth = authGuard(req);
  if ("error" in auth) {
    return NextResponse.json(
      { message: auth.error },
      { status: auth.status }
    );
  }

  const roleCheck = roleGuard(auth.user.role, ["ADMIN"]);
  if (roleCheck) return roleCheck;

   await connectDB();

  const users = await User.find()
    .populate("role_id", "name")
    .sort({ created_at: -1 });

  return NextResponse.json({
    success: true,
    users,
  });
}