import type { AppState } from '../types'
import { EMPTY_STATE } from '../types'
import type { DataProvider } from './types'

const STORAGE_KEY = 'clearance.state.v1'

function migrate(raw: unknown): AppState {
  if (!raw || typeof raw !== 'object') return { ...EMPTY_STATE }
  const candidate = raw as Partial<AppState>
  return {
    schemaVersion: 1,
    debts: Array.isArray(candidate.debts) ? candidate.debts : [],
    payments: Array.isArray(candidate.payments) ? candidate.payments : [],
    strategy: candidate.strategy === 'snowball' ? 'snowball' : 'avalanche',
    extraMonthly: typeof candidate.extraMonthly === 'number' ? candidate.extraMonthly : 0,
  }
}

export const manualDataProvider: DataProvider = {
  id: 'manual',

  async load() {
    if (typeof window === 'undefined') return { ...EMPTY_STATE }
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (!raw) return { ...EMPTY_STATE }
      return migrate(JSON.parse(raw))
    } catch {
      return { ...EMPTY_STATE }
    }
  },

  async save(state: AppState) {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  },
}
