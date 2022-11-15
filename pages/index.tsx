import Head from 'next/head'
import utilStyles from '../styles/utils.module.scss'
import Layout from '../components/layout'
import Player from '../components/player'
import useSWR, { Fetcher } from 'swr'

const fetcher: Fetcher<{ url: string, error: string }> = (arg: string) => fetch(arg).then((res) => res.json())

export default function Home() {
  // todo: do not hardcode anime episode
  const vidUrl = 'gintama-episode-1'
  const { data, error } = useSWR(`/api/play/${vidUrl}`, fetcher)

  return (
    <Layout>
      <Head>
        <title>Aniverse Home</title>
      </Head>

      {/* testing video player */}
      <section>
        <p className={utilStyles.devMessage}>Testing: video player</p>
        {!data && !error && <p>Loading</p>}
        {!data && error && <p>Error loading video.</p>}
        {data && !error && <Player src={data.url} />}
      </section>

      {/* todo: fetch top animes using getStaticProps */}

    </Layout>
  )
}

