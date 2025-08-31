// Rights Reserved, Unlicensed
import { IronSessionOptions } from "iron-session";

export const sessionOptions: IronSessionOptions = {
  password: process.env.IRON_SESSION_PASSWORD!,
  cookieName: "siwe_session",
  cookieOptions: { secure: false }, // set true in production with https
};

export type SessionUser = { address: string } | undefined;
