// Rights Reserved, Unlicensed
"use client";

import VitaChart from "@/components/VitaChart";
import WalletButtons from "@/components/WalletButtons";
import { getChartData } from "@/lib/getChartData";

export const dynamic = "force-dynamic";

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
