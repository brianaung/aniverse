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

## Get next result page
```tsx
// props: topAnimes

// start from page 1
const [page, setPage] = useState('1')
const [topList, setTopList] = useState([])

useEffect(() => {
  // we need this helper function to call async function in useEffect
  const fetchData = async (page: string) => {
    const data = await getAllTopAnime(page)
    // need to be set here not outside
    setTop(data)
  }

  fetchData(page)
  // setTop(data) here will cause issues
}, [page])

return (
  <Layout>
    <AnimeListContainer>
      {topList.map((anime) => <AnimeItem key={anime.id} anime={anime} />)}
    </AnimeListContainer>
    {topList.hasNextPage && <button onClick={() => setPage(page => (parseInt(page) + 1).toString() )}>next page</button>}
    {/* add previous button */}
  </Layout>
)
```
