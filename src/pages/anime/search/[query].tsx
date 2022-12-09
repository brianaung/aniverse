import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import useSWR, { Fetcher } from 'swr'
import AnimeItem from '../../../components/animeItem'
import AnimeListContainer from '../../../components/animeListContainer'
import AnimeListLoading from '../../../components/animeListLoading'
import Layout from '../../../components/layout'
import Pagination from '../../../components/pagination'
import { AnimeSearchResults } from '../../../types'

const fetcher: Fetcher<AnimeSearchResults> = (arg: string) => fetch(arg).then((res) => res.json())

function SinglePage({
  query,
  page,
  setNext
}: {
  query: string
  page: number
  setNext: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const { data, error } = useSWR(`/api/anime/search/${query}?page=${page}`, fetcher)

  useEffect(() => {
    if (data) {
      setNext(data.hasNextPage)
    }
  }, [data, setNext])

  return (
    <>
      {!data && !error && <AnimeListLoading />}
      {!data && error && (
        <p>
          No results for <em>{query}</em>
        </p>
      )}
      {data && !error && (
        <>
          <AnimeListContainer>
            {data.results.map((anime) => (
              <AnimeItem key={anime.id} anime={anime} />
            ))}
          </AnimeListContainer>
        </>
      )}
    </>
  )
}

export default function SearchResultsPage() {
  const router = useRouter()
  const { query } = Array.isArray(router.query) ? router.query[0] : router.query
  const [page, setPage] = useState(1)
  const [hasNext, setNext] = useState(false)

  return (
    <Layout>
      <Head>
        <title>search results for {query}</title>
      </Head>
      <p>
        showing results for: <em>{query}</em>
      </p>

      {/* results page */}
      <SinglePage query={query} page={page} setNext={setNext} />

      {/* render next page inside hidden div (pre fetch data so faster and better ux) */}
      <div style={{ display: 'none' }}>
        <SinglePage query={query} page={page + 1} setNext={setNext} />
      </div>

      <Pagination page={page} setPage={setPage} hasNextPage={hasNext} />
    </Layout>
  )
}
