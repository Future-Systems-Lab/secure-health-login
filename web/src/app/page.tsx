// Rights Reserved, Unlicensed
"use client";

import WalletButtons from "@/components/WalletButtons";
import VitaChart from "@/components/VitaChart";
import { getChartData } from "@/lib/getChartData";

export default function Home() {
  return (
    <main style={{ padding: "2rem" }}>
      <WalletButtons />
      <h1>VITA Transfers (30d)</h1>
      <VitaChart />
    </main>
  );
}
