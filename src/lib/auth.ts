import jwt from "jsonwebtoken";

export function generateToken(user: string) {
  return jwt.sign({ user }, "SECRET_KEY", { expiresIn: "1d" });
}

export function verifyToken(token: string) {
  return jwt.verify(token, "SECRET_KEY");
}