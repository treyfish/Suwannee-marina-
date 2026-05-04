# Clearance

A premium personal debt tracking dashboard. Watch your interest accrue in real time, compare avalanche vs snowball strategies, and track your runway to zero.

Built with Next.js 16, React 19, TypeScript, and Tailwind CSS 4.

## Run

```bash
npm install
npm run dev
```

## Architecture

All financial data flows through a single `useFinancialData` hook backed by a swappable `DataProvider`. Manual entry persists to `localStorage`; a `plaidDataProvider` stub ships with marked TODOs so the integration is a one-line provider swap, not a rewrite.

- `src/lib/types.ts` — Debt / Payment / AppState shapes
- `src/lib/finance.ts` — interest accrual, payoff projection, end-of-month forecast (compound-daily)
- `src/lib/strategies.ts` — avalanche / snowball forward simulation + comparison
- `src/lib/providers/` — `manualDataProvider`, `plaidDataProvider` (stub), provider switch
- `src/hooks/useFinancialData.ts` — single data API the UI touches
- `src/components/` — UI

To enable Plaid later, edit `src/lib/providers/index.ts` to export `plaidDataProvider`, then implement the marked TODOs in `plaidDataProvider.ts` and a backend `/api/plaid/*` route.
