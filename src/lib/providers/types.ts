import type { AppState } from '../types'

export interface DataProvider {
  readonly id: 'manual' | 'plaid'
  load(): Promise<AppState>
  save(state: AppState): Promise<void>
  syncFromInstitution?(): Promise<{ updated: number }>
}
