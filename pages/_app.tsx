import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import React, { createContext, useState } from 'react'

type SearchContextType = {
  query: string,
  setQuery: React.Dispatch<React.SetStateAction<string>>,
}

// export const QueryContext = createContext<string>('')
const SearchContextState = {
  query: '',
  setQuery: () => {},
}

export const SearchContext = createContext<SearchContextType>(SearchContextState)

export default function App({ Component, pageProps }: AppProps) {
  const [query, setQuery] = useState<string>('')

  React.useEffect(() => {
    console.log(query)
  }, [query])

  return (
    <SearchContext.Provider value={{ query, setQuery }}>
      <Component {...pageProps} />
    </SearchContext.Provider>
  )
}
