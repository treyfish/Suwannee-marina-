import type { AppState } from '../types'
import type { DataProvider } from './types'

// =============================================================================
// PLAID DATA PROVIDER — STUB
// =============================================================================
// This file is the integration surface for Plaid. It is intentionally not wired
// up in `providers/index.ts` today. To enable Plaid, swap the export in that
// file from `manualDataProvider` to `plaidDataProvider`. The rest of the app
// (UI, hooks, finance math) is unaware of the data source.
//
// Implementation plan when you're ready:
//
// TODO[plaid]: 1. Backend route /api/plaid/link-token  — issue a link token for
//                 the authenticated user. Plaid Link in the browser exchanges
//                 it for a public_token.
// TODO[plaid]: 2. Backend route /api/plaid/exchange    — POST { public_token }
//                 → call plaidClient.itemPublicTokenExchange → store the
//                 access_token server-side keyed by userId.  NEVER STORE THE
//                 ACCESS TOKEN IN LOCALSTORAGE.
// TODO[plaid]: 3. Backend route /api/plaid/sync        — call /liabilities/get
//                 and /transactions/sync, map to Debt[] / Payment[] (see
//                 mapPlaidLiability / mapPlaidTransaction below), return an
//                 AppState merge.
// TODO[plaid]: 4. This provider's load() calls /api/plaid/sync; save() pushes
//                 only user-edited fields (strategy, extraMonthly, manual debt
//                 overrides) — Plaid stays the source of truth for balances.
// TODO[plaid]: 5. syncFromInstitution() triggers a fresh /api/plaid/sync and
//                 returns { updated } so the UI can show "Synced X accounts".
// =============================================================================

export const plaidDataProvider: DataProvider = {
  id: 'plaid',

  async load(): Promise<AppState> {
    // TODO[plaid]: replace with `await fetch('/api/plaid/sync').then(r => r.json())`
    throw new Error(
      'plaidDataProvider.load() is not implemented yet. Implement /api/plaid/sync and remove this stub.'
    )
  },

  async save(_state: AppState): Promise<void> {
    // TODO[plaid]: PATCH user-editable fields to your backend; do not write balances.
    throw new Error('plaidDataProvider.save() is not implemented yet.')
  },

  async syncFromInstitution(): Promise<{ updated: number }> {
    // TODO[plaid]: trigger backend /api/plaid/sync, return count of updated accounts.
    throw new Error('plaidDataProvider.syncFromInstitution() is not implemented yet.')
  },
}

// =============================================================================
// Mapping helpers — fill these in when ready. The shapes below match Plaid's
// /liabilities/get response (credit_card / student / mortgage). Use this as
// scaffolding so the UI receives well-typed Debt records.
// =============================================================================

// TODO[plaid]: import type { CreditCardLiability, StudentLoan, Mortgage } from 'plaid'
// export function mapPlaidLiability(_l: unknown): import('../types').Debt {
//   throw new Error('mapPlaidLiability not implemented')
// }
//
// TODO[plaid]: map a single Plaid Transaction (category includes "Payment") →
// Payment record. Match transaction.account_id to debt id.
// export function mapPlaidTransaction(_t: unknown): import('../types').Payment {
//   throw new Error('mapPlaidTransaction not implemented')
// }
