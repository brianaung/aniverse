import { Heading } from '@chakra-ui/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import useSWR, { Fetcher } from 'swr'
import EpisodeGrids from '../../../components/episodeGrids'
import Layout from '../../../components/layout'
import utilStyles from '../../../styles/utils.module.scss'
import { AnimeInfo } from '../../../types'

const fetcher: Fetcher<AnimeInfo, string> = (arg: string) => fetch(arg).then((res) => res.json())

export default function AnimeEpListPage() {
  const router = useRouter()
  const { id } = Array.isArray(router.query) ? router.query[0] : router.query
  const { data, error } = useSWR(id ? `/api/anime/watch/${id}` : null, fetcher)

  return (
    <Layout>
      <Head>
        <title>watch {data && data.title.english}</title>
      </Head>
      {!data && !error && <p>Loading</p>}
      {!data && error && <p>Something went wrong, please try again later.</p>}
      {data && !error && (
        <>
          <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Heading className={utilStyles.textWithStroke} as="h1" size="xl" color={data.color}>
              {data.title.english}
            </Heading>
            <Heading as="h2" size="sm">
              {data.releaseDate} ({data.status}) | {data.totalEpisodes} episodes | {data.duration} minutes
            </Heading>
          </header>

          {/* return a list of episodes */}
          <EpisodeGrids animeID={id} episodes={data.episodes} />
        </>
      )}
    </Layout>
  )
}
