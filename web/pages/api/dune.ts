// Rights Reserved, UnLicensed
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const API_KEY = process.env.DUNE_API_KEY;
  const QUERY_ID = process.env.DUNE_QUERY_ID;

  const response = await fetch(`https://api.dune.com/api/v1/query/${QUERY_ID}/results`, {
    headers: {
      'x-dune-api-key': API_KEY!,
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    return res.status(500).json({ error: 'Failed to fetch from Dune' });
  }

  const data = await response.json();
  return res.status(200).json(data);
}
