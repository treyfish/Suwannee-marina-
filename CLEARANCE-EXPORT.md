# Clearance — Complete Source Export

Everything you need to drop into a fresh GitHub repo and deploy.

---

## What this is

**Clearance** is a personal debt tracking dashboard. Dark, premium fintech-meets-fitness aesthetic. Built with Next.js 16 + React 19 + Tailwind 4 + TypeScript. No backend — all state lives in `localStorage`. Architected so Plaid integration is a one-line provider swap when you're ready.

## Why I'm sending this as one file

You already have the working code on the branch `claude/build-clearance-dashboard-eJ4HM` in `treyfish/suwannee-marina-`, but your Vercel account's `suwannee-marina-inc` project is linked to a *different* GitHub repo (`treyfish/Suwannee-marina-inc`), so pushing to the current repo doesn't auto-deploy. The cleanest path is a fresh repo dedicated to Clearance.

## Set it up in a new repo (5 minutes)

1. **Make a new GitHub repo** — call it whatever you want, e.g. `clearance`. Don't initialize with README/license (we'll push our own).

2. **On your machine**, make an empty folder and recreate the structure below. The fastest way is to copy each code block in this file into a file at the path shown in its heading. The structure is:
   ```
   clearance/
     .gitignore
     README.md
     next.config.ts
     package.json
     postcss.config.mjs
     tsconfig.json
     vercel.json
     src/
       app/
         globals.css
         icon.svg
         layout.tsx
         page.tsx
       components/
         AppShell.tsx
         BrandMark.tsx
         DebtCard.tsx
         DebtForm.tsx
         EmptyState.tsx
         LiveInterest.tsx
         Numeric.tsx
         PayoffChart.tsx
         ProgressBar.tsx
         QuickUpdate.tsx
         Sheet.tsx
         StrategyPanel.tsx
       hooks/
         useFinancialData.ts
         useNow.ts
       lib/
         finance.ts
         format.ts
         id.ts
         strategies.ts
         types.ts
         providers/
           index.ts
           manualDataProvider.ts
           plaidDataProvider.ts
           types.ts
   ```

3. **Run it locally**:
   ```bash
   npm install
   npm run dev      # http://localhost:3000
   npm run build    # verify production build
   ```

4. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit — Clearance debt dashboard"
   git branch -M main
   git remote add origin https://github.com/<your-username>/clearance.git
   git push -u origin main
   ```

5. **Deploy to Vercel**:
   - Vercel dashboard → "Add New" → "Project"
   - Import your new `clearance` repo
   - Framework auto-detects as Next.js — leave defaults
   - Click "Deploy"
   - Done. Auto-deploys on every push to `main`.

## Architecture in one screen

- **`src/lib/types.ts`** — `Debt`, `Payment`, `AppState` shapes.
- **`src/lib/finance.ts`** — compound-daily interest accrual, live balance, end-of-month projection, payoff-month formula. All pure functions.
- **`src/lib/strategies.ts`** — month-by-month forward simulation for avalanche and snowball, plus a comparison helper.
- **`src/lib/providers/`** — `manualDataProvider` writes to `localStorage`. `plaidDataProvider` ships as a stub with marked TODOs. `index.ts` is the one-line switch.
- **`src/hooks/useFinancialData.ts`** — the only data API the UI ever touches. CRUD + reconcile-on-payment + provider sync.
- **`src/hooks/useNow.ts`** — re-renders every second so the live interest ticker updates in place.
- **`src/components/`** — all UI. `AppShell` is the top bar + mobile tab bar. `DebtCard` is the live per-debt card. `StrategyPanel` has the avalanche/snowball toggle and extra-payment slider. `PayoffChart` is a hand-rolled SVG chart (no chart-lib dependency). `QuickUpdate` is the one-tap monthly check-off flow. `Sheet` is the side panel / bottom sheet primitive.
- **`src/app/page.tsx`** — composes everything. Single-page app inside Next.js App Router for free static export + instant deploys.

## Switching to Plaid later

When you're ready: open `src/lib/providers/index.ts`, comment out `manualDataProvider`, uncomment `plaidDataProvider`. Then implement the marked TODOs in `plaidDataProvider.ts` (4 backend routes, two type mappers). Nothing in the UI changes.

---

# Source files


## `package.json`

```json
{
  "name": "website-anatomy",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@types/node": "^25.5.0",
    "@types/react": "^19.2.14",
    "@types/react-dom": "^19.2.3",
    "lucide-react": "^1.7.0",
    "next": "^16.2.1",
    "react": "^19.2.4",
    "react-dom": "^19.2.4",
    "typescript": "^6.0.2"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.2.2",
    "autoprefixer": "^10.4.27",
    "eslint": "^9.39.4",
    "eslint-config-next": "^16.2.1",
    "postcss": "^8.5.8",
    "tailwindcss": "^4.2.2"
  }
}
```

## `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": [
        "./src/*"
      ]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    ".next/dev/types/**/*.ts"
  ],
  "exclude": [
    "node_modules"
  ]
}
```

## `next.config.ts`

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {}

export default nextConfig
```

## `postcss.config.mjs`

```js
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}

export default config
```

## `vercel.json`

```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "installCommand": "npm install",
  "outputDirectory": ".next"
}
```

## `.gitignore`

```text
# dependencies
/node_modules
/.pnp
.pnp.js
.yarn/install-state.gz

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem
.env
.env*.local
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
```

## `README.md`

```markdown
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
```

## `src/app/layout.tsx`

```tsx
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Clearance — debt, cleared.',
  description:
    'A premium personal debt tracking dashboard. Watch your interest accrue in real time, compare avalanche vs snowball, and clear your runway.',
  applicationName: 'Clearance',
  authors: [{ name: 'Clearance' }],
}

export const viewport: Viewport = {
  themeColor: '#0a0c10',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="ambient-glow" aria-hidden />
        <div className="relative z-10 min-h-dvh">{children}</div>
      </body>
    </html>
  )
}
```

## `src/app/page.tsx`

```tsx
'use client'

import { useEffect, useMemo, useState } from 'react'
import { Plus, RotateCcw, Database } from 'lucide-react'
import { useFinancialData } from '@/hooks/useFinancialData'
import { compareStrategies } from '@/lib/strategies'
import { AppShell, type Tab } from '@/components/AppShell'
import { DebtCard } from '@/components/DebtCard'
import { DebtForm } from '@/components/DebtForm'
import { Sheet } from '@/components/Sheet'
import { StrategyPanel } from '@/components/StrategyPanel'
import { QuickUpdate } from '@/components/QuickUpdate'
import { PayoffChart } from '@/components/PayoffChart'
import { EmptyState } from '@/components/EmptyState'
import type { Debt } from '@/lib/types'

type SheetMode =
  | { kind: 'closed' }
  | { kind: 'add' }
  | { kind: 'edit'; debt: Debt }
  | { kind: 'quick-update' }

export default function HomePage() {
  const data = useFinancialData()
  const [tab, setTab] = useState<Tab>('home')
  const [sheet, setSheet] = useState<SheetMode>({ kind: 'closed' })

  // Keyboard shortcuts: n = new debt, u = quick update, esc handled in Sheet
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      if (sheet.kind !== 'closed') return
      if (e.key === 'n' || e.key === 'N') {
        e.preventDefault()
        setSheet({ kind: 'add' })
      } else if ((e.key === 'u' || e.key === 'U') && data.state.debts.length > 0) {
        e.preventDefault()
        setSheet({ kind: 'quick-update' })
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [sheet.kind, data.state.debts.length])

  const debts = data.state.debts
  const hasDebts = debts.length > 0

  const comparison = useMemo(
    () => compareStrategies(debts, data.state.strategy, data.state.extraMonthly),
    [debts, data.state.strategy, data.state.extraMonthly]
  )

  if (!data.isReady) {
    return (
      <div className="flex min-h-dvh items-center justify-center text-[var(--color-text-dim)]">
        <span className="mono text-sm">Loading…</span>
      </div>
    )
  }

  return (
    <>
      <AppShell
        debts={debts}
        tab={tab}
        onTabChange={setTab}
        onAddDebt={() => setSheet({ kind: 'add' })}
        onQuickUpdate={() => setSheet({ kind: 'quick-update' })}
        hasDebts={hasDebts}
      />

      <main
        className="mx-auto w-full max-w-6xl px-4 pb-24 md:px-6 md:pb-12"
        style={{ paddingTop: '24px' }}
      >
        {!hasDebts ? (
          <EmptyState
            onAdd={() => setSheet({ kind: 'add' })}
            onDemo={() => data.seedDemo()}
          />
        ) : (
          <>
            {/* Mobile: switch on tab. Desktop: show everything. */}
            <div className={tab === 'home' ? 'block' : 'hidden md:block'}>
              <PayoffChart
                active={comparison.active}
                baseline={comparison.baseline}
                className="mb-5"
              />
            </div>

            <div className={tab === 'strategy' ? 'block md:mt-0' : 'hidden md:block md:mt-0'}>
              <StrategyPanel
                debts={debts}
                strategy={data.state.strategy}
                extraMonthly={data.state.extraMonthly}
                onStrategyChange={data.setStrategy}
                onExtraChange={data.setExtraMonthly}
              />
            </div>

            <div
              className={
                'mt-5 ' + (tab === 'home' || tab === 'update' ? 'block' : 'hidden md:block')
              }
            >
              <SectionHeader
                title="Your debts"
                trailing={
                  <button
                    onClick={() => setSheet({ kind: 'add' })}
                    className="btn btn-ghost text-[12.5px]"
                  >
                    <Plus size={14} /> Add another
                  </button>
                }
              />
              <div className="grid gap-4 md:grid-cols-2">
                {debts.map((debt, idx) => (
                  <div
                    key={debt.id}
                    style={{ animationDelay: `${idx * 40}ms` }}
                    className="fade-up"
                  >
                    <DebtCard
                      debt={debt}
                      onEdit={() => setSheet({ kind: 'edit', debt })}
                      onQuickPay={() => setSheet({ kind: 'quick-update' })}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className={tab === 'settings' ? 'block' : 'hidden md:block'}>
              <SettingsBlock
                providerId={data.providerId}
                onReset={() => {
                  if (confirm('Erase all debts and payment history? This cannot be undone.')) {
                    data.resetAll()
                  }
                }}
                onSeedDemo={() => {
                  if (
                    debts.length === 0 ||
                    confirm('Replace current data with sample debts?')
                  ) {
                    data.resetAll()
                    data.seedDemo()
                  }
                }}
              />
            </div>
          </>
        )}
      </main>

      <Sheet
        open={sheet.kind === 'add'}
        onClose={() => setSheet({ kind: 'closed' })}
        title="Add a debt"
        description="Be precise. The math is only as accurate as your inputs."
      >
        {sheet.kind === 'add' ? (
          <DebtForm
            onSubmit={input => {
              data.addDebt(input)
              setSheet({ kind: 'closed' })
            }}
            onCancel={() => setSheet({ kind: 'closed' })}
          />
        ) : null}
      </Sheet>

      <Sheet
        open={sheet.kind === 'edit'}
        onClose={() => setSheet({ kind: 'closed' })}
        title="Edit debt"
      >
        {sheet.kind === 'edit' ? (
          <DebtForm
            debt={sheet.debt}
            onSubmit={input => {
              data.updateDebt(sheet.debt.id, input)
              setSheet({ kind: 'closed' })
            }}
            onDelete={() => {
              data.deleteDebt(sheet.debt.id)
              setSheet({ kind: 'closed' })
            }}
            onCancel={() => setSheet({ kind: 'closed' })}
          />
        ) : null}
      </Sheet>

      <Sheet
        open={sheet.kind === 'quick-update'}
        onClose={() => setSheet({ kind: 'closed' })}
        title="Update balances"
        description="One tap per debt. Interest accrued since you last reconciled is rolled in."
      >
        {sheet.kind === 'quick-update' ? (
          <QuickUpdate
            debts={debts}
            onPay={(id, amount, kind) => data.recordPayment(id, amount, kind)}
            onDone={() => setSheet({ kind: 'closed' })}
          />
        ) : null}
      </Sheet>
    </>
  )
}

function SectionHeader({
  title,
  trailing,
}: {
  title: string
  trailing?: React.ReactNode
}) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <h2 className="text-[11px] uppercase tracking-[0.16em] text-[var(--color-text-dim)]">
        {title}
      </h2>
      {trailing}
    </div>
  )
}

function SettingsBlock({
  providerId,
  onReset,
  onSeedDemo,
}: {
  providerId: 'manual' | 'plaid'
  onReset: () => void
  onSeedDemo: () => void
}) {
  return (
    <section className="surface mt-5 flex flex-col gap-4 p-5 md:p-6 fade-up">
      <SectionHeader title="Settings" />
      <div className="flex flex-col gap-3 text-[13px]">
        <Row
          label="Data source"
          value={providerId === 'manual' ? 'Manual entry · localStorage' : 'Plaid (connected)'}
          icon={<Database size={14} />}
        />
        <Row
          label="Storage location"
          value="This device only. Nothing leaves your browser."
        />
      </div>
      <div className="mt-2 flex flex-wrap gap-2 border-t border-[var(--color-border)] pt-4">
        <button onClick={onSeedDemo} className="btn btn-secondary text-[12.5px]">
          Reload sample data
        </button>
        <button onClick={onReset} className="btn btn-danger text-[12.5px]">
          <RotateCcw size={14} /> Reset everything
        </button>
      </div>
    </section>
  )
}

function Row({
  label,
  value,
  icon,
}: {
  label: string
  value: string
  icon?: React.ReactNode
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="flex items-center gap-2 text-[var(--color-text-muted)]">
        {icon}
        {label}
      </span>
      <span className="text-right text-[var(--color-text)]">{value}</span>
    </div>
  )
}
```

## `src/app/globals.css`

```css
@import "tailwindcss";

@theme {
  --color-bg: #0a0c10;
  --color-surface: #11141a;
  --color-surface-elev: #171b22;
  --color-surface-hover: #1c212a;
  --color-border: rgba(255, 255, 255, 0.06);
  --color-border-strong: rgba(255, 255, 255, 0.10);
  --color-text: #fafafa;
  --color-text-muted: rgba(250, 250, 250, 0.60);
  --color-text-dim: rgba(250, 250, 250, 0.38);
  --color-accent: #34D399;
  --color-accent-soft: rgba(52, 211, 153, 0.12);
  --color-accent-strong: #10b981;
  --color-danger: #F87171;
  --color-warning: #FBBF24;

  --font-family-sans: 'Inter', system-ui, -apple-system, sans-serif;
  --font-family-mono: 'JetBrains Mono', ui-monospace, 'SF Mono', monospace;
}

* {
  border-color: var(--color-border);
}

html {
  background: var(--color-bg);
  color-scheme: dark;
}

html, body {
  height: 100%;
}

body {
  background: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-family-sans);
  font-feature-settings: "cv11", "ss01", "ss03";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  overscroll-behavior-y: none;
}

/* Tabular numerals on every number. */
.num,
.tabular {
  font-variant-numeric: tabular-nums;
  font-feature-settings: "tnum" 1, "ss01" 1, "cv11" 1;
}

.mono {
  font-family: var(--font-family-mono);
  font-variant-numeric: tabular-nums;
}

/* Subtle ambient glow behind the dashboard — anchors the eye top-center. */
.ambient-glow {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  background:
    radial-gradient(60% 50% at 50% -10%, rgba(52, 211, 153, 0.08), transparent 60%),
    radial-gradient(40% 40% at 100% 0%, rgba(99, 102, 241, 0.05), transparent 60%);
}

/* Hairline border helpers */
.hairline {
  border: 1px solid var(--color-border);
}
.hairline-b {
  border-bottom: 1px solid var(--color-border);
}
.hairline-t {
  border-top: 1px solid var(--color-border);
}

/* Card surface */
.surface {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
}
.surface-elev {
  background: var(--color-surface-elev);
  border: 1px solid var(--color-border-strong);
  border-radius: 12px;
}

/* Inputs */
.field {
  background: var(--color-surface);
  border: 1px solid var(--color-border-strong);
  color: var(--color-text);
  border-radius: 8px;
  padding: 10px 12px;
  font-family: var(--font-family-sans);
  font-size: 14px;
  width: 100%;
  transition: border-color 120ms ease, background-color 120ms ease;
}
.field:hover {
  background: var(--color-surface-hover);
}
.field:focus {
  outline: none;
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px var(--color-accent-soft);
}
.field::placeholder {
  color: var(--color-text-dim);
}

.field-num {
  font-variant-numeric: tabular-nums;
  font-feature-settings: "tnum" 1;
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 8px;
  padding: 10px 14px;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.01em;
  transition: background-color 120ms ease, border-color 120ms ease, color 120ms ease, transform 120ms ease;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
}
.btn:active {
  transform: translateY(1px);
}
.btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}
.btn-primary {
  background: var(--color-accent);
  color: #04140c;
  border: 1px solid var(--color-accent);
  font-weight: 600;
}
.btn-primary:hover:not(:disabled) {
  background: var(--color-accent-strong);
  border-color: var(--color-accent-strong);
}
.btn-secondary {
  background: var(--color-surface-elev);
  color: var(--color-text);
  border: 1px solid var(--color-border-strong);
}
.btn-secondary:hover:not(:disabled) {
  background: var(--color-surface-hover);
  border-color: rgba(255, 255, 255, 0.18);
}
.btn-ghost {
  background: transparent;
  color: var(--color-text-muted);
  border: 1px solid transparent;
}
.btn-ghost:hover:not(:disabled) {
  color: var(--color-text);
  background: var(--color-surface);
}
.btn-danger {
  background: transparent;
  color: var(--color-danger);
  border: 1px solid rgba(248, 113, 113, 0.3);
}
.btn-danger:hover:not(:disabled) {
  background: rgba(248, 113, 113, 0.08);
}

/* Focus rings */
:focus-visible {
  outline: none;
}
.btn:focus-visible,
.field:focus-visible,
.icon-btn:focus-visible,
[role="button"]:focus-visible,
[role="tab"]:focus-visible {
  box-shadow: 0 0 0 2px var(--color-bg), 0 0 0 4px var(--color-accent);
}

/* Icon button */
.icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  color: var(--color-text-muted);
  background: transparent;
  border: 1px solid transparent;
  cursor: pointer;
  transition: background-color 120ms ease, color 120ms ease, border-color 120ms ease;
}
.icon-btn:hover {
  background: var(--color-surface);
  color: var(--color-text);
  border-color: var(--color-border);
}

/* Animations */
@keyframes fade-up {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}
.fade-up {
  animation: fade-up 320ms ease-out both;
}

@keyframes fade-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}
.fade-in {
  animation: fade-in 200ms ease-out both;
}

@keyframes sheet-in-right {
  from { transform: translateX(100%); }
  to   { transform: translateX(0); }
}
.sheet-in-right {
  animation: sheet-in-right 260ms cubic-bezier(0.22, 1, 0.36, 1) both;
}

@keyframes sheet-in-bottom {
  from { transform: translateY(100%); }
  to   { transform: translateY(0); }
}
.sheet-in-bottom {
  animation: sheet-in-bottom 260ms cubic-bezier(0.22, 1, 0.36, 1) both;
}

@keyframes pulse-accent {
  0%   { box-shadow: 0 0 0 0 rgba(52, 211, 153, 0.4); }
  70%  { box-shadow: 0 0 0 10px rgba(52, 211, 153, 0); }
  100% { box-shadow: 0 0 0 0 rgba(52, 211, 153, 0); }
}
.pulse-accent {
  animation: pulse-accent 800ms ease-out;
}

/* Scrollbar — subtle, dark */
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.06);
  border-radius: 8px;
  border: 2px solid var(--color-bg);
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.12);
}

/* Removes the ugly autofill background in Chrome */
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-text-fill-color: var(--color-text);
  transition: background-color 9999s ease-in-out 0s;
  caret-color: var(--color-text);
}

/* iOS tap highlight removal */
* {
  -webkit-tap-highlight-color: transparent;
}
```

## `src/app/icon.svg`

```xml
<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
  <rect width="32" height="32" rx="7" fill="#0a0c10"/>
  <g transform="translate(0,0)">
    <circle cx="6" cy="27" r="0.85" fill="#34D399" opacity="0.22"/>
    <circle cx="9" cy="25.4" r="0.8" fill="#34D399" opacity="0.36"/>
    <circle cx="12" cy="23" r="0.7" fill="#34D399" opacity="0.52"/>
    <path d="M 6.5 14.5 L 14 17 L 14.8 25 Z" fill="#34D399" opacity="0.55"/>
    <path d="M 6.5 14.5 L 27 6 L 14 17 Z" fill="#34D399"/>
  </g>
</svg>
```

## `src/components/AppShell.tsx`

```tsx
'use client'

import { Plus, ListChecks, Home, BarChart3, Settings } from 'lucide-react'
import type { Debt } from '@/lib/types'
import { useNow } from '@/hooks/useNow'
import { liveBalance } from '@/lib/finance'
import { formatCurrency } from '@/lib/format'
import { Numeric } from './Numeric'
import { LiveInterestTotal } from './LiveInterest'
import { BrandMark } from './BrandMark'

export type Tab = 'home' | 'strategy' | 'update' | 'settings'

type Props = {
  debts: Debt[]
  tab: Tab
  onTabChange: (t: Tab) => void
  onAddDebt: () => void
  onQuickUpdate: () => void
  hasDebts: boolean
}

export function AppShell({
  debts,
  tab,
  onTabChange,
  onAddDebt,
  onQuickUpdate,
  hasDebts,
}: Props) {
  const now = useNow(1000)
  const totalLive = debts.reduce((s, d) => s + liveBalance(d, now), 0)
  const totalOriginal = debts.reduce(
    (s, d) => s + Math.max(d.originalBalance, d.currentBalance),
    0
  )
  const cleared = Math.max(0, totalOriginal - totalLive)
  const pctCleared = totalOriginal > 0 ? (cleared / totalOriginal) * 100 : 0

  return (
    <header className="sticky top-0 z-30 border-b border-[var(--color-border)] bg-[var(--color-bg)]/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6 md:py-4">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-lg"
            style={{
              background: 'var(--color-accent-soft)',
              color: 'var(--color-accent)',
              border: '1px solid rgba(52,211,153,0.25)',
            }}
          >
            <BrandMark size={20} title="Clearance" />
          </div>
          <span className="text-[14px] font-semibold tracking-tight">Clearance</span>
        </div>

        {/* Total balance — center on desktop */}
        {hasDebts ? (
          <div className="hidden flex-col items-center text-center md:flex">
            <span className="text-[10px] uppercase tracking-[0.16em] text-[var(--color-text-dim)]">
              Total balance, live
            </span>
            <Numeric
              value={totalLive}
              className="text-[28px] font-semibold leading-tight tracking-tight"
            />
            <span className="mt-0.5 text-[11px] text-[var(--color-text-muted)]">
              <span className="mono text-[var(--color-accent)]">
                {pctCleared.toFixed(1)}%
              </span>{' '}
              cleared · {formatCurrency(cleared, { whole: true })}
            </span>
          </div>
        ) : (
          <div className="hidden md:block" />
        )}

        {/* Actions */}
        <div className="flex items-center gap-2">
          {hasDebts ? (
            <button onClick={onQuickUpdate} className="btn btn-secondary text-[12.5px]">
              <ListChecks size={15} />
              <span className="hidden sm:inline">Quick update</span>
            </button>
          ) : null}
          <button onClick={onAddDebt} className="btn btn-primary text-[12.5px]">
            <Plus size={15} />
            <span className="hidden sm:inline">Add debt</span>
          </button>
        </div>
      </div>

      {/* Mobile: stacked total under top bar */}
      {hasDebts ? (
        <div className="border-t border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 md:hidden">
          <div className="flex items-end justify-between gap-3">
            <div>
              <div className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-dim)]">
                Total balance, live
              </div>
              <Numeric
                value={totalLive}
                className="text-[26px] font-semibold tracking-tight leading-none"
              />
              <div className="mt-1 text-[11px] text-[var(--color-text-muted)]">
                <span className="mono text-[var(--color-accent)]">
                  {pctCleared.toFixed(1)}%
                </span>{' '}
                cleared
              </div>
            </div>
            <LiveInterestTotal debts={debts} className="items-end text-right" />
          </div>
        </div>
      ) : null}

      {/* Mobile bottom tab bar */}
      {hasDebts ? <MobileTabBar tab={tab} onTabChange={onTabChange} /> : null}
    </header>
  )
}

function MobileTabBar({ tab, onTabChange }: { tab: Tab; onTabChange: (t: Tab) => void }) {
  const tabs: { id: Tab; label: string; Icon: React.ComponentType<{ size?: number }> }[] = [
    { id: 'home', label: 'Home', Icon: Home },
    { id: 'strategy', label: 'Strategy', Icon: BarChart3 },
    { id: 'update', label: 'Update', Icon: ListChecks },
    { id: 'settings', label: 'Settings', Icon: Settings },
  ]
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-30 border-t border-[var(--color-border)] bg-[var(--color-bg)]/95 backdrop-blur md:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <ul className="mx-auto flex max-w-md items-stretch justify-around">
        {tabs.map(({ id, label, Icon }) => {
          const active = tab === id
          return (
            <li key={id} className="flex-1">
              <button
                onClick={() => onTabChange(id)}
                className="flex w-full flex-col items-center gap-1 py-2.5 text-[10px] uppercase tracking-wider transition-colors"
                style={{
                  color: active ? 'var(--color-accent)' : 'var(--color-text-dim)',
                }}
                aria-current={active ? 'page' : undefined}
              >
                <Icon size={18} />
                <span>{label}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
```

## `src/components/BrandMark.tsx`

```tsx
type Props = {
  size?: number
  className?: string
  showTrail?: boolean
  title?: string
}

// Paper airplane lifting off, leaving a trail of coins behind. The plane
// uses two opacities to suggest a folded crease without an extra background
// reference, so the mark works on any surface (incl. favicons).
export function BrandMark({ size = 32, className, showTrail = true, title }: Props) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {showTrail ? (
        <g fill="currentColor">
          <circle cx="3" cy="28.5" r="1" opacity="0.22" />
          <circle cx="6.6" cy="26.5" r="0.95" opacity="0.36" />
          <circle cx="10.2" cy="23.6" r="0.85" opacity="0.52" />
        </g>
      ) : null}

      {/* Lower flap — slightly dimmer to suggest the fold */}
      <path d="M 4 14 L 13 17 L 14 26 Z" fill="currentColor" opacity="0.55" />
      {/* Upper flap — full strength */}
      <path d="M 4 14 L 28 4 L 13 17 Z" fill="currentColor" />
    </svg>
  )
}
```

## `src/components/DebtCard.tsx`

```tsx
'use client'

import {
  CreditCard,
  GraduationCap,
  Car,
  Home,
  Wallet,
  HeartPulse,
  Coins,
  Pencil,
  ChevronRight,
} from 'lucide-react'
import type { Debt, DebtType } from '@/lib/types'
import { useNow } from '@/hooks/useNow'
import {
  forecastEndOfMonth,
  liveBalance,
  monthsToPayoff,
  payoffDate,
  payoffPercent,
} from '@/lib/finance'
import {
  formatCurrency,
  formatLongDate,
  formatMonths,
  formatPercent,
  ordinalDay,
} from '@/lib/format'
import { ProgressBar } from './ProgressBar'
import { LiveInterest } from './LiveInterest'

const typeMeta: Record<DebtType, { label: string; Icon: React.ComponentType<{ size?: number }> }> = {
  credit_card:  { label: 'Credit card',   Icon: CreditCard },
  student_loan: { label: 'Student loan',  Icon: GraduationCap },
  auto:         { label: 'Auto loan',     Icon: Car },
  mortgage:     { label: 'Mortgage',      Icon: Home },
  personal:     { label: 'Personal loan', Icon: Wallet },
  medical:      { label: 'Medical',       Icon: HeartPulse },
  other:        { label: 'Other',         Icon: Coins },
}

type Props = {
  debt: Debt
  onEdit: () => void
  onQuickPay?: () => void
}

export function DebtCard({ debt, onEdit, onQuickPay }: Props) {
  const now = useNow(1000)
  const live = liveBalance(debt, now)
  const pct = payoffPercent({ ...debt, currentBalance: live })
  const meta = typeMeta[debt.type]
  const Icon = meta.Icon

  const months = monthsToPayoff(live, debt.apr, debt.monthlyPayment)
  const date = payoffDate(months)
  const eom = forecastEndOfMonth(debt, new Date(now))

  const aprIsHigh = debt.apr >= 18
  const willNeverPayOff = !Number.isFinite(months)

  return (
    <article className="surface flex flex-col gap-5 p-5 fade-up transition-colors hover:border-[var(--color-border-strong)]">
      <header className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
            style={{
              background: 'var(--color-surface-elev)',
              color: 'var(--color-text)',
              border: '1px solid var(--color-border-strong)',
            }}
            aria-hidden
          >
            <Icon size={18} />
          </div>
          <div className="min-w-0">
            <h3 className="truncate text-[15px] font-semibold tracking-tight">{debt.name}</h3>
            <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] uppercase tracking-wider text-[var(--color-text-dim)]">
              <span>{meta.label}</span>
              <span className="text-[var(--color-text-dim)]">·</span>
              <span
                className="mono"
                style={{ color: aprIsHigh ? 'var(--color-danger)' : 'var(--color-text-muted)' }}
              >
                {formatPercent(debt.apr)} APR
              </span>
              <span className="text-[var(--color-text-dim)]">·</span>
              <span>Due {ordinalDay(debt.dueDayOfMonth)}</span>
            </div>
          </div>
        </div>
        <button onClick={onEdit} className="icon-btn" aria-label={`Edit ${debt.name}`}>
          <Pencil size={15} />
        </button>
      </header>

      <div className="flex items-end justify-between gap-3">
        <div>
          <div className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-dim)]">
            Balance
          </div>
          <div className="mono text-[28px] font-semibold leading-none tracking-tight">
            {formatCurrency(live)}
          </div>
        </div>
        <LiveInterest debt={debt} />
      </div>

      <div>
        <ProgressBar percent={pct} />
        <div className="mt-2 flex items-center justify-between text-[11px] text-[var(--color-text-dim)]">
          <span>
            <span className="mono text-[var(--color-text-muted)]">{pct.toFixed(1)}%</span>{' '}
            paid off
          </span>
          <span className="mono text-[var(--color-text-dim)]">
            of {formatCurrency(debt.originalBalance, { whole: true })}
          </span>
        </div>
      </div>

      <dl className="grid grid-cols-2 gap-x-4 gap-y-3 border-t border-[var(--color-border)] pt-4 text-[12px]">
        <div>
          <dt className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-dim)]">
            Min payment
          </dt>
          <dd className="mono mt-1 text-[var(--color-text)]">
            {formatCurrency(debt.minimumPayment)}
          </dd>
        </div>
        <div>
          <dt className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-dim)]">
            Your monthly
          </dt>
          <dd className="mono mt-1 text-[var(--color-text)]">
            {formatCurrency(debt.monthlyPayment)}
          </dd>
        </div>
        <div>
          <dt className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-dim)]">
            Payoff date
          </dt>
          <dd className="mono mt-1 text-[var(--color-text)]">
            {willNeverPayOff ? '—' : date ? formatLongDate(date) : '—'}
          </dd>
        </div>
        <div>
          <dt className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-dim)]">
            Time to clear
          </dt>
          <dd className="mono mt-1" style={{ color: willNeverPayOff ? 'var(--color-danger)' : 'var(--color-accent)' }}>
            {willNeverPayOff ? 'Never at this rate' : formatMonths(months)}
          </dd>
        </div>
      </dl>

      <div
        className="flex items-center justify-between rounded-lg border border-dashed border-[var(--color-border-strong)] px-3 py-2.5 text-[12px]"
      >
        <div>
          <div className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-dim)]">
            Projected end of month
          </div>
          <div className="mono mt-0.5 text-[14px] font-medium">
            {formatCurrency(eom.balEOM)}
          </div>
        </div>
        <div className="text-right">
          <div className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-dim)]">
            Interest this month
          </div>
          <div
            className="mono mt-0.5 text-[13px]"
            style={{ color: 'var(--color-danger)' }}
          >
            + {formatCurrency(eom.interestThisMonth)}
          </div>
        </div>
      </div>

      {onQuickPay ? (
        <button
          onClick={onQuickPay}
          className="btn btn-secondary justify-between"
          aria-label={`Record a payment for ${debt.name}`}
        >
          <span>Record payment</span>
          <ChevronRight size={16} />
        </button>
      ) : null}
    </article>
  )
}
```

## `src/components/DebtForm.tsx`

```tsx
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
```

## `src/components/EmptyState.tsx`

```tsx
'use client'

import { Plus } from 'lucide-react'
import { BrandMark } from './BrandMark'

type Props = {
  onAdd: () => void
  onDemo: () => void
}

export function EmptyState({ onAdd, onDemo }: Props) {
  return (
    <div className="surface flex flex-col items-center justify-center gap-6 px-8 py-16 text-center fade-up">
      <div
        className="flex h-16 w-16 items-center justify-center rounded-2xl"
        style={{
          background: 'var(--color-accent-soft)',
          color: 'var(--color-accent)',
          border: '1px solid rgba(52,211,153,0.25)',
        }}
      >
        <BrandMark size={32} />
      </div>
      <div className="max-w-md">
        <h2 className="text-xl font-semibold tracking-tight">Clear runway, ahead.</h2>
        <p className="mt-2 text-sm text-[var(--color-text-muted)]">
          Add your debts to start watching the interest tick — and the balance fall.
          Everything stays on this device until you say otherwise.
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button onClick={onAdd} className="btn btn-primary">
          <Plus size={16} /> Add your first debt
        </button>
        <button onClick={onDemo} className="btn btn-ghost">
          Try with sample data
        </button>
      </div>
    </div>
  )
}
```

## `src/components/LiveInterest.tsx`

```tsx
'use client'

import type { Debt } from '@/lib/types'
import { dailyInterestAt, liveBalance } from '@/lib/finance'
import { useNow } from '@/hooks/useNow'
import { formatCurrency } from '@/lib/format'

type Props = {
  debt: Debt
  className?: string
  showLabel?: boolean
}

export function LiveInterest({ debt, className, showLabel = true }: Props) {
  const now = useNow(1000)
  const live = liveBalance(debt, now)
  const daily = dailyInterestAt(live, debt.apr)
  const perSecond = daily / 86400
  // Show interest accrued in the last 24h continuously by stepping per second.
  const seconds = (now / 1000) % 86400
  const accrued = perSecond * seconds

  return (
    <div className={`flex items-baseline gap-2 ${className ?? ''}`}>
      <span
        className="mono text-[13px] tracking-tight"
        style={{ color: 'var(--color-danger)' }}
        aria-label="interest accrued today"
      >
        + {formatCurrency(accrued, { micro: true })}
      </span>
      {showLabel ? (
        <span className="text-[11px] uppercase tracking-wider text-[var(--color-text-dim)]">
          today
        </span>
      ) : null}
    </div>
  )
}

type AggProps = {
  debts: Debt[]
  className?: string
}

export function LiveInterestTotal({ debts, className }: AggProps) {
  const now = useNow(1000)
  let totalDaily = 0
  for (const d of debts) {
    const live = liveBalance(d, now)
    totalDaily += dailyInterestAt(live, d.apr)
  }
  const perSecond = totalDaily / 86400
  const seconds = (now / 1000) % 86400
  const accruedToday = perSecond * seconds

  return (
    <div className={`flex flex-col gap-1 ${className ?? ''}`}>
      <span className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-dim)]">
        Interest accruing today
      </span>
      <span
        className="mono text-base font-medium"
        style={{ color: 'var(--color-danger)' }}
      >
        + {formatCurrency(accruedToday, { micro: true })}
      </span>
    </div>
  )
}
```

## `src/components/Numeric.tsx`

```tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { formatCurrency } from '@/lib/format'

type Props = {
  value: number
  className?: string
  whole?: boolean
  micro?: boolean
  duration?: number
  animate?: boolean
}

// Smoothly tweens between values so digits don't jump.
export function Numeric({
  value,
  className,
  whole,
  micro,
  duration = 600,
  animate = true,
}: Props) {
  const [display, setDisplay] = useState<number>(value)
  const fromRef = useRef<number>(value)
  const startRef = useRef<number>(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (!animate) {
      setDisplay(value)
      return
    }
    fromRef.current = display
    startRef.current = performance.now()
    const tick = (t: number) => {
      const elapsed = t - startRef.current
      const k = Math.min(1, elapsed / duration)
      const eased = 1 - Math.pow(1 - k, 3)
      const next = fromRef.current + (value - fromRef.current) * eased
      setDisplay(next)
      if (k < 1) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, animate, duration])

  return (
    <span className={`tabular ${className ?? ''}`}>
      {formatCurrency(display, { whole, micro })}
    </span>
  )
}
```

## `src/components/PayoffChart.tsx`

```tsx
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
```

## `src/components/ProgressBar.tsx`

```tsx
'use client'

type Props = {
  percent: number
  className?: string
  height?: number
}

export function ProgressBar({ percent, className, height = 6 }: Props) {
  const clamped = Math.max(0, Math.min(100, percent))
  return (
    <div
      className={`relative w-full overflow-hidden rounded-full ${className ?? ''}`}
      style={{
        height,
        background: 'rgba(255,255,255,0.06)',
      }}
      role="progressbar"
      aria-valuenow={Math.round(clamped)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full rounded-full transition-[width] duration-700 ease-out"
        style={{
          width: `${clamped}%`,
          background:
            'linear-gradient(90deg, rgba(52,211,153,0.85), rgba(52,211,153,1))',
          boxShadow: clamped > 0 ? '0 0 12px rgba(52,211,153,0.25)' : 'none',
        }}
      />
    </div>
  )
}
```

## `src/components/QuickUpdate.tsx`

```tsx
'use client'

import { useMemo, useState } from 'react'
import { Check, ChevronRight } from 'lucide-react'
import type { Debt } from '@/lib/types'
import { liveBalance } from '@/lib/finance'
import { formatCurrency } from '@/lib/format'
import { useNow } from '@/hooks/useNow'

type Props = {
  debts: Debt[]
  onPay: (debtId: string, amount: number, kind: 'minimum' | 'custom') => void
  onDone: () => void
}

type RowState = {
  status: 'pending' | 'paid' | 'skipped'
  customMode: boolean
  customValue: string
  appliedAmount?: number
}

const initialRow = (): RowState => ({
  status: 'pending',
  customMode: false,
  customValue: '',
})

export function QuickUpdate({ debts, onPay, onDone }: Props) {
  const now = useNow(2000)
  const [rows, setRows] = useState<Record<string, RowState>>(() =>
    Object.fromEntries(debts.map(d => [d.id, initialRow()]))
  )

  const total = useMemo(
    () => debts.reduce((s, d) => s + liveBalance(d, now), 0),
    [debts, now]
  )
  const paidCount = Object.values(rows).filter(r => r.status === 'paid').length
  const decidedCount = Object.values(rows).filter(r => r.status !== 'pending').length

  const setRow = (id: string, patch: Partial<RowState>) =>
    setRows(s => ({ ...s, [id]: { ...s[id], ...patch } }))

  const payMinimum = (debt: Debt) => {
    onPay(debt.id, debt.minimumPayment, 'minimum')
    setRow(debt.id, { status: 'paid', appliedAmount: debt.minimumPayment, customMode: false })
  }

  const payCustom = (debt: Debt) => {
    const n = Number(rows[debt.id]?.customValue.replace(/[$,\s]/g, '') ?? '')
    if (!Number.isFinite(n) || n <= 0) return
    onPay(debt.id, n, 'custom')
    setRow(debt.id, { status: 'paid', appliedAmount: n, customMode: false, customValue: '' })
  }

  const skip = (debt: Debt) => setRow(debt.id, { status: 'skipped', customMode: false })

  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-lg border border-[var(--color-border-strong)] bg-[var(--color-surface-elev)] px-4 py-4">
        <div className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-dim)]">
          Total balance, live
        </div>
        <div className="mono mt-1 text-[26px] font-semibold tracking-tight">
          {formatCurrency(total)}
        </div>
        <div className="mt-1 text-[12px] text-[var(--color-text-muted)]">
          {paidCount} of {debts.length} paid · {decidedCount} of {debts.length} decided
        </div>
      </div>

      <ul className="flex flex-col gap-3">
        {debts.map(debt => {
          const row = rows[debt.id] ?? initialRow()
          const live = liveBalance(debt, now)
          const isPaid = row.status === 'paid'
          const isSkipped = row.status === 'skipped'

          return (
            <li
              key={debt.id}
              className={
                'rounded-xl border p-4 transition-colors ' +
                (isPaid
                  ? 'border-[var(--color-accent)] bg-[var(--color-accent-soft)] pulse-accent'
                  : isSkipped
                    ? 'border-[var(--color-border)] opacity-60'
                    : 'border-[var(--color-border-strong)] bg-[var(--color-surface)]')
              }
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="truncate text-[14px] font-medium">{debt.name}</div>
                  <div className="mono mt-1 text-[18px] tracking-tight">
                    {formatCurrency(live)}
                  </div>
                </div>
                {isPaid && row.appliedAmount != null ? (
                  <div
                    className="flex items-center gap-1 text-[12px]"
                    style={{ color: 'var(--color-accent)' }}
                  >
                    <Check size={14} /> Paid {formatCurrency(row.appliedAmount)}
                  </div>
                ) : isSkipped ? (
                  <div className="text-[12px] text-[var(--color-text-dim)]">Skipped</div>
                ) : null}
              </div>

              {!isPaid && !isSkipped ? (
                row.customMode ? (
                  <form
                    onSubmit={e => {
                      e.preventDefault()
                      payCustom(debt)
                    }}
                    className="mt-3 flex flex-wrap items-center gap-2"
                  >
                    <span className="mono text-[var(--color-text-dim)]">$</span>
                    <input
                      autoFocus
                      className="field field-num flex-1 min-w-[120px]"
                      inputMode="decimal"
                      placeholder={`>= ${debt.minimumPayment}`}
                      value={row.customValue}
                      onChange={e => setRow(debt.id, { customValue: e.target.value })}
                    />
                    <button type="submit" className="btn btn-primary">
                      Apply
                    </button>
                    <button
                      type="button"
                      onClick={() => setRow(debt.id, { customMode: false })}
                      className="btn btn-ghost"
                    >
                      Back
                    </button>
                  </form>
                ) : (
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    <button
                      onClick={() => payMinimum(debt)}
                      className="btn btn-secondary text-[12.5px]"
                    >
                      Min · {formatCurrency(debt.minimumPayment, { whole: true })}
                    </button>
                    <button
                      onClick={() => setRow(debt.id, { customMode: true })}
                      className="btn btn-secondary text-[12.5px]"
                    >
                      Custom
                    </button>
                    <button
                      onClick={() => skip(debt)}
                      className="btn btn-ghost text-[12.5px]"
                    >
                      Skip
                    </button>
                  </div>
                )
              ) : null}
            </li>
          )
        })}
      </ul>

      <div className="flex justify-end gap-2 border-t border-[var(--color-border)] pt-5">
        <button onClick={onDone} className="btn btn-primary">
          Done <ChevronRight size={16} />
        </button>
      </div>
    </div>
  )
}
```

## `src/components/Sheet.tsx`

```tsx
'use client'

import { useEffect } from 'react'
import { X } from 'lucide-react'

type Props = {
  open: boolean
  onClose: () => void
  title: string
  description?: string
  children: React.ReactNode
  widthClass?: string
}

// Right side panel on desktop (≥1024px), bottom sheet on mobile.
export function Sheet({ open, onClose, title, description, children, widthClass }: Props) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/60 fade-in"
        onClick={onClose}
        aria-hidden
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={
          'absolute right-0 top-0 h-full w-full overflow-y-auto bg-[var(--color-bg)] border-l border-[var(--color-border-strong)] sheet-in-right ' +
          (widthClass ?? 'lg:w-[460px]') +
          ' lg:rounded-l-2xl ' +
          'max-lg:right-auto max-lg:bottom-0 max-lg:top-auto max-lg:h-[92dvh] max-lg:w-full max-lg:rounded-t-2xl max-lg:border-l-0 max-lg:border-t max-lg:sheet-in-bottom'
        }
      >
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-[var(--color-border)] bg-[var(--color-bg)]/85 px-6 py-5 backdrop-blur">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
            {description ? (
              <p className="mt-1 text-sm text-[var(--color-text-muted)]">{description}</p>
            ) : null}
          </div>
          <button onClick={onClose} className="icon-btn" aria-label="Close panel">
            <X size={18} />
          </button>
        </div>
        <div className="px-6 py-6">{children}</div>
      </div>
    </div>
  )
}
```

## `src/components/StrategyPanel.tsx`

```tsx
'use client'

import { useMemo } from 'react'
import type { Debt, Strategy } from '@/lib/types'
import { compareStrategies } from '@/lib/strategies'
import { formatCurrency, formatMonths } from '@/lib/format'
import { TrendingDown, Snowflake, Mountain } from 'lucide-react'

type Props = {
  debts: Debt[]
  strategy: Strategy
  extraMonthly: number
  onStrategyChange: (s: Strategy) => void
  onExtraChange: (n: number) => void
}

export function StrategyPanel({
  debts,
  strategy,
  extraMonthly,
  onStrategyChange,
  onExtraChange,
}: Props) {
  const comparison = useMemo(
    () => compareStrategies(debts, strategy, extraMonthly),
    [debts, strategy, extraMonthly]
  )

  const active = comparison.active
  const monthsSaved = comparison.monthsSavedVsBaseline
  const interestSaved = comparison.interestSavedVsBaseline
  const avalancheBetter =
    comparison.monthsAvalancheBeatsSnowball > 0 ||
    comparison.interestAvalancheBeatsSnowball > 0

  return (
    <section className="surface flex flex-col gap-5 p-5 md:p-6 fade-up">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-dim)]">
            Strategy
          </div>
          <h2 className="mt-1 text-lg font-semibold tracking-tight">
            Choose your line.
          </h2>
        </div>

        <div
          className="inline-flex items-center rounded-lg border border-[var(--color-border-strong)] bg-[var(--color-surface-elev)] p-1"
          role="tablist"
          aria-label="Payoff strategy"
        >
          <StrategyTab
            active={strategy === 'avalanche'}
            onClick={() => onStrategyChange('avalanche')}
            label="Avalanche"
            sublabel="Highest APR first"
            Icon={Mountain}
          />
          <StrategyTab
            active={strategy === 'snowball'}
            onClick={() => onStrategyChange('snowball')}
            label="Snowball"
            sublabel="Smallest balance first"
            Icon={Snowflake}
          />
        </div>
      </header>

      <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
        <label className="flex flex-col gap-1.5">
          <span className="text-[11px] uppercase tracking-[0.12em] text-[var(--color-text-muted)]">
            Extra monthly payment
          </span>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={0}
              max={1500}
              step={25}
              value={extraMonthly}
              onChange={e => onExtraChange(Number(e.target.value))}
              className="flex-1 accent-[var(--color-accent)]"
              aria-label="Extra monthly payment"
            />
            <input
              className="field field-num w-28 text-right"
              inputMode="decimal"
              value={extraMonthly}
              onChange={e => {
                const n = Number(e.target.value.replace(/[$,\s]/g, ''))
                onExtraChange(Number.isFinite(n) ? n : 0)
              }}
              aria-label="Extra monthly amount"
            />
          </div>
        </label>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <Stat
          label="Debt-free in"
          value={formatMonths(active.monthsToDebtFree)}
          Icon={TrendingDown}
        />
        <Stat
          label="Total interest paid"
          value={formatCurrency(active.totalInterest, { whole: true })}
          tone="danger"
        />
        <Stat
          label="Vs minimum-only"
          value={
            monthsSaved > 0 || interestSaved > 0
              ? `${formatMonths(Math.max(0, monthsSaved))} saved`
              : '—'
          }
          sublabel={
            interestSaved > 0
              ? `${formatCurrency(interestSaved, { whole: true })} less in interest`
              : 'Add extra to save more'
          }
          tone="accent"
        />
      </div>

      <div className="rounded-lg border border-dashed border-[var(--color-border-strong)] px-4 py-3 text-[12.5px] text-[var(--color-text-muted)]">
        {extraMonthly === 0 ? (
          <>
            Add an extra <span className="text-[var(--color-text)]">monthly amount</span> above to
            see how much faster you clear.{' '}
            {Number.isFinite(comparison.avalanche.monthsToDebtFree) ? (
              <>
                At your current monthly payments alone, you&apos;re debt-free in{' '}
                <span className="mono text-[var(--color-text)]">
                  {formatMonths(comparison.avalanche.monthsToDebtFree)}
                </span>
                .
              </>
            ) : (
              <>Some debts won&apos;t pay off at the current monthly amount.</>
            )}
          </>
        ) : avalancheBetter && strategy !== 'avalanche' ? (
          <>
            Avalanche pays off{' '}
            <span className="mono text-[var(--color-accent)]">
              {formatCurrency(
                Math.max(0, comparison.interestAvalancheBeatsSnowball),
                { whole: true }
              )}
            </span>{' '}
            less in interest than snowball with this plan.
          </>
        ) : strategy === 'avalanche' && comparison.interestAvalancheBeatsSnowball > 0 ? (
          <>
            Avalanche is the math-optimal choice — saves you{' '}
            <span className="mono text-[var(--color-accent)]">
              {formatCurrency(comparison.interestAvalancheBeatsSnowball, { whole: true })}
            </span>{' '}
            more than snowball.
          </>
        ) : (
          <>
            With these debts, snowball and avalanche end at roughly the same place. Pick
            whichever feels more motivating.
          </>
        )}
      </div>
    </section>
  )
}

function StrategyTab({
  active,
  onClick,
  label,
  sublabel,
  Icon,
}: {
  active: boolean
  onClick: () => void
  label: string
  sublabel: string
  Icon: React.ComponentType<{ size?: number }>
}) {
  return (
    <button
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={
        'flex items-center gap-2 rounded-md px-3 py-2 text-left transition-colors ' +
        (active
          ? 'bg-[var(--color-bg)] text-[var(--color-text)]'
          : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]')
      }
    >
      <Icon size={15} />
      <div className="flex flex-col">
        <span className="text-[12.5px] font-medium leading-none">{label}</span>
        <span className="mt-1 text-[10px] text-[var(--color-text-dim)] leading-none">
          {sublabel}
        </span>
      </div>
    </button>
  )
}

function Stat({
  label,
  value,
  sublabel,
  tone,
  Icon,
}: {
  label: string
  value: string
  sublabel?: string
  tone?: 'accent' | 'danger'
  Icon?: React.ComponentType<{ size?: number }>
}) {
  const color =
    tone === 'accent'
      ? 'var(--color-accent)'
      : tone === 'danger'
        ? 'var(--color-danger)'
        : 'var(--color-text)'
  return (
    <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-elev)] px-4 py-3">
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-dim)]">
        {Icon ? <Icon size={11} /> : null}
        {label}
      </div>
      <div className="mono mt-1.5 text-[18px] font-semibold leading-tight" style={{ color }}>
        {value}
      </div>
      {sublabel ? (
        <div className="mt-0.5 text-[11px] text-[var(--color-text-dim)]">{sublabel}</div>
      ) : null}
    </div>
  )
}
```

## `src/hooks/useFinancialData.ts`

```ts
'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { dataProvider } from '@/lib/providers'
import { reconcile } from '@/lib/finance'
import { makeId } from '@/lib/id'
import type {
  AppState,
  Debt,
  DebtInput,
  PaymentKind,
  Strategy,
} from '@/lib/types'
import { EMPTY_STATE } from '@/lib/types'

export type FinancialData = {
  state: AppState
  isLoading: boolean
  isReady: boolean
  providerId: 'manual' | 'plaid'
  addDebt: (input: DebtInput) => Debt
  updateDebt: (id: string, patch: Partial<Debt>) => void
  deleteDebt: (id: string) => void
  recordPayment: (debtId: string, amount: number, kind: PaymentKind) => void
  setStrategy: (s: Strategy) => void
  setExtraMonthly: (n: number) => void
  resetAll: () => void
  seedDemo: () => void
  refresh: () => Promise<void>
  syncFromInstitution: () => Promise<{ updated: number } | null>
}

const DEMO: DebtInput[] = [
  {
    name: 'Chase Sapphire',
    type: 'credit_card',
    apr: 24.99,
    currentBalance: 6480.32,
    originalBalance: 8200,
    minimumPayment: 145,
    monthlyPayment: 350,
    dueDayOfMonth: 14,
  },
  {
    name: 'Federal Student Loan',
    type: 'student_loan',
    apr: 6.8,
    currentBalance: 18420.15,
    originalBalance: 24000,
    minimumPayment: 220,
    monthlyPayment: 280,
    dueDayOfMonth: 1,
  },
  {
    name: 'Auto Loan — 4Runner',
    type: 'auto',
    apr: 4.5,
    currentBalance: 12800,
    originalBalance: 22000,
    minimumPayment: 410,
    monthlyPayment: 410,
    dueDayOfMonth: 22,
  },
]

function buildDebt(input: DebtInput): Debt {
  const now = new Date().toISOString()
  return {
    id: makeId(),
    name: input.name,
    type: input.type,
    apr: input.apr,
    currentBalance: input.currentBalance,
    originalBalance:
      input.originalBalance != null ? input.originalBalance : input.currentBalance,
    minimumPayment: input.minimumPayment,
    monthlyPayment: input.monthlyPayment,
    dueDayOfMonth: input.dueDayOfMonth,
    balanceAsOf: now,
    createdAt: now,
    updatedAt: now,
  }
}

export function useFinancialData(): FinancialData {
  const [state, setState] = useState<AppState>(EMPTY_STATE)
  const [isLoading, setIsLoading] = useState(true)
  const [isReady, setIsReady] = useState(false)
  const skipPersist = useRef(true)

  useEffect(() => {
    let cancelled = false
    dataProvider
      .load()
      .then(loaded => {
        if (cancelled) return
        setState(loaded)
        setIsLoading(false)
        setIsReady(true)
        // first commit after load shouldn't write back
        queueMicrotask(() => {
          skipPersist.current = false
        })
      })
      .catch(() => {
        if (cancelled) return
        setIsLoading(false)
        setIsReady(true)
        skipPersist.current = false
      })
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (!isReady) return
    if (skipPersist.current) return
    void dataProvider.save(state)
  }, [state, isReady])

  const addDebt = useCallback((input: DebtInput): Debt => {
    const debt = buildDebt(input)
    setState(s => ({ ...s, debts: [...s.debts, debt] }))
    return debt
  }, [])

  const updateDebt = useCallback((id: string, patch: Partial<Debt>) => {
    setState(s => ({
      ...s,
      debts: s.debts.map(d =>
        d.id === id ? { ...d, ...patch, updatedAt: new Date().toISOString() } : d
      ),
    }))
  }, [])

  const deleteDebt = useCallback((id: string) => {
    setState(s => ({
      ...s,
      debts: s.debts.filter(d => d.id !== id),
      payments: s.payments.filter(p => p.debtId !== id),
    }))
  }, [])

  const recordPayment = useCallback((debtId: string, amount: number, kind: PaymentKind) => {
    setState(s => {
      const debt = s.debts.find(d => d.id === debtId)
      if (!debt || amount <= 0) return s
      const now = Date.now()
      const { newBalance, interestAccrued, balanceBefore } = reconcile(debt, amount, now)
      const nowIso = new Date(now).toISOString()
      const updated: Debt = {
        ...debt,
        currentBalance: newBalance,
        balanceAsOf: nowIso,
        updatedAt: nowIso,
      }
      return {
        ...s,
        debts: s.debts.map(d => (d.id === debtId ? updated : d)),
        payments: [
          ...s.payments,
          {
            id: makeId(),
            debtId,
            amount,
            date: nowIso,
            kind,
            balanceBefore,
            balanceAfter: newBalance,
            interestAccrued,
          },
        ],
      }
    })
  }, [])

  const setStrategy = useCallback((strategy: Strategy) => {
    setState(s => ({ ...s, strategy }))
  }, [])

  const setExtraMonthly = useCallback((extraMonthly: number) => {
    setState(s => ({ ...s, extraMonthly: Math.max(0, extraMonthly) }))
  }, [])

  const resetAll = useCallback(() => {
    setState({ ...EMPTY_STATE })
  }, [])

  const seedDemo = useCallback(() => {
    setState(s => ({ ...s, debts: DEMO.map(buildDebt) }))
  }, [])

  const refresh = useCallback(async () => {
    setIsLoading(true)
    try {
      const loaded = await dataProvider.load()
      setState(loaded)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const syncFromInstitution = useCallback(async () => {
    if (!dataProvider.syncFromInstitution) return null
    return dataProvider.syncFromInstitution()
  }, [])

  return {
    state,
    isLoading,
    isReady,
    providerId: dataProvider.id,
    addDebt,
    updateDebt,
    deleteDebt,
    recordPayment,
    setStrategy,
    setExtraMonthly,
    resetAll,
    seedDemo,
    refresh,
    syncFromInstitution,
  }
}
```

## `src/hooks/useNow.ts`

```ts
'use client'

import { useEffect, useState } from 'react'

export function useNow(intervalMs: number = 1000): number {
  const [now, setNow] = useState<number>(() => Date.now())
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), intervalMs)
    return () => window.clearInterval(id)
  }, [intervalMs])
  return now
}
```

## `src/lib/finance.ts`

```ts
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
```

## `src/lib/format.ts`

```ts
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
```

## `src/lib/id.ts`

```ts
export function makeId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }
  return `id_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`
}
```

## `src/lib/strategies.ts`

```ts
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
```

## `src/lib/types.ts`

```ts
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
```

## `src/lib/providers/index.ts`

```ts
import { manualDataProvider } from './manualDataProvider'
// import { plaidDataProvider } from './plaidDataProvider'  // ← swap this in when Plaid is ready
import type { DataProvider } from './types'

// Single switch. The rest of the app touches `dataProvider` and never references
// the concrete implementation. To enable Plaid: comment out manualDataProvider
// and uncomment plaidDataProvider above + below.
export const dataProvider: DataProvider = manualDataProvider
// export const dataProvider: DataProvider = plaidDataProvider
```

## `src/lib/providers/manualDataProvider.ts`

```ts
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
```

## `src/lib/providers/plaidDataProvider.ts`

```ts
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
```

## `src/lib/providers/types.ts`

```ts
import type { AppState } from '../types'

export interface DataProvider {
  readonly id: 'manual' | 'plaid'
  load(): Promise<AppState>
  save(state: AppState): Promise<void>
  syncFromInstitution?(): Promise<{ updated: number }>
}
```
