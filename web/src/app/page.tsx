// Rights Reserved, Unlicensed
import VitaChart from "@/components/VitaChart"
import { getChartData } from "@/lib/getChartData"

export default async function Home() {
  const data = await getChartData()

  return (
    <main style={{ padding: "2rem" }}>
      <h1>VITA Transfers (30d)</h1>
      <VitaChart data={data} />
    </main>
  )
}

