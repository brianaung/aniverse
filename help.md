## Creating a complex context

using `createContext` to provide {state, setState} object context to wrapped components

```tsx
type SearchContextType = {
  query: string
  setQuery: React.Dispatch<React.SetStateAction<string>>
}

// export const QueryContext = createContext<string>('')
const SearchContextState = {
  query: '',
  setQuery: () => {},
}

export const SearchContext = createContext<SearchContextType>(SearchContextState)
```

## Static Site Generation (SSG) example

call server-side controller function (where external data fetching is done) to get static props used in initial static site generation

```tsx
export const getStaticProps: GetStaticProps = async () => {
  const queryResults = await getAnimeSearch('gintama')
  console.log(queryResults)

  // error handling
  if (typeof queryResults === 'undefined') {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      queryResults,
    },
  }
}
```
