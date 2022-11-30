// import utilStyles from '../../../styles/utils.module.scss'
import useSWR, { Fetcher } from 'swr'
import { useRouter } from 'next/router'
import Layout from '../../../components/layout'
import { AnimeInfo } from '../../../types'
import Image from 'next/image'
import GenreTags from '../../../components/genreTags'
import EpisodeGrids from '../../../components/episodeGrids'

const fetcher: Fetcher<AnimeInfo, string> = (arg: string) => fetch(arg).then((res) => res.json())

export default function AnimeInfoPage() {
  const router = useRouter()
  const { id } = Array.isArray(router.query) ? router.query[0] : router.query
  const { data, error } = useSWR(id ? `/api/anime/info/${id}` : null, fetcher)

  return (
    <Layout>
      {!data && !error && <p>Loading</p>}
      {!data && error && <p>Something went wrong, please try again later.</p>}
      {data && !error && (
        <>
          {/* display anime meta data */}
          <div style={{ width: '100%', height: 'auto', maxHeight: '500px', overflow: 'hidden' }}>
            <Image
              style={{ border: 'solid 1px black', width: '100%', height: 'auto' }}
              quality="100"
              src={data.cover}
              width={100000}
              height={100000}
              alt={data.title.english}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h1 style={{ color: data.color, textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black' }}>
              {data.title.english}
            </h1>
            <h4>
              {data.releaseDate} ({data.status}) | {data.totalEpisodes} episodes
            </h4>
          </div>

          {/* todo: clicking on each genre will redirect to similar animes with same genre? */}
          <GenreTags genres={data.genres} color={data.color} />

          <p style={{ fontStyle: 'italic' }} dangerouslySetInnerHTML={{ __html: data.description }} />

          {/* return a list of episodes */}
          <EpisodeGrids animeID={id} episodes={data.episodes} />
        </>
      )}
    </Layout>
  )
}
