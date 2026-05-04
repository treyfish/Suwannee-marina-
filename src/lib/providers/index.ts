import { manualDataProvider } from './manualDataProvider'
// import { plaidDataProvider } from './plaidDataProvider'  // ← swap this in when Plaid is ready
import type { DataProvider } from './types'

// Single switch. The rest of the app touches `dataProvider` and never references
// the concrete implementation. To enable Plaid: comment out manualDataProvider
// and uncomment plaidDataProvider above + below.
export const dataProvider: DataProvider = manualDataProvider
// export const dataProvider: DataProvider = plaidDataProvider
