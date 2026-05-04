const usd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

const usdWhole = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
})

const usdMicro = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 4,
  maximumFractionDigits: 4,
})

const percent = new Intl.NumberFormat('en-US', {
  style: 'percent',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

const compactDate = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  year: 'numeric',
})

const longDate = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
})

export function formatCurrency(n: number, opts?: { whole?: boolean; micro?: boolean }): string {
  if (!Number.isFinite(n)) return '—'
  if (opts?.micro) return usdMicro.format(n)
  if (opts?.whole) return usdWhole.format(n)
  return usd.format(n)
}

export function formatPercent(p: number): string {
  if (!Number.isFinite(p)) return '—'
  return percent.format(p / 100)
}

export function formatMonthYear(iso: string | Date): string {
  const d = typeof iso === 'string' ? new Date(iso) : iso
  return compactDate.format(d)
}

export function formatLongDate(iso: string | Date): string {
  const d = typeof iso === 'string' ? new Date(iso) : iso
  return longDate.format(d)
}

export function formatMonths(n: number): string {
  if (!Number.isFinite(n)) return '∞'
  if (n < 1) return '< 1 mo'
  const years = Math.floor(n / 12)
  const months = Math.round(n % 12)
  if (years === 0) return `${months} mo`
  if (months === 0) return `${years} yr`
  return `${years} yr ${months} mo`
}

export function ordinalDay(n: number): string {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  return n + (s[(v - 20) % 10] || s[v] || s[0])
}
