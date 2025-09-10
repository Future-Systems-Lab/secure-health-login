// Rights Reserved, UnLicensed
const API_KEY = process.env.DUNE_API_KEY as string
const QUERY_ID = process.env.DUNE_QUERY_ID as string

export async function getChartData() {
  const res = await fetch(
    `https://api.dune.com/api/v1/query/${QUERY_ID}/results`,
    {
      headers: { "X-Dune-API-Key": API_KEY },
      next: { revalidate: 3600 },
    }
  )

  console.log("DEBUG status:", res.status)

  if (!res.ok) {
    console.error("Dune API error:", res.statusText)
    return []
  }

  const json = await res.json()
  console.log("DEBUG full JSON:", JSON.stringify(json, null, 2))
  return json.result?.rows || []
}
