import useSWR, { Fetcher } from 'swr'
import { useRouter } from 'next/router'
import Layout from '../../../components/layout'
import { AnimeInfo } from '../../../types'
import EpisodeGrids from '../../../components/episodeGrids'

const fetcher: Fetcher<AnimeInfo, string> = (arg: string) => fetch(arg).then((res) => res.json())

export default function AnimeEpListPage() {
  const router = useRouter()
  const { id } = Array.isArray(router.query) ? router.query[0] : router.query
  const { data, error } = useSWR(id ? `/api/anime/watch/${id}` : null, fetcher)

  return (
    <Layout>
      {!data && !error && <p>Loading</p>}
      {!data && error && <p>Something went wrong, please try again later.</p>}
      {data && !error && (
        <>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h1 style={{ color: data.color, textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black' }}>
              {data.title.english}
            </h1>
            <h4>
              {data.releaseDate} ({data.status}) | {data.totalEpisodes} episodes | {data.duration} minutes
            </h4>
          </div>

          {/* return a list of episodes */}
          <EpisodeGrids animeID={id} episodes={data.episodes} />
        </>
      )}
    </Layout>
  )
}
