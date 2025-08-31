// Rights Reserved, Unlicensed
import { NextRequest } from "next/server";
import { getIronSession } from "iron-session";
import { cookies, headers } from "next/headers";
import { sessionOptions, SessionData } from "@/lib/session";
import { SiweMessage } from "siwe";

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  const session = await getIronSession<SessionData>(cookieStore, sessionOptions);

  const { message, signature } = await req.json();
  const siwe = new SiweMessage(message);

  const hdrs = await headers();
  const host = hdrs.get("host")!;
  await siwe.verify({ signature, domain: host, nonce: siwe.nonce });

  session.address = siwe.address as `0x${string}`;
  session.role = parseInt(session.address.slice(-1), 16) % 2 === 0 ? "Patient" : "Practitioner";
  await session.save();

  return Response.json({ ok: true, address: session.address, role: session.role });
}
