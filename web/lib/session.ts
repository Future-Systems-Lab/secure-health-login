// Rights Reserved, Unlicensed
import type { SessionOptions } from "iron-session";

export const sessionOptions: SessionOptions = {
  password: process.env.IRON_SESSION_PASSWORD!,
  cookieName: "siwe_session",
  cookieOptions: { secure: false }, // set true in production with https
};

export type SessionUser = { address: string } | undefined;
