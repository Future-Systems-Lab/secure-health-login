// Rights Reserved, Unlicensed
import { randomBytes } from "crypto";
export async function GET() {
  return Response.json({ nonce: randomBytes(16).toString("hex") });
}
