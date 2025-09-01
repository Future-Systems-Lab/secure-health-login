/* Rights Reserved, Unlicensed */
"use client";
import React from "react";

type Pt = { t: string; v: number };
type Payload = { series: Pt[] };

function fmtDate(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${dd}`;
}
function niceStep(span: number, target = 4) {
  const raw = span / target;
  const pow = Math.pow(10, Math.floor(Math.log10(raw)));
  const cand = [1, 2, 2.5, 5, 10].map(k => k * pow);
  return cand.reduce((a, b) => (Math.abs(b - raw) < Math.abs(a - raw) ? b : a));
}
function niceTicks(min: number, max: number, count = 4) {
  if (min === max) return [min];
  const span = max - min;
  const step = niceStep(span, count);
  const start = Math.floor(min / step) * step;
  const end = Math.ceil(max / step) * step;
  const ticks: number[] = [];
  for (let v = start; v <= end + 1e-9; v += step) ticks.push(v);
  return ticks;
}

export default function BaselineLive() {
  const [pts, setPts] = React.useState<Pt[]>([]);
  const [err, setErr] = React.useState<string | null>(null);

  React.useEffect(() => {
    fetch("/api/baseline", { cache: "no-store" })
      .then(r => (r.ok ? r.json() : Promise.reject(r.statusText)))
      .then((j: Payload) => setPts(j.series || []))
      .catch(e => setErr(String(e)));
  }, []);

  const W = 880, H = 280, PAD_L = 56, PAD_R = 24, PAD_T = 20, PAD_B = 40;
  const innerW = W - PAD_L - PAD_R;
  const innerH = H - PAD_T - PAD_B;

  const times = pts.map(p => new Date(p.t).getTime());
  const vals = pts.map(p => p.v);
  const minT = Math.min(...times);
  const maxT = Math.max(...times);
  const minV = Math.min(...vals);
  const maxV = Math.max(...vals);
  const yTicks = niceTicks(minV, maxV, 4);
  const xTickCount = Math.min(6, Math.max(2, Math.floor(innerW / 140)));
  const xTicks: number[] = [];
  if (times.length) {
    for (let i = 0; i < xTickCount; i++) {
      const t = minT + (i * (maxT - minT)) / (xTickCount - 1);
      xTicks.push(t);
    }
  }

  function xScale(t: number) {
    if (maxT === minT) return PAD_L + innerW / 2;
    return PAD_L + ((t - minT) / (maxT - minT)) * innerW;
  }
  function yScale(v: number) {
    if (maxV === minV) return PAD_T + innerH / 2;
    return PAD_T + (1 - (v - minV) / (maxV - minV)) * innerH;
  }

  const linePath =
    pts.length > 0
      ? pts
          .map((p, i) => {
            const x = xScale(new Date(p.t).getTime()).toFixed(1);
            const y = yScale(p.v).toFixed(1);
            return `${i ? "L" : "M"}${x},${y}`;
          })
          .join(" ")
      : "";

  const areaPath =
    pts.length > 0
      ? `M${xScale(new Date(pts[0].t).getTime()).toFixed(1)},${(PAD_T + innerH).toFixed(1)} ` +
        pts
          .map(p => `L${xScale(new Date(p.t).getTime()).toFixed(1)},${yScale(p.v).toFixed(1)}`)
          .join(" ") +
        ` L${xScale(new Date(pts[pts.length - 1].t).getTime()).toFixed(1)},${(PAD_T + innerH).toFixed(1)} Z`
      : "";

  return (
    <section className="mx-auto max-w-6xl space-y-3">
      <h2 className="text-2xl font-semibold tracking-tight">Healthcare Adoption — Baseline (Live)</h2>
      <div className="rounded-2xl border bg-white p-5 shadow-sm">
        {err ? (
          <p className="text-sm text-red-600">Error: {err}</p>
        ) : pts.length === 0 ? (
          <p className="text-sm text-gray-500">Loading…</p>
        ) : (
          <svg width="100%" viewBox={`0 0 ${W} ${H}`} role="img" preserveAspectRatio="none">
            <defs>
              <linearGradient id="fill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopOpacity="0.20" />
                <stop offset="100%" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* y-grid and labels */}
            {yTicks.map((v, i) => {
              const y = yScale(v);
              return (
                <g key={`y-${i}`}>
                  <line x1={PAD_L} x2={W - PAD_R} y1={y} y2={y} stroke="#e5e7eb" strokeWidth="1" />
                  <text x={PAD_L - 8} y={y} fontSize="11" textAnchor="end" dominantBaseline="middle" fill="#6b7280">
                    {v.toLocaleString()}
                  </text>
                </g>
              );
            })}

            {/* x-grid and labels */}
            {xTicks.map((t, i) => {
              const x = xScale(t);
              const d = new Date(t);
              return (
                <g key={`x-${i}`}>
                  <line x1={x} x2={x} y1={PAD_T} y2={H - PAD_B} stroke="#f1f5f9" strokeWidth="1" />
                  <text x={x} y={H - PAD_B + 18} fontSize="11" textAnchor="middle" fill="#6b7280">
                    {fmtDate(d)}
                  </text>
                </g>
              );
            })}

            {/* axes */}
            <line x1={PAD_L} x2={W - PAD_R} y1={H - PAD_B} y2={H - PAD_B} stroke="#cbd5e1" strokeWidth="1.5" />
            <line x1={PAD_L} x2={PAD_L} y1={PAD_T} y2={H - PAD_B} stroke="#cbd5e1" strokeWidth="1.5" />

            {/* area and line */}
            <path d={areaPath} fill="url(#fill)" />
            <path d={linePath} fill="none" stroke="currentColor" strokeWidth="2.5" />
          </svg>
        )}
        <p className="mt-3 text-xs text-gray-500">Source: /api/baseline</p>
      </div>
    </section>
  );
}
