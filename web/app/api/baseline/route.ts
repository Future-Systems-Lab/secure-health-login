/* Rights Reserved, Unlicensed */
import { NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";
type Row = Record<string, any>;

function coerceRows(rows: Row[]) {
  return rows.map((r) => {
    const t = r.t ?? r.time ?? r.date ?? r.day ?? r.block_time ?? r.ts ?? r.timestamp;
    const v = r.v ?? r.value ?? r.count ?? r.cnt ?? r.n ?? r.total ?? r.metric;
    return { t: String(t), v: Number(v) };
  }).filter((x) => x.t && Number.isFinite(x.v));
}

async function fetchFromDune() {
  const apiKey = process.env.DUNE_API_KEY;
  const queryId = process.env.DUNE_QUERY_ID;
  if (!apiKey || !queryId) return null;
  const url = `https://api.dune.com/api/v1/query/${queryId}/results`;
  const res = await fetch(url, { headers: { "x-dune-api-key": apiKey } });
  if (!res.ok) return null;
  const data = await res.json();
  const rows = data?.result?.rows ?? data?.rows ?? [];
  if (!Array.isArray(rows)) return null;
  return { series: coerceRows(rows) };
}

async function fetchFromFile() {
  const p = path.join(process.cwd(), "data", "baseline.json");
  const buf = await readFile(p, "utf8");
  return JSON.parse(buf);
}

export async function GET() {
  try {
    const dune = await fetchFromDune();
    const payload = dune ?? (await fetchFromFile());
    const src = dune ? "dune" : "file";
    const res = NextResponse.json(payload, { status: 200 });
    res.headers.set("x-source", src);
    return res;
  } catch {
    return NextResponse.json({ error: "baseline_unavailable" }, { status: 500 });
  }
}
