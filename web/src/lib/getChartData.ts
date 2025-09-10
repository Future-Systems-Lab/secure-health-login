// Rights Reserved, Unlicensed
export async function getChartData() {
  const res = await fetch("/api/dune");
  if (!res.ok) throw new Error("Failed to fetch chart data");
  const json = await res.json();

  return json?.result?.rows?.map((row: any) => ({
    label: row.label || row.date || row.name || "Unknown",
    value: row.value || row.count || 0,
  })) || [];
}

