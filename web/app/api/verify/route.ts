// Rights Reserved, Unlicensed
import { NextResponse } from "next/server";
import { verifyTypedData } from "viem";
import { EIP712Domain, types, type LoginMessage } from "@/lib/typed";

export async function POST(req: Request) {
  try {
    const { address, signature, message } = (await req.json()) as {
      address: `0x${string}`;
      signature: `0x${string}`;
      message: LoginMessage;
    };

    const valid = await verifyTypedData({
      address,
      domain: EIP712Domain,
      types,
      primaryType: "LoginMessage",
      message,
      signature,
    });

    if (!valid) return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    return NextResponse.json({ ok: true, address });
  } catch (err) {
    console.error("verify error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
