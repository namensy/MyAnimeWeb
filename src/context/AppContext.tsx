import { createContext, useContext ,ReactNode, useState } from 'react'
import { SearchProps } from '../types'


export const AppContext = createContext<SearchProps>({
  searchTerm: '',
  setSearchTerm: () => {},
  loading: false,
  setLoading: () => {}
})


export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [searchTerm, setSearchTerm] = useState<string | string[]>([])
  const [loading, setLoading] = useState(false);

  return (
    <AppContext.Provider value={{ searchTerm, setSearchTerm, loading, setLoading }}>
      {children}
    </AppContext.Provider>
  )
}

// custom context hook
export const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within a AppProvider')
  }
  return context
}