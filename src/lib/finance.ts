import type { Debt } from './types'

const MS_PER_DAY = 86_400_000

export function dailyPeriodicRate(apr: number): number {
  return apr / 100 / 365
}

export function monthlyPeriodicRate(apr: number): number {
  return apr / 100 / 12
}

export function liveBalance(debt: Debt, now: number = Date.now()): number {
  const asOf = new Date(debt.balanceAsOf).getTime()
  const days = Math.max(0, (now - asOf) / MS_PER_DAY)
  if (days === 0) return debt.currentBalance
  const dpr = dailyPeriodicRate(debt.apr)
  return debt.currentBalance * Math.pow(1 + dpr, days)
}

export function dailyInterestAt(balance: number, apr: number): number {
  return balance * dailyPeriodicRate(apr)
}

export function payoffPercent(debt: Debt): number {
  if (debt.originalBalance <= 0) return 0
  const paid = debt.originalBalance - debt.currentBalance
  return Math.max(0, Math.min(100, (paid / debt.originalBalance) * 100))
}

export function monthsToPayoff(balance: number, apr: number, monthlyPayment: number): number {
  if (balance <= 0) return 0
  const mpr = monthlyPeriodicRate(apr)
  if (mpr === 0) return monthlyPayment > 0 ? balance / monthlyPayment : Infinity
  const minViable = balance * mpr
  if (monthlyPayment <= minViable) return Infinity
  return -Math.log(1 - (balance * mpr) / monthlyPayment) / Math.log(1 + mpr)
}

export function totalInterestAtPayment(balance: number, apr: number, monthlyPayment: number): number {
  const months = monthsToPayoff(balance, apr, monthlyPayment)
  if (!Number.isFinite(months)) return Infinity
  return Math.max(0, months * monthlyPayment - balance)
}

export function payoffDate(months: number, from: Date = new Date()): Date | null {
  if (!Number.isFinite(months)) return null
  const d = new Date(from)
  d.setMonth(d.getMonth() + Math.ceil(months))
  return d
}

export function daysInMonth(year: number, month0: number): number {
  return new Date(year, month0 + 1, 0).getDate()
}

export type EomForecast = {
  liveBalance: number
  balAtDue: number
  balEOM: number
  interestThisMonth: number
  willPayOff: boolean
}

export function forecastEndOfMonth(debt: Debt, now: Date = new Date()): EomForecast {
  const live = liveBalance(debt, now.getTime())
  const dpr = dailyPeriodicRate(debt.apr)
  const today = now.getDate()
  const dim = daysInMonth(now.getFullYear(), now.getMonth())
  const dueDay = Math.min(Math.max(1, debt.dueDayOfMonth), dim)
  const daysToDue = Math.max(0, dueDay - today)
  const daysAfter = Math.max(0, dim - dueDay)

  const balBeforePayment = live * Math.pow(1 + dpr, daysToDue)
  const balAtDue = Math.max(0, balBeforePayment - debt.monthlyPayment)
  const balEOM = balAtDue * Math.pow(1 + dpr, daysAfter)

  const interestThisMonth = balBeforePayment - live + (balEOM - balAtDue)

  return {
    liveBalance: live,
    balAtDue,
    balEOM,
    interestThisMonth,
    willPayOff: balAtDue <= 0.005,
  }
}

export function reconcile(
  debt: Debt,
  paymentAmount: number,
  now: number = Date.now()
): { newBalance: number; interestAccrued: number; balanceBefore: number } {
  const balanceBefore = liveBalance(debt, now)
  const interestAccrued = balanceBefore - debt.currentBalance
  const newBalance = Math.max(0, balanceBefore - paymentAmount)
  return { newBalance, interestAccrued, balanceBefore }
}
