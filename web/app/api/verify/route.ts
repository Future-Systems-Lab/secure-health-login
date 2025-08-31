// Rights Reserved, Unlicensed
import { NextResponse } from "next/server";
import { verifyTypedData, type Address } from "viem";
import { EIP712Domain, types } from "../../../lib/typed";

type LoginMsg = { address: Address; timestamp: string };

export async function POST(req: Request) {
  try {
    const { address, signature, message } = (await req.json()) as {
      address: Address;
      signature: `0x${string}`;
      message: LoginMsg;
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
