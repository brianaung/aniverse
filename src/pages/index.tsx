// import utilStyles from '../styles/utils.module.scss'
import Head from 'next/head'
import Layout from '../components/layout'
import { GetStaticProps } from 'next/types'
import { getAllTopAnime } from '../lib/anime'
import AnimeItem from '../components/animeItem'
import { IAnimeTopInfo } from '../types'
import AnimeListContainer from '../components/animeListContainer'

  export default function Home({ topAnimes }: { topAnimes: IAnimeTopInfo[] }) {
  return (
    <Layout>
      <Head>
        <title>Aniverse Home</title>
      </Head>

      {/* todo: fetch top animes using getStaticProps */}
      <section>
        {!topAnimes && <p>Loading</p>}
        <AnimeListContainer>
          {topAnimes && topAnimes.map((anime) => (
            <AnimeItem key={anime.id} anime={anime} />
          ))} 
        </AnimeListContainer>
      </section>

    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const topAnimes = await getAllTopAnime()
  console.log(topAnimes)

  // error handling
  if (!topAnimes) {
    throw new Error("Server error")
  }

  return {
    props: {
      topAnimes,
    },
  }
}
