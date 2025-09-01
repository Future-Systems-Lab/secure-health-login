'use client'
import { useEffect, useState } from 'react'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts'

export default function VitaChart() {
  const [data, setData] = useState<Array<{day:string; transfer_count:number}>>([])

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/dune', { cache: 'no-store' })
        const j = await res.json()
        const rows = (j?.result?.rows ?? []).map((r: any) => ({
          day: String(r.day).slice(0, 10),
          transfer_count: Number(r.transfer_count),
        }))
        setData(rows)
      } catch {
        setData([])
      }
    })()
  }, [])

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis
  dataKey="day"
  ticks={data.filter((_, i) => i % 7 === 0).map(d => d.day)} // show 1 tick per week
  interval={0}
  tickFormatter={(d) => d.slice(5)} // show MM-DD only
  tick={{ fontSize: 12 }}
  angle={-45}
  textAnchor="end"
  height={60}
/>
        <YAxis />
 D       <Tooltip />
        <Line type="monotone" dataKey="transfer_count" />
      </LineChart>
    </ResponsiveContainer>
  )
}
