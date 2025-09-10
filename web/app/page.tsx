"use client";
import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function VitaChart() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        `https://api.dune.com/api/v1/query/${process.env.NEXT_PUBLIC_DUNE_QUERY_ID}/results?limit=1000`,
        {
          headers: {
            "X-Dune-API-Key": process.env.NEXT_PUBLIC_DUNE_API_KEY as string,
          },
        }
      );
      const json = await res.json();
      if (json.result && json.result.rows) {
        setData(
          json.result.rows.map((row: any) => ({
            day: row.day,
            transfers: row.transfers,
          }))
        );
      }
    }
    fetchData();
  }, []);

  return (
    <div style={{ marginTop: 40 }}>
      <h2>VITA Transfers (30d)</h2>
      <LineChart width={600} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="transfers" stroke="#8884d8" />
      </LineChart>
    </div>
  );
}

