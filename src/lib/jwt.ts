import jwt from "jsonwebtoken";

export function signToken(user: any) {
  return jwt.sign(
    { userId: user._id, role: user.role, permissions: user.permissions },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );
}

export function verifyToken(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET!);
}
