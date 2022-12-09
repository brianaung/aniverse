import { Button } from '@chakra-ui/react'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import useSWR, { Fetcher } from 'swr'
import AnimeItem from '../../components/animeItem'
import AnimeListContainer from '../../components/animeListContainer'
import AnimeListLoading from '../../components/animeListLoading'
import Layout from '../../components/layout'
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
  const [hasNext, setNext] = useState(false)

  const [cnt, setCnt] = useState(1)
  const pages = []
  for (let i = 1; i < cnt + 1; i++) {
    // for the api we are using, pg 0 and 1 has same data so skip 0
    pages.push(<SinglePage key={i} page={i} setNext={setNext} />)
  }

  return (
    <Layout>
      <Head>
        <title>Popular Animes</title>
      </Head>

      {/* results page */}
      {pages}
      {hasNext && <Button onClick={() => setCnt(cnt + 1)}>Load More</Button>}
    </Layout>
  )
}
