import React, { useMemo } from 'react'
import { ShieldAlert } from 'lucide-react'

/**
 * The hero's product visual: a miniature of the real forecast chart.
 *
 * It uses the dashboard's own validated series colours (blue observed vs
 * orange forecast, ΔE 26.8 under protanopia on this surface) and the same
 * encoding rules — solid past, dashed future, band for the interval. The shape
 * is generated from the same kind of signal the product models: an upward
 * trend with weekly seasonality.
 *
 * It is decorative, so it is hidden from assistive tech and the numbers beside
 * it carry the meaning.
 */
export default function ForecastGlyph() {
  const { actualPath, forecastPath, bandPath, splitX } = useMemo(() => buildSeries(), [])

  return (
    <div className="relative animate-float">
      {/* Soft glow behind the panel, matching the dashboard's surface. */}
      <div
        className="absolute inset-0 -z-10 rounded-3xl bg-brand-400/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="overflow-hidden rounded-2xl bg-ink-850/80 ring-hairline backdrop-blur">
        {/* window chrome */}
        <div className="flex items-center gap-2 border-b border-white/[0.07] px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="ml-2 font-mono text-[11px] text-white/35">
            cloudguard · spend trajectory
          </span>
        </div>

        <div className="p-5">
          <div className="mb-4 flex items-baseline justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-wider text-white/40">
                Forecast month-end
              </p>
              <p className="mt-1 text-3xl font-semibold tracking-tight text-white">$14,644</p>
              <p className="mt-0.5 text-xs text-white/40">$14,160 – $15,128 interval</p>
            </div>
            <span className="rounded-full bg-serious/15 px-2.5 py-1 text-[11px] font-semibold text-serious">
              ELEVATED
            </span>
          </div>

          <svg viewBox="0 0 320 110" className="w-full" aria-hidden="true">
            {/* recessive gridlines */}
            {[22, 55, 88].map((y) => (
              <line key={y} x1="0" x2="320" y1={y} y2={y} stroke="rgba(255,255,255,0.05)" />
            ))}

            {/* forecast interval */}
            <path d={bandPath} fill="var(--color-series-2)" fillOpacity="0.17" />

            {/* boundary between observed and predicted */}
            <line
              x1={splitX} x2={splitX} y1="4" y2="104"
              stroke="rgba(255,255,255,0.18)" strokeDasharray="3 4"
            />

            <path
              d={actualPath}
              fill="none"
              stroke="var(--color-series-1)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d={forecastPath}
              fill="none"
              stroke="var(--color-series-2)"
              strokeWidth="2"
              strokeDasharray="5 4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <div className="mt-3 flex items-center gap-4 text-[11px] text-white/45">
            <span className="flex items-center gap-1.5">
              <span className="h-[3px] w-4 rounded-full bg-series-1" />
              Observed
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-0 w-4 border-t-[3px] border-dashed border-series-2" />
              Prophet forecast
            </span>
          </div>
        </div>
      </div>

      {/* Floating anomaly card: the second pipeline, in one glance. */}
      <div
        className="absolute -bottom-7 -left-5 hidden w-60 rounded-xl bg-ink-800/95 p-3.5
                   ring-hairline backdrop-blur sm:block"
      >
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-critical/15 text-critical">
            <ShieldAlert size={14} aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-[12.5px] font-medium text-white">
              Authentication failure burst
            </p>
            <p className="font-mono text-[10.5px] text-white/40">score 98.6 · 8.8σ above baseline</p>
          </div>
        </div>
      </div>
    </div>
  )
}

/** Trend + weekly seasonality, then a forecast continuing it with a widening band. */
function buildSeries() {
  const W = 320
  const H = 110
  const SPLIT = 0.62
  const points = 34
  const splitIndex = Math.round(points * SPLIT)

  const value = (i) => {
    const trend = 40 - i * 0.62
    const weekly = Math.sin((i / 3.4) * Math.PI) * 11
    const wobble = Math.sin(i * 1.9) * 3
    return 52 + trend + weekly + wobble
  }

  const x = (i) => (i / (points - 1)) * W
  const clamp = (y) => Math.max(8, Math.min(H - 8, y))

  const actual = []
  for (let i = 0; i <= splitIndex; i += 1) actual.push([x(i), clamp(value(i))])

  const forecast = []
  const upper = []
  const lower = []
  for (let i = splitIndex; i < points; i += 1) {
    const spread = 4 + (i - splitIndex) * 1.15 // uncertainty grows with horizon
    const y = clamp(value(i))
    forecast.push([x(i), y])
    upper.push([x(i), clamp(y - spread)])
    lower.push([x(i), clamp(y + spread)])
  }

  const line = (pts) =>
    pts.map(([px, py], i) => `${i === 0 ? 'M' : 'L'}${px.toFixed(1)},${py.toFixed(1)}`).join(' ')

  return {
    actualPath: line(actual),
    forecastPath: line(forecast),
    bandPath: `${line(upper)} ${lower
      .slice()
      .reverse()
      .map(([px, py]) => `L${px.toFixed(1)},${py.toFixed(1)}`)
      .join(' ')} Z`,
    splitX: x(splitIndex).toFixed(1),
  }
}
