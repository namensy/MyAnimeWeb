import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react'

interface SearchContextType {
  searchTerm: string | string[]
  setSearchTerm: Dispatch<SetStateAction<string | string[]>>
}

export const SearchContext = createContext<SearchContextType>({
  searchTerm: '',
  setSearchTerm: () => {},
})

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchTerm, setSearchTerm] = useState<string | string[]>('')
  console.log('SearchProvider re-rendered!')

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </SearchContext.Provider>
  )
}

export const useSearchContext = () => {
  const context = useContext(SearchContext)

  if (!context)
    throw new Error('useSearchContext must be used within a AppProvider')

  return context
}
