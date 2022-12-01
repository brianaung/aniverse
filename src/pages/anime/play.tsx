// import Link from 'next/link'
import { Stack, Button, Heading, Text } from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import useSWRImmutable, { Fetcher } from 'swr'
import Layout from '../../components/layout'
import Player from '../../components/player'
import { AnimeEpisode, AnimeInfo, VideoSrc } from '../../types'
import utilStyles from '../../styles/utils.module.scss'

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
  const { data: animeData } = useSWR(animeID ? `/api/anime/watch/${animeID}` : null, animeFetcher)
  const episode: AnimeEpisode = ep ? JSON.parse(ep) : null
  // IMPORTANT: using normal useSWR will revalidate data (fetching again after intervals) causing the video src link to change
  const { data: epData, error: epError } = useSWRImmutable(
    episode ? `/api/anime/play/${episode.id}` : null,
    epFetcher,
    options
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
  }, [animeData, index])

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
      <Stack spacing='2rem' justifyContent='center'>
        {animeData && episode && (
          <Stack spacing='1rem'>
            <Heading className={utilStyles.textWithStroke} as='h1' size='xl' color={animeData.color}>
              <Link href={`/anime/watch/${animeID}`}>{animeData.title.english}</Link>
            </Heading>
            <Heading as='h2' size='md'>
              Ep{episode.number} {episode.title} ({animeData.duration}mins)
            </Heading>
            <Text as='i'>{episode.description}</Text>
          </Stack>
        )}
        <section>
          {!epData && !epError && <p>Loading</p>}
          {!epData && epError && <p>Error loading video.</p>}
          {epData && !epError && (
            <>
              <Player allSrc={epData.allSrc} />
              {prev && <Button onClick={handlePrev}>prev</Button>}
              {next && <Button onClick={handleNext}>next</Button>}
            </>
          )}
        </section>
      </Stack>
    </Layout>
  )
}
