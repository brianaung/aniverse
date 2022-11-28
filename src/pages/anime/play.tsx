// import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import useSWRImmutable, { Fetcher } from 'swr'
import Layout from '../../components/layout'
import Player from '../../components/player'
import { AnimeEpisode, AnimeInfo, VideoSrc } from '../../types'

type ApiDataType = {
  allSrc: VideoSrc[]
  error: string
}
const epFetcher: Fetcher<ApiDataType> = (arg: string) => fetch(arg).then((res) => res.json())
// do not revalidate data on...
const options = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false
}
const animeFetcher: Fetcher<AnimeInfo, string> = (arg: string) => fetch(arg).then((res) => res.json())

export default function VideoPage() {
  const router = useRouter()
  const { animeID, ep, index } = Array.isArray(router.query) ? router.query[0] : router.query
  const { data: animeData, error: animeError } = useSWR(animeID ? `/api/anime/info/${animeID}` : null, animeFetcher)
  const episode = ep ? JSON.parse(ep) : null
  // IMPORTANT: using normal useSWR will revalidate data (fetching again after intervals) causing the video src link to change
  const { data: epData, error: epError } = useSWRImmutable(
    episode ? `/api/anime/play/${episode.id}` : null, epFetcher, options
  )

  const [prev, setPrev] = useState<AnimeEpisode | null>(null)
  const [next, setNext] = useState<AnimeEpisode | null>(null)

  // check for prev and next episodes
  useEffect(() => {
    if (animeData) {
      const prev = animeData.episodes[parseInt(index) - 1]
      const next = animeData.episodes[parseInt(index) + 1]
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
    }
  }, [animeData])

  const handleNext = () => {
    router.push({
      pathname: `/anime/play`,
      query: {
        animeID: animeID,
        ep: JSON.stringify(next),
        index: parseInt(index) + 1
      }
    })
  }

  const handlePrev = () => {
    router.push({
      pathname: `/anime/play`,
      query: {
        animeID: animeID,
        ep: JSON.stringify(prev),
        index: parseInt(index) - 1
      }
    })
  }

  return (
    <Layout>
      <h2>{animeData && animeData.title.english}</h2>
      <h3>{episode && episode.title}</h3>
      <section>
        {!epData && !epError && <p>Loading</p>}
        {!epData && epError && <p>Error loading video.</p>}
        {epData && !epError &&
          <>
            <Player allSrc={epData.allSrc} />
            {prev && <button onClick={handlePrev}>prev</button>}
            {next && <button onClick={handleNext}>next</button>}
          </>}
      </section>
      <p>{episode && episode.description}</p>
    </Layout>
  )
}
