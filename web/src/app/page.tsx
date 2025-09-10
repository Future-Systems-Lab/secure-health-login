// Rights Reserved, Unlicensed
"use client";

import WalletButtons from "@/components/WalletButtons";
import VitaChart from "@/components/VitaChart";
import { getChartData } from "@/lib/getChartData";

export default async function Home() {
  const data = await getChartData();

  return (
    <main style={{ padding: "2rem" }}>
      <h1>VITA Transfers (30d)</h1>
      <WalletButtons />
      {data ? <VitaChart data={data} /> : <p>Loading chart...</p>}
    </main>
  );
}
