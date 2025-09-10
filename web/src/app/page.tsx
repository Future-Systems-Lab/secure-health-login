// Rights Reserved, UnLicensed
import VitaChart from "@/components/VitaChart"
import { getChartData } from "@/lib/getChartData"
import WalletButtons from "@/components/WalletButtons"

export const dynamic = "force-dynamic"

export default async function Home() {
  const data = await getChartData()
  console.log("DEBUG page data:", JSON.stringify(data, null, 2))

  return (
    <main style={{ padding: "2rem" }}>
      <h1>VITA Transfers (30d)</h1>
      <VitaChart data={data} />

      <div style={{ marginTop: "2rem" }}>
        <WalletButtons />
      </div>
    </main>
  )
}
