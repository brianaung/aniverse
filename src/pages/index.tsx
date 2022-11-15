import utilStyles from '../styles/utils.module.scss'
import Head from 'next/head'
import Layout from '../components/layout'

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Aniverse Home</title>
      </Head>

      {/* testing video player */}
      <section>
        <p className={utilStyles.devMessage}>Testing: ...</p>
      </section>

      {/* todo: fetch top animes using getStaticProps */}
    </Layout>
  )
}
