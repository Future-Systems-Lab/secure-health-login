// Rights Reserved, Unlicensed
import type { SessionOptions } from "iron-session";
export type SessionData = { address?: `0x${string}`; role?: "Patient" | "Practitioner" };
export const sessionOptions: SessionOptions = {
  password: "5b6a2b6d2a2b4d6f9c0a1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b",
  cookieName: "secure-health-login",
  cookieOptions: { secure: process.env.NODE_ENV === "production" },
};
