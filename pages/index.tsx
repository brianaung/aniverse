// import { GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
// import { getAllTopAnime, getAnimeSearch } from '../lib/anime'
import Player from '../components/player'
import Layout from '../components/layout'
import useSWR, { Fetcher } from 'swr'

const fetcher: Fetcher<{id: string; title: string; url: string; image: string; releaseDate: string; subOrDub: string }[], string> = (arg: string) => fetch(arg).then(res => res.json())

export default function Home() {
  const { data, error } = useSWR(`/api/search/gintama`, fetcher)

  return (
    <Layout>
      <Head>
        <title>Aniverse Home</title>
      </Head>
      {/* testing video player */}
      <section>
        <p>Testing: video player</p>
        <Player src="https://wwwx16.gogocdn.stream/videos/hls/3wT6FzERnZZ6t_9FXeYgbA/1668426010/17075/bcc369738325d609c828bc6c16f9a7fd/ep.1.1657689068.720.m3u8" />
      </section>
      <section>
        <h2>Testing: data fetching</h2>
        <ul>
          {!error && typeof data !== 'undefined' && data.map((anime) => (
            <li key={anime.id}>
              {anime.title}
              <Image src={anime.image} height={180} width={180} alt={anime.title} />
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

/* export const getStaticProps: GetStaticProps = async () => {
  // todo: testing search function (might need to use client side rendering)
  const queryResults = await getAnimeSearch('gintama')
  console.log(queryResults)

  // error handling
  if (typeof queryResults === 'undefined') {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      queryResults,
    },
  }
}
*/
