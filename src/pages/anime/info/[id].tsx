import utilStyles from '../../../styles/utils.module.scss'
import useSWR, { Fetcher } from 'swr'
import { useRouter } from 'next/router'
import Layout from '../../../components/layout'
import { AnimeEpisode, AnimeInfo } from '../../../types'
import Image from 'next/image'

const fetcher: Fetcher<AnimeInfo, string> = (arg: string) => fetch(arg).then((res) => res.json())

export default function AnimeInfoPage() {
  const router = useRouter()
  const { id } = router.query
  const { data, error } = useSWR(id ? `/api/anime/info/${id}` : null, fetcher)

  const handlePlay = (ep: AnimeEpisode) => {
    router.push({
      pathname: `/anime/play`,
      query: ep
    })
  }

  return (
    <Layout>
      {!data && !error && <p>Loading</p>}
      {!data && error && <p>Something went wrong.</p>}
      {data && !error && (
        <>
          <Image src={data.cover} width={360} height={180} layout="responsive" alt={data.title.userPreferred} />
          <h2>{data.title.userPreferred}</h2>
          <h3>{data.releaseDate}</h3>
          <p dangerouslySetInnerHTML={{__html: data.description}} />

          {/* return a list of episodes */}
          <p>Total Episodes: {data.totalEpisodes}</p>
          <div className={utilStyles.btnListContainer}>
            {data.episodes.map((ep) => (
              <button className={utilStyles.playBtn} key={ep.id} onClick={() => handlePlay(ep)}>
                ep{ep.number}
              </button>
            ))}
          </div>
        </>
      )}
    </Layout>
  )
}
