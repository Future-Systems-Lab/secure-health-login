import { verifyTypedData, type Address } from "viem";
import { EIP712Domain, types, type LoginMessage } from "../../../lib/typed";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { address, signature, message } = (await req.json()) as {
      address: Address;
      signature: `0x${string}`;
      message: Omit<LoginMessage, "chainId"> & { chainId: number | string };
    };

    const fixed: LoginMessage = {
      ...message,
      chainId: BigInt(message.chainId),
    } as unknown as LoginMessage;

    const ok = await verifyTypedData({
      address,
      domain: EIP712Domain,
      types,
      primaryType: "Login",
      message: fixed,
      signature,
    });

    if (!ok) return new Response(JSON.stringify({ ok: false }), { status: 401, headers: { "content-type": "application/json" } });
    return new Response(JSON.stringify({ ok: true }), { headers: { "content-type": "application/json" } });
  } catch {
    return new Response(JSON.stringify({ ok: false, error: "server error" }), { status: 500, headers: { "content-type": "application/json" } });
  }
}
