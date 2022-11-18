import useSWR, { Fetcher } from 'swr'
import { useRouter } from 'next/router'
import Layout from '../../../components/layout'
import { IAnimeExtendedInfo } from '../../../types'
import Image from 'next/image'

const fetcher: Fetcher<IAnimeExtendedInfo, string> = (arg: string) => fetch(arg).then((res) => res.json())

export default function AnimeInfoPage() {
  const router = useRouter()
  const { id } = router.query
  const { data, error } = useSWR(id ? `/api/anime/info/${id}` : null, fetcher)

  const handlePlay = (epID: string) => {
    router.push(`/anime/play/${epID}`)
  }

  return (
    <Layout>
      {!data && !error && <p>Loading</p>}
      {!data && error && <p>Something went wrong.</p>}
      {data && !error && (
        <>
          <Image src={data.cover} width={360} height={180} layout="responsive" alt={data.title} />
          <h2>{data.title}</h2>
          <h3>{data.releaseDate}</h3>
          <p>{data.description}</p>
          <p>Total Episodes: {data.totalEpisodes}</p>

          {/* return a list of episodes */}
          {data.episodes.map((ep) => (
            <button key={ep.id} onClick={() => handlePlay(ep.id)}>
              {ep.id}
            </button>
          ))}

        </>
      )}
    </Layout>
  )
}
