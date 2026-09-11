import { createContext, useContext } from 'react'

export interface QuoteModalValue {
  /** Opens the quote form in a modal dialog. */
  open: () => void
  close: () => void
  isOpen: boolean
}

export const QuoteModalContext = createContext<QuoteModalValue | null>(null)

export function useQuoteModal(): QuoteModalValue {
  const value = useContext(QuoteModalContext)
  if (!value) throw new Error('useQuoteModal must be used inside <QuoteModalProvider>')
  return value
}
