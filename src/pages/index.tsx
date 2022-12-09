import { Heading } from '@chakra-ui/react'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import AnimeItem from '../components/animeItem'
import AnimeListContainer from '../components/animeListContainer'
import Layout from '../components/layout'
import { getPopularAnimes, getTrendingAnimes } from '../lib/anime'
import { PopularAnimes, TrendingAnimes } from '../types'

// todo: handle loading and error states
export default function Home({
  popularAnimes,
  trendingAnimes
}: {
  popularAnimes: PopularAnimes
  trendingAnimes: TrendingAnimes
}) {
  return (
    <Layout>
      <Head>
        <title>hai</title>
      </Head>

      <section style={{ width: '100%' }}>
        <Heading as="h2" size="md">
          MOST POPULAR
        </Heading>
        <Link href="/anime/popular">view more</Link>
        <AnimeListContainer>
          {popularAnimes && popularAnimes.results.map((anime) => <AnimeItem key={anime.id} anime={anime} />)}
        </AnimeListContainer>
      </section>

      <section style={{ width: '100%' }}>
        <Heading as="h2" size="md">
          TRENDING NOW
        </Heading>
        <Link href="/anime/trending">view more</Link>
        <AnimeListContainer>
          {trendingAnimes && trendingAnimes.results.map((anime) => <AnimeItem key={anime.id} anime={anime} />)}
        </AnimeListContainer>
      </section>
    </Layout>
  )
}

// loading top 5 for each categories at startup (for SEO?)
export const getStaticProps: GetStaticProps = async () => {
  const page = 1
  try {
    const popularAnimes = await getPopularAnimes(page, 5)
    const trendingAnimes = await getTrendingAnimes(page, 5)

    // handle error
    if (popularAnimes.error || !popularAnimes.data || trendingAnimes.error || !trendingAnimes.data) {
      return { notFound: true }
    }

    return {
      props: {
        popularAnimes: popularAnimes.data,
        trendingAnimes: trendingAnimes.data
      }
    }
  } catch (e) {
    return { notFound: true }
  }
}
