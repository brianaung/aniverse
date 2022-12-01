import { useRouter } from 'next/router'
// import useSWR, { Fetcher } from 'swr'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import AnimeItem from '../../../components/animeItem'
import AnimeListContainer from '../../../components/animeListContainer'
import Layout from '../../../components/layout'
import Pagination from '../../../components/pagination'
import { getAnimeSearch } from '../../../lib/anime'
import { AnimeSearchResults } from '../../../types'

// fetcher for useSWR
// const fetcher: Fetcher = (arg: string) => fetch(arg).then((res) => res.json())

export default function SearchResultsPage() {
  const router = useRouter()
  const { query } = Array.isArray(router.query) ? router.query[0] : router.query
  // const { data, error } = useSWR(query ? `/api/anime/search/${query}` : null, fetcher)
  const [page, setPage] = useState(1)
  const [searchList, setSearchList] = useState<AnimeSearchResults | null>()
  const [error, setError] = useState<Error | null>()

  useEffect(() => {
    const fetchData = async (page: number) => {
      const { data, error } = await getAnimeSearch(query, page)
      if (!data) {
        setError(error)
        console.log('[Fetch Data] ' + error.message)
      } else {
        setSearchList(data)
      }
    }

    fetchData(page)
  }, [query, page])

  return (
    <Layout>
      <Head>
        <title>search results for {query}</title>
      </Head>
      <p>
        showing results for: <em>{query}</em>
      </p>
      <AnimeListContainer>
        {!searchList && !error && <p>Loading</p>}
        {!searchList && error && <p>Search not found.</p>}
        {searchList && !error && searchList.results.map((anime) => <AnimeItem key={anime.id} anime={anime} />)}
      </AnimeListContainer>
      {searchList && <Pagination page={page} setPage={setPage} />}
    </Layout>
  )
}
