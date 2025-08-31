import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function GET() {
  const c = cookies();
  const nonce = crypto.randomUUID();
  c.set({ name: "siwe_nonce", value: String(nonce), httpOnly: true, sameSite: "lax", path: "/" });
  return new Response(JSON.stringify({ nonce }), { headers: { "content-type": "application/json" } });
}
