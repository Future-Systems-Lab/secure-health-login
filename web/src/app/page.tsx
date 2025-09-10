// Rights Reserved, Unlicensed
"use client";

import { useEffect, useState } from "react";
import VitaChart from "@/components/VitaChart";
import WalletButtons from "@/components/WalletButtons";
import { getChartData } from "@/lib/getChartData";

export default function Home() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    getChartData().then(setData);
  }, []);

  return (
    <main style={{ padding: "2rem" }}>
      <h1>VITA Transfers (30d)</h1>
      <WalletButtons />
      {data ? <VitaChart data={data} /> : <p>Loading chart…</p>}
    </main>
  );
}
