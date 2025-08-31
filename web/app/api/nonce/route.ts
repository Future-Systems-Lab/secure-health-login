// Rights Reserved, Unlicensed
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function GET() {
  const nonce = crypto.randomUUID();
  return NextResponse.json({ nonce });
}
