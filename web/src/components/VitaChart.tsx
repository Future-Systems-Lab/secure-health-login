// Rights Reserved, UnLicensed
"use client"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts"

export default function VitaChart({ data }: { data: any[] }) {
  if (!data || data.length === 0) return <p>No data available</p>

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="transfers" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  )
}
