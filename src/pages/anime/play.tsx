import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import { Box, Button, Heading, Select, Skeleton, SkeletonText, Stack, Text } from '@chakra-ui/react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { default as useSWR, default as useSWRImmutable, Fetcher } from 'swr'
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

function InfoSkeleton() {
  return (
    <Box width="80vw">
      <Skeleton mt="4" width="30%" height="1.5rem" />
      <Skeleton mt="4" width="40%" height="1rem" />
      <SkeletonText mt="4" noOfLines={4} spacing="4" />
    </Box>
  )
}

export default function VideoPage() {
  const router = useRouter()
  const { animeID, ep, index } = Array.isArray(router.query) ? router.query[0] : router.query
  const { data: animeData, error: animeError } = useSWR(animeID ? `/api/anime/info/${animeID}` : null, animeFetcher)
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

  const handleSelectEp = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (animeData) {
      router.push({
        pathname: `/anime/play`,
        query: {
          animeID: animeID,
          ep: JSON.stringify(animeData.episodes[parseInt(e.target.value) - 1]),
          index: parseInt(e.target.value) - 1
        }
      })
    }
  }

  return (
    <Layout>
      <Head>
        <title>
          {animeData && animeData.title.english} Ep{episode && episode.number}
        </title>
      </Head>
      {!animeData && !animeError && <InfoSkeleton />}
      {!animeData && animeError && <p>Error loading information.</p>}
      {animeData && !animeError && (
        <Stack width="100%" m="1rem" spacing="1rem">
          <Heading as="h1" size="xl">
            <Link href={`/anime/info/${animeData.id}`}>{animeData.title.english}</Link>
          </Heading>
          <Heading as="h2" size="md">
            Episode {episode.number} - {episode.title} ({animeData.duration}mins)
          </Heading>
          <Text>{episode.description}</Text>
          {/* select episode in a dropdown selector */}
          <Stack alignSelf="center" direction="row" alignItems="center" justifyContent="center">
            {prev && (
              <Button onClick={handlePrev}>
                <ArrowBackIcon />
              </Button>
            )}
            <Text>Episode</Text>
            <Select size="sm" value={episode.number} onChange={handleSelectEp}>
              {animeData && animeData.episodes.map((ep) => <option key={ep.id}>{ep.number}</option>)}
            </Select>
            {next && (
              <Button onClick={handleNext}>
                <ArrowForwardIcon />
              </Button>
            )}
          </Stack>
        </Stack>
      )}
      <Stack>
        {!epData && !epError && <Skeleton alignSelf="center" mt="4" width="60vw" height="230px" />}
        {!epData && epError && <p>Error loading video.</p>}
        {epData && !epError && <Player allSrc={epData.allSrc} />}
      </Stack>
    </Layout>
  )
}
