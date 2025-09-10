// Rights Reserved, Unlicensed
"use client";

import VitaChart from "@/components/VitaChart";
import { getChartData } from "@/lib/getChartData";
import WalletButtons from "@/components/WalletButtons";

export default async function Home() {
  const data = await getChartData();

  return (
    <main style={{ padding: "2rem" }}>
      <h1>VITA Transfers (30d)</h1>
      <WalletButtons />
      <VitaChart data={data} />
    </main>
  );
}
