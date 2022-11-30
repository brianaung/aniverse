import { GetStaticProps } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import AnimeItem from '../components/animeItem'
import AnimeListContainer from '../components/animeListContainer'
import Layout from '../components/layout'
import Pagination from '../components/pagination'
import { getPopularAnimes, getTrendingAnimes } from '../lib/anime'
import { PopularAnimes, TrendingAnimes } from '../types'

const perPage = 7

// todo: handle loading and error states
export default function Home({
  popularAnimesInit,
  trendingAnimesInit
}: {
  popularAnimesInit: PopularAnimes
  trendingAnimesInit: TrendingAnimes
}) {
  const [popularAnimes, setPopularAnimes] = useState<PopularAnimes | null>(null)
  const [trendingAnimes, setTrendingAnimes] = useState<TrendingAnimes | null>(null)
  const [popularPage, setPopularPage] = useState(1)
  const [trendingPage, setTrendingPage] = useState(1)

  // fetch more data from client side when page changes
  useEffect(() => {
    const fetchData = async (page: number) => {
      const { data, error } = await getPopularAnimes(page, perPage)
      if (!data) {
        // setError(error)
        console.log('[Fetch Data] ' + error.message)
      } else {
        setPopularAnimes(data)
      }
    }

    fetchData(popularPage)
  }, [popularPage])

  // fetch more data from client side when page changes
  useEffect(() => {
    const fetchData = async (page: number) => {
      const { data, error } = await getTrendingAnimes(page, perPage)
      if (!data) {
        // setError(error)
        console.log('[Fetch Data] ' + error.message)
      } else {
        setTrendingAnimes(data)
      }
    }

    fetchData(trendingPage)
  }, [trendingPage])

  return (
    <Layout>
      <Head>
        <title>Aniverse Home</title>
      </Head>
      <section>
        <h1>Most popular</h1>
        <AnimeListContainer>
          {!popularAnimes ? (
            <>
              {popularAnimesInit &&
                popularAnimesInit.results.map((anime) => <AnimeItem key={anime.id} anime={anime} />)}
            </>
          ) : (
            <>
              {popularAnimes.results.map((anime) => (
                <AnimeItem key={anime.id} anime={anime} />
              ))}
            </>
          )}
        </AnimeListContainer>
        <Pagination page={popularPage} setPage={setPopularPage} />
        <h1>Trending now</h1>
        <AnimeListContainer>
          {!trendingAnimes ? (
            <>
              {trendingAnimesInit &&
                trendingAnimesInit.results.map((anime) => <AnimeItem key={anime.id} anime={anime} />)}
            </>
          ) : (
            <>
              {trendingAnimes.results.map((anime) => (
                <AnimeItem key={anime.id} anime={anime} />
              ))}
            </>
          )}
        </AnimeListContainer>
        <Pagination page={trendingPage} setPage={setTrendingPage} />
      </section>
    </Layout>
  )
}

// loading top 5 for each categories at startup (for SEO?)
export const getStaticProps: GetStaticProps = async () => {
  const page = 1
  const popularAnimesInit = await getPopularAnimes(page, 5)
  const trendingAnimesInit = await getTrendingAnimes(page, 5)
  console.log(popularAnimesInit)

  return {
    props: {
      popularAnimesInit: popularAnimesInit.data,
      trendingAnimesInit: trendingAnimesInit.data
    }
  }
}
