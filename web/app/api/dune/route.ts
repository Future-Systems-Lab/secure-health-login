import { NextResponse } from 'next/server';

export async function GET() {
  const key = process.env.DUNE_API_KEY!;
  const qid = process.env.DUNE_QUERY_ID || '5617908';
  const r = await fetch(`https://api.dune.com/api/v1/query/${qid}/results`, {
    headers: { 'x-dune-api-key': key },
    cache: 'no-store',
  });
  const j = await r.json();
  return NextResponse.json(j, { status: r.status });
}
