import Head from 'next/head'
import { useEffect, useState } from 'react'
import useSWR, { Fetcher } from 'swr'
import AnimeItem from '../../components/animeItem'
import AnimeListContainer from '../../components/animeListContainer'
import AnimeListLoading from '../../components/animeListLoading'
import Layout from '../../components/layout'
import Pagination from '../../components/pagination'
import { PopularAnimes } from '../../types'

const fetcher: Fetcher<PopularAnimes> = (arg: string) => fetch(arg).then((res) => res.json())

function SinglePage({ page, setNext }: { page: number; setNext: React.Dispatch<React.SetStateAction<boolean>> }) {
  const { data, error } = useSWR(`/api/anime/popular/?page=${page}`, fetcher)

  useEffect(() => {
    if (data) {
      setNext(data.hasNextPage)
    }
  }, [data, setNext])

  return (
    <>
      {!data && !error && <AnimeListLoading />}
      {!data && error && <p>Error loading data</p>}
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

export default function PopularPage() {
  const [page, setPage] = useState(1)
  const [hasNext, setNext] = useState(false)

  return (
    <Layout>
      <Head>
        <title>Popular Animes</title>
      </Head>

      {/* results page */}
      <SinglePage page={page} setNext={setNext} />

      {/* render next page inside hidden div (pre fetch data so faster and better ux) */}
      <div style={{ display: 'none' }}>
        <SinglePage page={page + 1} setNext={setNext} />
      </div>

      <Pagination page={page} setPage={setPage} hasNextPage={hasNext} />
    </Layout>
  )
}
