'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { Trash2 } from 'lucide-react'
import type { Debt, DebtType, DebtInput } from '@/lib/types'

const TYPES: { value: DebtType; label: string }[] = [
  { value: 'credit_card', label: 'Credit card' },
  { value: 'student_loan', label: 'Student loan' },
  { value: 'auto', label: 'Auto loan' },
  { value: 'mortgage', label: 'Mortgage' },
  { value: 'personal', label: 'Personal loan' },
  { value: 'medical', label: 'Medical' },
  { value: 'other', label: 'Other' },
]

type Props = {
  debt?: Debt
  onSubmit: (input: DebtInput) => void
  onDelete?: () => void
  onCancel: () => void
}

type FormState = {
  name: string
  type: DebtType
  apr: string
  currentBalance: string
  originalBalance: string
  minimumPayment: string
  monthlyPayment: string
  dueDayOfMonth: string
}

function toFormState(debt?: Debt): FormState {
  if (!debt) {
    return {
      name: '',
      type: 'credit_card',
      apr: '',
      currentBalance: '',
      originalBalance: '',
      minimumPayment: '',
      monthlyPayment: '',
      dueDayOfMonth: '1',
    }
  }
  return {
    name: debt.name,
    type: debt.type,
    apr: String(debt.apr),
    currentBalance: String(debt.currentBalance),
    originalBalance: String(debt.originalBalance),
    minimumPayment: String(debt.minimumPayment),
    monthlyPayment: String(debt.monthlyPayment),
    dueDayOfMonth: String(debt.dueDayOfMonth),
  }
}

export function DebtForm({ debt, onSubmit, onDelete, onCancel }: Props) {
  const [form, setForm] = useState<FormState>(() => toFormState(debt))
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const firstInput = useRef<HTMLInputElement>(null)

  useEffect(() => {
    firstInput.current?.focus()
  }, [])

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm(s => ({ ...s, [k]: v }))

  const isEdit = Boolean(debt)
  const submitLabel = isEdit ? 'Save changes' : 'Add debt'

  const parsed = useMemo(() => {
    const num = (s: string) => {
      const n = Number(s.replace(/[$,\s]/g, ''))
      return Number.isFinite(n) ? n : NaN
    }
    return {
      apr: num(form.apr),
      currentBalance: num(form.currentBalance),
      originalBalance: form.originalBalance.trim() === '' ? NaN : num(form.originalBalance),
      minimumPayment: num(form.minimumPayment),
      monthlyPayment: num(form.monthlyPayment),
      dueDayOfMonth: Math.round(num(form.dueDayOfMonth)),
    }
  }, [form])

  const validate = (): boolean => {
    const e: Partial<Record<keyof FormState, string>> = {}
    if (!form.name.trim()) e.name = 'Required'
    if (!Number.isFinite(parsed.apr) || parsed.apr < 0) e.apr = 'Enter a valid APR'
    if (!Number.isFinite(parsed.currentBalance) || parsed.currentBalance < 0)
      e.currentBalance = 'Enter a valid balance'
    if (!Number.isFinite(parsed.minimumPayment) || parsed.minimumPayment < 0)
      e.minimumPayment = 'Enter a valid minimum'
    if (!Number.isFinite(parsed.monthlyPayment) || parsed.monthlyPayment < 0)
      e.monthlyPayment = 'Enter your monthly payment'
    if (parsed.monthlyPayment < parsed.minimumPayment)
      e.monthlyPayment = 'Must be ≥ minimum'
    if (
      !Number.isFinite(parsed.dueDayOfMonth) ||
      parsed.dueDayOfMonth < 1 ||
      parsed.dueDayOfMonth > 31
    )
      e.dueDayOfMonth = '1–31'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()
    if (!validate()) return
    const input: DebtInput = {
      name: form.name.trim(),
      type: form.type,
      apr: parsed.apr,
      currentBalance: parsed.currentBalance,
      originalBalance: Number.isFinite(parsed.originalBalance)
        ? parsed.originalBalance
        : parsed.currentBalance,
      minimumPayment: parsed.minimumPayment,
      monthlyPayment: parsed.monthlyPayment,
      dueDayOfMonth: parsed.dueDayOfMonth,
    }
    onSubmit(input)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <Field label="Name" error={errors.name}>
        <input
          ref={firstInput}
          className="field"
          placeholder="Chase Sapphire"
          value={form.name}
          onChange={e => set('name', e.target.value)}
          autoComplete="off"
        />
      </Field>

      <Field label="Type">
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
          {TYPES.map(t => (
            <button
              type="button"
              key={t.value}
              onClick={() => set('type', t.value)}
              className={
                'rounded-lg border px-2 py-2 text-[12px] transition-colors ' +
                (form.type === t.value
                  ? 'border-[var(--color-accent)] bg-[var(--color-accent-soft)] text-[var(--color-accent)]'
                  : 'border-[var(--color-border-strong)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]')
              }
            >
              {t.label}
            </button>
          ))}
        </div>
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="APR (%)" error={errors.apr}>
          <input
            className="field field-num"
            inputMode="decimal"
            placeholder="22.99"
            value={form.apr}
            onChange={e => set('apr', e.target.value)}
          />
        </Field>
        <Field label="Due day of month" error={errors.dueDayOfMonth}>
          <input
            className="field field-num"
            inputMode="numeric"
            placeholder="14"
            value={form.dueDayOfMonth}
            onChange={e => set('dueDayOfMonth', e.target.value)}
          />
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Current balance ($)" error={errors.currentBalance}>
          <input
            className="field field-num"
            inputMode="decimal"
            placeholder="6480.32"
            value={form.currentBalance}
            onChange={e => set('currentBalance', e.target.value)}
          />
        </Field>
        <Field
          label="Original balance ($)"
          hint={isEdit ? undefined : 'Defaults to current'}
        >
          <input
            className="field field-num"
            inputMode="decimal"
            placeholder="—"
            value={form.originalBalance}
            onChange={e => set('originalBalance', e.target.value)}
          />
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Min payment ($)" error={errors.minimumPayment}>
          <input
            className="field field-num"
            inputMode="decimal"
            placeholder="145"
            value={form.minimumPayment}
            onChange={e => set('minimumPayment', e.target.value)}
          />
        </Field>
        <Field
          label="Your monthly ($)"
          error={errors.monthlyPayment}
          hint="What you actually plan to pay"
        >
          <input
            className="field field-num"
            inputMode="decimal"
            placeholder="350"
            value={form.monthlyPayment}
            onChange={e => set('monthlyPayment', e.target.value)}
          />
        </Field>
      </div>

      <div className="mt-2 flex items-center justify-between gap-3 border-t border-[var(--color-border)] pt-5">
        <div className="flex gap-2">
          {onDelete ? (
            <button
              type="button"
              onClick={() => {
                if (confirm('Delete this debt? Payment history will be removed.')) onDelete()
              }}
              className="btn btn-danger"
            >
              <Trash2 size={15} /> Delete
            </button>
          ) : null}
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={onCancel} className="btn btn-ghost">
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            {submitLabel}
          </button>
        </div>
      </div>
    </form>
  )
}

function Field({
  label,
  error,
  hint,
  children,
}: {
  label: string
  error?: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[11px] uppercase tracking-[0.12em] text-[var(--color-text-muted)]">
        {label}
      </span>
      {children}
      {error ? (
        <span className="text-[11px]" style={{ color: 'var(--color-danger)' }}>
          {error}
        </span>
      ) : hint ? (
        <span className="text-[11px] text-[var(--color-text-dim)]">{hint}</span>
      ) : null}
    </label>
  )
}
