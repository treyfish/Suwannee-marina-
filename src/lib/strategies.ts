import type { Debt, Strategy } from './types'
import { monthlyPeriodicRate, payoffDate } from './finance'

export type SimDebtResult = {
  debtId: string
  name: string
  payoffMonth: number
  payoffDate: Date | null
  totalInterest: number
  totalPaid: number
}

export type SimResult = {
  strategy: Strategy | 'minimum'
  monthsToDebtFree: number
  totalInterest: number
  totalPaid: number
  byDebt: SimDebtResult[]
  monthly: { month: number; balance: number }[]
}

const MAX_MONTHS = 600

type Working = {
  id: string
  name: string
  balance: number
  apr: number
  minimumPayment: number
  monthlyPayment: number
  paid: boolean
  payoffMonth: number | null
  totalInterest: number
  totalPaid: number
}

function rank(working: Working[], strategy: Strategy | 'minimum'): Working[] {
  const active = working.filter(w => !w.paid)
  if (strategy === 'avalanche') return active.slice().sort((a, b) => b.apr - a.apr)
  if (strategy === 'snowball') return active.slice().sort((a, b) => a.balance - b.balance)
  return active
}

export function simulate(
  debts: Debt[],
  strategy: Strategy | 'minimum',
  extraMonthly: number
): SimResult {
  const working: Working[] = debts.map(d => ({
    id: d.id,
    name: d.name,
    balance: d.currentBalance,
    apr: d.apr,
    minimumPayment: d.minimumPayment,
    monthlyPayment: strategy === 'minimum' ? d.minimumPayment : d.monthlyPayment,
    paid: d.currentBalance <= 0,
    payoffMonth: d.currentBalance <= 0 ? 0 : null,
    totalInterest: 0,
    totalPaid: 0,
  }))

  const monthly: { month: number; balance: number }[] = []
  monthly.push({ month: 0, balance: working.reduce((s, w) => s + w.balance, 0) })

  let rolledExtra = strategy === 'minimum' ? 0 : extraMonthly
  let month = 0

  while (working.some(w => !w.paid) && month < MAX_MONTHS) {
    month++

    for (const w of working) {
      if (w.paid) continue
      const mpr = monthlyPeriodicRate(w.apr)
      const interest = w.balance * mpr
      w.totalInterest += interest
      w.balance += interest
    }

    let bonus = rolledExtra
    const ordered = rank(working, strategy)

    for (const w of ordered) {
      if (w.paid) continue
      const desired = w.monthlyPayment + (w === ordered[0] ? bonus : 0)
      const pay = Math.min(desired, w.balance)
      w.balance -= pay
      w.totalPaid += pay
      const remainder = desired - pay
      if (remainder > 0 && w === ordered[0]) bonus = remainder
      else if (w === ordered[0]) bonus = 0

      if (w.balance <= 0.005) {
        w.balance = 0
        w.paid = true
        w.payoffMonth = month
        rolledExtra += w.monthlyPayment
      }
    }

    if (bonus > 0) {
      const next = rank(working, strategy)
      for (const w of next) {
        if (w.paid || bonus <= 0) continue
        const pay = Math.min(bonus, w.balance)
        w.balance -= pay
        w.totalPaid += pay
        bonus -= pay
        if (w.balance <= 0.005) {
          w.balance = 0
          w.paid = true
          w.payoffMonth = month
          rolledExtra += w.monthlyPayment
        }
      }
    }

    monthly.push({
      month,
      balance: working.reduce((s, w) => s + w.balance, 0),
    })
  }

  const monthsToDebtFree = working.every(w => w.paid)
    ? Math.max(0, ...working.map(w => w.payoffMonth ?? 0))
    : Infinity

  const totalInterest = working.reduce((s, w) => s + w.totalInterest, 0)
  const totalPaid = working.reduce((s, w) => s + w.totalPaid, 0)

  const today = new Date()
  return {
    strategy,
    monthsToDebtFree,
    totalInterest,
    totalPaid,
    byDebt: working.map(w => ({
      debtId: w.id,
      name: w.name,
      payoffMonth: w.payoffMonth ?? Infinity,
      payoffDate: w.payoffMonth != null ? payoffDate(w.payoffMonth, today) : null,
      totalInterest: w.totalInterest,
      totalPaid: w.totalPaid,
    })),
    monthly,
  }
}

export type Comparison = {
  avalanche: SimResult
  snowball: SimResult
  baseline: SimResult
  active: SimResult
  monthsSavedVsBaseline: number
  interestSavedVsBaseline: number
  monthsAvalancheBeatsSnowball: number
  interestAvalancheBeatsSnowball: number
}

export function compareStrategies(
  debts: Debt[],
  strategy: Strategy,
  extraMonthly: number
): Comparison {
  const avalanche = simulate(debts, 'avalanche', extraMonthly)
  const snowball = simulate(debts, 'snowball', extraMonthly)
  const baseline = simulate(debts, 'minimum', 0)
  const active = strategy === 'avalanche' ? avalanche : snowball

  return {
    avalanche,
    snowball,
    baseline,
    active,
    monthsSavedVsBaseline: baseline.monthsToDebtFree - active.monthsToDebtFree,
    interestSavedVsBaseline: baseline.totalInterest - active.totalInterest,
    monthsAvalancheBeatsSnowball: snowball.monthsToDebtFree - avalanche.monthsToDebtFree,
    interestAvalancheBeatsSnowball: snowball.totalInterest - avalanche.totalInterest,
  }
}
