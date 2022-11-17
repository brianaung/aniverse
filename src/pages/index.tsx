import Head from 'next/head'
import Layout from '../components/layout'

export default function Home() {

  return (
    <Layout>
      <Head>
        <title>Aniverse Home</title>
      </Head>
    </Layout>
  )
}

/* export const getStaticProps: GetStaticProps = async () => {
  const page = '1'
  const topAnimes = await getAllTopAnime(page)
  console.log(topAnimes)

  // error handling
  if (!topAnimes) {
    throw new Error('Server error')
  }

  return {
    props: {
      topAnimes,
    },
  }
} */
