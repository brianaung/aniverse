import Head from 'next/head'
import utilStyles from '../styles/utils.module.scss'
import Layout from '../components/layout'
import Player from '../components/player'

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Aniverse Home</title>
      </Head>

      {/* testing video player */}
      <section>
        <p className={utilStyles.devMessage}>Testing: video player</p>
        <Player src="https://wwwx16.gogocdn.stream/videos/hls/8kVnW_FCgGEGK_FNvKchJQ/1668452424/17075/bcc369738325d609c828bc6c16f9a7fd/ep.1.1657689068.m3u8" />
      </section>

      {/* todo: fetch top animes using getStaticProps */}

    </Layout>
  )
}

