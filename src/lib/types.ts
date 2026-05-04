export type DebtType =
  | 'credit_card'
  | 'student_loan'
  | 'auto'
  | 'mortgage'
  | 'personal'
  | 'medical'
  | 'other'

export type Debt = {
  id: string
  name: string
  type: DebtType
  apr: number
  currentBalance: number
  originalBalance: number
  minimumPayment: number
  monthlyPayment: number
  dueDayOfMonth: number
  balanceAsOf: string
  createdAt: string
  updatedAt: string
}

export type PaymentKind = 'minimum' | 'custom' | 'extra'

export type Payment = {
  id: string
  debtId: string
  amount: number
  date: string
  kind: PaymentKind
  balanceBefore: number
  balanceAfter: number
  interestAccrued: number
}

export type Strategy = 'avalanche' | 'snowball'

export type AppState = {
  debts: Debt[]
  payments: Payment[]
  strategy: Strategy
  extraMonthly: number
  schemaVersion: 1
}

export type DebtInput = Omit<
  Debt,
  'id' | 'balanceAsOf' | 'createdAt' | 'updatedAt' | 'originalBalance'
> & {
  originalBalance?: number
}

export const EMPTY_STATE: AppState = {
  debts: [],
  payments: [],
  strategy: 'avalanche',
  extraMonthly: 0,
  schemaVersion: 1,
}
