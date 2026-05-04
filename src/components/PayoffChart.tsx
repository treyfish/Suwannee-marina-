'use client'

import { useMemo, useState } from 'react'
import type { SimResult } from '@/lib/strategies'
import { formatCurrency, formatMonthYear } from '@/lib/format'

type Props = {
  active: SimResult
  baseline: SimResult
  className?: string
}

const VIEW_W = 800
const VIEW_H = 260
const PAD_L = 14
const PAD_R = 14
const PAD_T = 18
const PAD_B = 26

export function PayoffChart({ active, baseline, className }: Props) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)

  const data = useMemo(() => {
    const totalMonths = Math.max(active.monthly.length, baseline.monthly.length, 2)
    const maxBalance = Math.max(
      ...active.monthly.map(m => m.balance),
      ...baseline.monthly.map(m => m.balance),
      1
    )
    const xAt = (m: number) =>
      PAD_L + (m / Math.max(1, totalMonths - 1)) * (VIEW_W - PAD_L - PAD_R)
    const yAt = (b: number) =>
      PAD_T + (1 - b / maxBalance) * (VIEW_H - PAD_T - PAD_B)

    const buildPath = (series: { month: number; balance: number }[]) => {
      if (series.length === 0) return ''
      let d = `M ${xAt(series[0].month).toFixed(2)} ${yAt(series[0].balance).toFixed(2)}`
      for (let i = 1; i < series.length; i++) {
        d += ` L ${xAt(series[i].month).toFixed(2)} ${yAt(series[i].balance).toFixed(2)}`
      }
      return d
    }

    const buildArea = (series: { month: number; balance: number }[]) => {
      if (series.length === 0) return ''
      const last = series[series.length - 1]
      let d = buildPath(series)
      d += ` L ${xAt(last.month).toFixed(2)} ${(VIEW_H - PAD_B).toFixed(2)}`
      d += ` L ${xAt(series[0].month).toFixed(2)} ${(VIEW_H - PAD_B).toFixed(2)} Z`
      return d
    }

    return {
      totalMonths,
      maxBalance,
      xAt,
      yAt,
      activePath: buildPath(active.monthly),
      activeArea: buildArea(active.monthly),
      baselinePath: buildPath(baseline.monthly),
    }
  }, [active, baseline])

  const today = new Date()
  const endDate = new Date(today)
  endDate.setMonth(endDate.getMonth() + Math.ceil(active.monthsToDebtFree))

  const hovered =
    hoverIndex != null && active.monthly[hoverIndex]
      ? {
          month: active.monthly[hoverIndex].month,
          activeBal: active.monthly[hoverIndex].balance,
          baselineBal: baseline.monthly[Math.min(hoverIndex, baseline.monthly.length - 1)]
            ?.balance,
        }
      : null

  const hoveredX = hovered ? data.xAt(hovered.month) : null
  const hoveredDate = hovered
    ? new Date(today.getFullYear(), today.getMonth() + hovered.month, today.getDate())
    : null

  const onMove: React.MouseEventHandler<SVGSVGElement> = e => {
    const rect = (e.currentTarget as SVGSVGElement).getBoundingClientRect()
    const ratio = (e.clientX - rect.left) / rect.width
    const x = ratio * VIEW_W
    const totalSpan = VIEW_W - PAD_L - PAD_R
    const month = Math.round(((x - PAD_L) / totalSpan) * (data.totalMonths - 1))
    if (Number.isFinite(month) && month >= 0 && month < active.monthly.length) {
      setHoverIndex(month)
    } else setHoverIndex(null)
  }

  return (
    <div className={'surface relative overflow-hidden p-5 md:p-6 fade-up ' + (className ?? '')}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-dim)]">
            Trajectory
          </div>
          <h2 className="mt-1 text-lg font-semibold tracking-tight">Path to zero.</h2>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <Legend swatch="solid" color="var(--color-accent)" label="Your plan" />
          <Legend swatch="dashed" color="var(--color-text-dim)" label="Minimum only" />
        </div>
      </div>

      <div className="relative mt-4">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          preserveAspectRatio="none"
          className="block w-full"
          style={{ height: 240 }}
          onMouseMove={onMove}
          onMouseLeave={() => setHoverIndex(null)}
          role="img"
          aria-label="Total debt projection over time"
        >
          <defs>
            <linearGradient id="payoff-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(52,211,153,0.32)" />
              <stop offset="100%" stopColor="rgba(52,211,153,0)" />
            </linearGradient>
          </defs>

          {[0.25, 0.5, 0.75].map(t => (
            <line
              key={t}
              x1={PAD_L}
              x2={VIEW_W - PAD_R}
              y1={PAD_T + t * (VIEW_H - PAD_T - PAD_B)}
              y2={PAD_T + t * (VIEW_H - PAD_T - PAD_B)}
              stroke="rgba(255,255,255,0.05)"
              strokeWidth={1}
            />
          ))}

          <path d={data.activeArea} fill="url(#payoff-fill)" />
          <path
            d={data.baselinePath}
            fill="none"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth={1.4}
            strokeDasharray="3 4"
          />
          <path
            d={data.activePath}
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {hoveredX != null ? (
            <line
              x1={hoveredX}
              x2={hoveredX}
              y1={PAD_T}
              y2={VIEW_H - PAD_B}
              stroke="rgba(255,255,255,0.18)"
              strokeWidth={1}
            />
          ) : null}

          {hovered ? (
            <circle
              cx={data.xAt(hovered.month)}
              cy={data.yAt(hovered.activeBal)}
              r={4}
              fill="var(--color-bg)"
              stroke="var(--color-accent)"
              strokeWidth={2}
            />
          ) : null}
        </svg>

        {hovered && hoveredDate ? (
          <div
            className="pointer-events-none absolute -translate-x-1/2 rounded-md border border-[var(--color-border-strong)] bg-[var(--color-surface-elev)] px-3 py-2 text-[11px] shadow-none"
            style={{
              left: `${(data.xAt(hovered.month) / VIEW_W) * 100}%`,
              top: 6,
            }}
          >
            <div className="text-[var(--color-text-dim)]">
              {formatMonthYear(hoveredDate)}
            </div>
            <div className="mono mt-0.5 font-medium" style={{ color: 'var(--color-accent)' }}>
              {formatCurrency(hovered.activeBal, { whole: true })}
            </div>
            {hovered.baselineBal != null ? (
              <div className="mono text-[10px] text-[var(--color-text-dim)]">
                vs {formatCurrency(hovered.baselineBal, { whole: true })} on minimum
              </div>
            ) : null}
          </div>
        ) : null}
      </div>

      <div className="mt-3 flex items-center justify-between text-[11px] text-[var(--color-text-dim)]">
        <span>{formatMonthYear(today)}</span>
        <span>
          {Number.isFinite(active.monthsToDebtFree)
            ? `Debt-free ${formatMonthYear(endDate)}`
            : 'Add a higher payment to clear'}
        </span>
      </div>
    </div>
  )
}

function Legend({
  swatch,
  color,
  label,
}: {
  swatch: 'solid' | 'dashed'
  color: string
  label: string
}) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[var(--color-text-muted)]">
      <span
        aria-hidden
        style={{
          width: 18,
          height: 0,
          borderTop:
            swatch === 'dashed' ? `1.5px dashed ${color}` : `2px solid ${color}`,
          display: 'inline-block',
        }}
      />
      {label}
    </span>
  )
}
