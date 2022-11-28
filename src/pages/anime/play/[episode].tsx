import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
// import { useEffect, useState } from 'react'
import useSWRImmutable, { Fetcher } from 'swr'
import Layout from '../../../components/layout'
import Player from '../../../components/player'
import { IAnimeExtendedInfo, IEpisode, IVideoSrc } from '../../../types'

type ApiDataType = {
  allSrc: IVideoSrc[]
  error: string
}

const vidFetcher: Fetcher<ApiDataType> = (arg: string) => fetch(arg).then((res) => res.json())

// do not revalidate data on...
const options = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false
}

const animeFetcher: Fetcher<IAnimeExtendedInfo, string> = (arg: string) => fetch(arg).then((res) => res.json())

type QueryType = {
  episode: string;
  animeID: string;
  index: string;
}

export default function VideoPage() {
  const router = useRouter()
  const { episode, animeID, index }: QueryType = Array.isArray(router.query) ? router.query[0] : router.query
  // IMPORTANT: using normal useSWR will revalidate data (fetching again after intervals) causing the video src link to change
  const animeData = useSWR(animeID ? `/api/anime/info/${animeID}` : null, animeFetcher)
  const vidData = useSWRImmutable(episode ? `/api/anime/play/${episode}` : null, vidFetcher, options)
  const [prev, setPrev] = useState<IEpisode | null>(null)
  const [next, setNext] = useState<IEpisode | null>(null)

  // checks whether prev and next episodes exists
  useEffect(() => {
    const data = animeData.data
    const prev = data?.episodes[parseInt(index) - 1]
    const next = data?.episodes[parseInt(index) + 1]
    if (!prev && !next) {
      setPrev(null)
      setNext(null)
    } else if (!prev && next) {
      setPrev(null)
      setNext(next)
    } else if (prev && !next) {
      setPrev(prev)
      setNext(null)
    } else if (prev && next) {
      setNext(next)
      setPrev(prev)
    }
  }, [animeData])

  return (
    <Layout>
      <h3>{episode}</h3>
      <section>
        {!vidData.data && !vidData.error && <p>Loading</p>}
        {!vidData.data && vidData.error && <p>Error loading video.</p>}
        {vidData.data && !vidData.error && 
          <>
            <Player allSrc={vidData.data.allSrc} />
            {prev && <Link href={`/anime/play/${prev.id}?animeID=${animeID}&index=${parseInt(index) - 1}`}>prev</Link>}
            {next && <Link href={`/anime/play/${next.id}?animeID=${animeID}&index=${parseInt(index) + 1}`}>next</Link>}
          </>
        }
      </section>
    </Layout>
  )
}
