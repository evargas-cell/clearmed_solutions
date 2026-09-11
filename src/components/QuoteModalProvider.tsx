import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { QuoteModalContext } from './quoteModalContext'
import QuoteModal from './QuoteModal'

/** Holds the quote-dialog state and renders the dialog once for the whole app. */
export default function QuoteModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])
  const value = useMemo(() => ({ isOpen, open, close }), [isOpen, open, close])

  return (
    <QuoteModalContext.Provider value={value}>
      {children}
      <QuoteModal />
    </QuoteModalContext.Provider>
  )
}
