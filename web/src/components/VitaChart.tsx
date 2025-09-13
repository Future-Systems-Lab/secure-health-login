// Rights Reserved, Unlicensed
'use client'
import { useEffect, useState } from 'react'
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'
export default function VitaChart() {
  const [data, setData] = useState<{ x: string; y: number }[]>([])
  useEffect(() => {
    setData([{ x: 't0', y: 1 }, { x: 't1', y: 2 }, { x: 't2', y: 1 }])
  }, [])
  return (
    <div style={{ width: '100%', height: 360 }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="x" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="y" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
