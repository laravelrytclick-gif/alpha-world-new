import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import Role from "@/models/Role";
import connectDB from "@/lib/db";

export async function POST(req: Request) {
  try {
    await connectDB();

    const {
      fullName,
      email,
      password,
      country,
      field,
      level,
      englishTest,
      funds,
      wantsLoan,
    } = await req.json();

    const role = await Role.findOne({ name: "STUDENT" });
    if (!role) {
      return NextResponse.json(
        { message: "Default role not found" },
        { status: 500 }
      );
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 409 }
      );
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: fullName,
      email,
      password_hash: hashedPassword,
      role_id: role._id,

      country,
      field_of_study: field,
      level,
      english_test: englishTest,
      funds,
      wants_loan: wantsLoan,
    });

    return NextResponse.json(
      {
        message: "User registered successfully",
        userId: user._id,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("REGISTER ERROR:", error);
    return NextResponse.json(
      { message: "Registration failed", error: error.message },
      { status: 500 }
    );
  }
}
