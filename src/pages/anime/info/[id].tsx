import useSWR, { Fetcher } from 'swr'
import { useRouter } from 'next/router'
import Layout from '../../../components/layout'
import { IAnimeInfo } from '../../../types'

const fetcher: Fetcher<IAnimeInfo, string> = (arg: string) => fetch(arg).then((res) => res.json())

export default function AnimeInfoPage() {
  const router = useRouter()
  const { id } = router.query
  const { data, error } = useSWR(id ? `/api/anime/info/${id}` : null, fetcher)

  const handlePlay = (epID: string) => {
    router.push(`/anime/player/${epID}`)
  }

  return (
    <Layout>
      {!data && !error && <p>Loading</p>}
      {!data && error && <p>Error occured</p>}
      {data && !error && (
        <>
          <h2>{data.title}</h2>
          <p>{data.description}</p>
          <p>{data.releaseDate}</p>
          <p>{data.totalEpisodes}</p>
          {/* return a list of episodes */}
          {data.episodes.map((ep) => (
            <button onClick={() => handlePlay(ep.id)}>{ep.id}</button>
          ))}
        </>
      )}
      <p>Testing video player</p>
    </Layout>
  )
}
