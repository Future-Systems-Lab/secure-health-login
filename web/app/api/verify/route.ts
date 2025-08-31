// Rights Reserved, Unlicensed
import { NextResponse } from "next/server";
import { verifyTypedData } from "viem";

// Import runtime domain + type-safe message
import { EIP712Domain, types, type LoginMessage } from "../../../lib/typed";

export async function POST(req: Request) {
  try {
    const { address, message, signature } = await req.json();

    const valid = await verifyTypedData({
      address,
      domain: EIP712Domain,     // ✅ now a runtime object
      types,                    // ✅ struct types
      primaryType: "LoginMessage",
      message,
      signature,
    });

    if (!valid) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    return NextResponse.json({ ok: true, address });
  } catch (err) {
    console.error("Verify error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
