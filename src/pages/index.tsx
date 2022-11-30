import { GetStaticProps } from 'next'
import Head from 'next/head'
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
        <title>Aniverse Home</title>
      </Head>
      <section>
        <h1>Most popular</h1>
        <AnimeListContainer>
          {popularAnimes && popularAnimes.results.map((anime) => <AnimeItem key={anime.id} anime={anime} />)}
        </AnimeListContainer>
        <h1>Trending now</h1>
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
  const popularAnimes = await getPopularAnimes(page, 5)
  const trendingAnimes = await getTrendingAnimes(page, 5)

  return {
    props: {
      popularAnimes: popularAnimes.data,
      trendingAnimes: trendingAnimes.data
    }
  }
}
